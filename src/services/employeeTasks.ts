import { supabase } from "../lib/supabase";
import type { Task } from "../types";

// No employee join needed here — RLS already scopes every query in this
// file to the signed-in employee's own rows, so we always know who "we" are.

export async function listMyPendingTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("status", "pending")
    .order("assigned_date", { ascending: true });

  if (error) throw new Error(error.message);
  return data as Task[];
}

export async function listMyCompletedTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("status", "completed")
    .order("completed_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as Task[];
}

export async function listMyTodaysTasks(): Promise<Task[]> {
  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("assigned_date", today)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as Task[];
}

// The RLS trigger on tasks only allows employees to change work_url,
// status, and completed_at on their own rows — everything else is blocked
// at the database level, not just hidden in this UI.
export async function submitWork(taskId: string, workUrl: string) {
  const { error } = await supabase
    .from("tasks")
    .update({
      work_url: workUrl,
      status: "completed",
      completed_at: new Date().toISOString(),
    })
    .eq("id", taskId);

  if (error) throw new Error(error.message);
}
