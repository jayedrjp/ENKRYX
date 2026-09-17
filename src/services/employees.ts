import { supabase } from "../lib/supabase";
import type { Profile } from "../types";

export async function listEmployees(): Promise<Profile[]> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "employee")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as Profile[];
}

export async function getEmployee(id: string): Promise<Profile> {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", id).single();
  if (error) throw new Error(error.message);
  return data as Profile;
}

// Shared by every Edge Function call in this file: supabase-js puts
// non-2xx responses into `error`, but the JSON error message we return
// from our functions is on the error's response body, not `error.message`
// — this unwraps that so the real message reaches the UI.
async function invokeEdgeFunction<T>(name: string, body: object): Promise<T> {
  const { data, error } = await supabase.functions.invoke(name, { body });

  if (error) {
    const context = (error as { context?: Response }).context;
    if (context) {
      try {
        const responseBody = await context.json();
        throw new Error(responseBody.error ?? error.message);
      } catch {
        throw new Error(error.message);
      }
    }
    throw new Error(error.message);
  }

  if (data?.error) throw new Error(data.error);
  return data as T;
}

export interface CreateEmployeeInput {
  name: string;
  email: string;
  password: string;
  designation: string;
  department: string;
  phone: string;
  job_role: string;
  employment_type: string;
  joining_date: string;
  work_location: string;
}

export async function createEmployee(input: CreateEmployeeInput) {
  return invokeEdgeFunction<{ id: string; name: string; email: string }>(
    "create-employee",
    input
  );
}

export async function deleteEmployee(employeeId: string) {
  return invokeEdgeFunction<{ success: true }>("delete-employee", { employeeId });
}

export interface UpdateEmployeeInput {
  name: string;
  phone: string;
  designation: string;
  department: string;
  job_role: string;
  employment_type: string;
  joining_date: string;
  work_location: string;
}

// Everything here is a plain profiles-table update — admins have an
// unrestricted UPDATE policy on profiles, so no Edge Function is needed.
// (Editing the login email is intentionally not supported here — that
// changes the auth.users record and needs its own privileged flow.)
export async function updateEmployee(id: string, input: UpdateEmployeeInput) {
  const { error } = await supabase.from("profiles").update(input).eq("id", id);
  if (error) throw new Error(error.message);
}

const MAX_PHOTO_BYTES = 2 * 1024 * 1024;
const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function validatePhotoFile(file: File): string | null {
  if (!ALLOWED_PHOTO_TYPES.includes(file.type)) {
    return "Only JPG, PNG, or WebP images are allowed.";
  }
  if (file.size > MAX_PHOTO_BYTES) {
    return "Image must be 2MB or smaller.";
  }
  return null;
}

// Uploads a profile photo AFTER the employee's auth account exists, since
// the storage path is keyed by their user id. Updates profiles.photo_url
// directly — admins are allowed to update any profile row (see RLS policy).
export async function uploadEmployeePhoto(employeeId: string, file: File): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${employeeId}/photo.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("employee-photos")
    .upload(path, file, { upsert: true, contentType: file.type });

  if (uploadError) throw new Error(uploadError.message);

  const {
    data: { publicUrl },
  } = supabase.storage.from("employee-photos").getPublicUrl(path);

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ photo_url: publicUrl })
    .eq("id", employeeId);

  if (updateError) throw new Error(updateError.message);

  return publicUrl;
}
