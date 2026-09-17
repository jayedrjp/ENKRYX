// Supabase Edge Function: delete-employee
//
// Deletes the employee's auth.users row using the service_role key.
// profiles and tasks both reference auth.users/profiles with
// "on delete cascade", so removing the auth user automatically removes
// their profile row and every task assigned to them — no manual cleanup
// needed on those two tables.
//
// Deploy with: supabase functions deploy delete-employee

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const callerClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: req.headers.get("Authorization")! } },
    });

    const {
      data: { user: caller },
    } = await callerClient.auth.getUser();

    if (!caller) {
      return jsonResponse({ error: "Not authenticated." }, 401);
    }

    const { data: callerProfile, error: profileError } = await callerClient
      .from("profiles")
      .select("role")
      .eq("id", caller.id)
      .single();

    if (profileError || callerProfile?.role !== "admin") {
      return jsonResponse({ error: "Only admins can delete employees." }, 403);
    }

    const { employeeId } = await req.json();
    if (!employeeId) {
      return jsonResponse({ error: "employeeId is required." }, 400);
    }
    if (employeeId === caller.id) {
      return jsonResponse({ error: "You can't delete your own account." }, 400);
    }

    const adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Best-effort photo cleanup — not fatal if it fails or nothing exists.
    for (const ext of ["jpg", "jpeg", "png", "webp"]) {
      await adminClient.storage.from("employee-photos").remove([`${employeeId}/photo.${ext}`]);
    }

    const { error: deleteError } = await adminClient.auth.admin.deleteUser(employeeId);
    if (deleteError) {
      return jsonResponse({ error: deleteError.message }, 400);
    }

    return jsonResponse({ success: true });
  } catch (err) {
    return jsonResponse({ error: err instanceof Error ? err.message : "Unknown error." }, 500);
  }
});

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}
