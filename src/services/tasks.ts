import { supabase } from "../lib/supabase";
import type { Task, TaskStatus } from "../types";

// A task joined with its assigned employee's name/email, for display.
export interface TaskWithEmployee extends Task {
  employee: { name: string; email: string } | null;
}

export async function listTasks(): Promise<TaskWithEmployee[]> {
  const { data, error } = await supabase
    .from("tasks")
    .select("*, employee:profiles(name, email)")
    .order("assigned_date", { ascending: false });

  if (error) throw new Error(error.message);
  return data as unknown as TaskWithEmployee[];
}

export interface CreateTaskInput {
  title: string;
  description: string;
  employee_id: string;
  assigned_date: string;
}

export async function createTask(input: CreateTaskInput) {
  const { error } = await supabase.from("tasks").insert({
    title: input.title,
    description: input.description || null,
    employee_id: input.employee_id,
    assigned_date: input.assigned_date,
    status: "pending" as TaskStatus,
  });

  if (error) throw new Error(error.message);
}

export async function deleteTask(id: string) {
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function getTask(id: string): Promise<Task> {
  const { data, error } = await supabase.from("tasks").select("*").eq("id", id).single();
  if (error) throw new Error(error.message);
  return data as Task;
}

export interface UpdateTaskInput {
  title: string;
  description: string;
  employee_id: string;
  assigned_date: string;
  status: TaskStatus;
  work_url: string;
}

// Admins bypass the "employees can only touch work_url/status/completed_at"
// trigger entirely (it explicitly allows admins to change anything), so
// this can update every field in one call.
export async function updateTask(id: string, input: UpdateTaskInput, previousStatus: TaskStatus) {
  const completedAtUpdate =
    input.status === "completed" && previousStatus !== "completed"
      ? { completed_at: new Date().toISOString() }
      : input.status === "pending"
      ? { completed_at: null }
      : {};

  const { error } = await supabase
    .from("tasks")
    .update({
      title: input.title,
      description: input.description || null,
      employee_id: input.employee_id,
      assigned_date: input.assigned_date,
      status: input.status,
      work_url: input.work_url || null,
      ...completedAtUpdate,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
}
