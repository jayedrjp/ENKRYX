// Supabase Edge Function: create-employee
//
// Runs server-side only. Uses the service_role key to create an auth user
// for a new employee — this key must never be exposed in the browser, which
// is why this can't happen directly from the React app.
//
// Deploy with: supabase functions deploy create-employee

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  // Browsers send a CORS preflight OPTIONS request before the real POST.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Client scoped to the CALLER's identity (forwards their JWT), used only
    // to verify who's asking. RLS still applies to this client.
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
      return jsonResponse({ error: "Only admins can create employees." }, 403);
    }

    // From here on, use the SERVICE ROLE client — this is the privileged
    // client that can actually create auth users, and it bypasses RLS.
    const adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const {
      name,
      email,
      password,
      designation,
      department,
      phone,
      job_role,
      employment_type,
      joining_date,
      work_location,
    } = await req.json();

    if (
      !name || !email || !password || !designation || !department ||
      !phone || !job_role || !employment_type || !joining_date || !work_location
    ) {
      return jsonResponse({ error: "All fields except the photo are required." }, 400);
    }
    if (password.length < 6) {
      return jsonResponse({ error: "Password must be at least 6 characters." }, 400);
    }

    const { data: created, error: createError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // admin-created accounts don't need email verification
      user_metadata: {
        name,
        role: "employee",
        designation,
        department,
        phone,
        job_role,
        employment_type,
        joining_date,
        work_location,
      },
    });

    if (createError) {
      // Supabase returns a clear message for "email already exists" etc.
      return jsonResponse({ error: createError.message }, 400);
    }

    // The on_auth_user_created trigger auto-inserts the profiles row and
    // assigns the Employee ID, so nothing else to do here. The photo (if
    // any) is uploaded separately from the client after this succeeds,
    // since it needs the new user's id as the storage path.
    return jsonResponse({
      id: created.user.id,
      name,
      email: created.user.email,
    });
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
