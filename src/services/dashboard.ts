import { supabase } from "../lib/supabase";
import { todayDateString } from "../lib/date";
import { listEmployees } from "./employees";
import { TaskWithEmployee } from "./tasks";
import type { Profile } from "../types";

export interface DashboardStats {
  totalEmployees: number;
  totalTasks: number;
  pendingTasks: number;
  completedTasks: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [employees, tasks, pending, completed] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "employee"),
    supabase.from("tasks").select("*", { count: "exact", head: true }),
    supabase.from("tasks").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("tasks").select("*", { count: "exact", head: true }).eq("status", "completed"),
  ]);

  const firstError = employees.error || tasks.error || pending.error || completed.error;
  if (firstError) throw new Error(firstError.message);

  return {
    totalEmployees: employees.count ?? 0,
    totalTasks: tasks.count ?? 0,
    pendingTasks: pending.count ?? 0,
    completedTasks: completed.count ?? 0,
  };
}

// "Completed Today" is judged by WHEN it was completed (completed_at),
// not when it was assigned — a task assigned yesterday and finished today
// should still count as completed today.
export async function listCompletedToday(): Promise<TaskWithEmployee[]> {
  const today = todayDateString();
  const { data, error } = await supabase
    .from("tasks")
    .select("*, employee:profiles(name, email)")
    .eq("status", "completed")
    .gte("completed_at", `${today}T00:00:00`)
    .lt("completed_at", `${today}T23:59:59.999`)
    .order("completed_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as unknown as TaskWithEmployee[];
}

// "Pending Today" is judged by assigned_date — tasks due today that are
// still not done.
export async function listPendingToday(): Promise<TaskWithEmployee[]> {
  const today = todayDateString();
  const { data, error } = await supabase
    .from("tasks")
    .select("*, employee:profiles(name, email)")
    .eq("status", "pending")
    .eq("assigned_date", today)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as unknown as TaskWithEmployee[];
}

export interface EmployeeTodayRow {
  employee: Profile;
  totalToday: number;
  completedToday: number;
  pendingToday: number;
}

// Combines the employee list with today's completed/pending tasks so the
// dashboard/Today's Work overview can show every employee, including
// those with nothing relevant to today.
export async function getEmployeeTodayOverview(): Promise<EmployeeTodayRow[]> {
  const [employees, completedToday, pendingToday] = await Promise.all([
    listEmployees(),
    listCompletedToday(),
    listPendingToday(),
  ]);

  return employees.map((employee) => {
    const completedCount = completedToday.filter((t) => t.employee_id === employee.id).length;
    const pendingCount = pendingToday.filter((t) => t.employee_id === employee.id).length;
    return {
      employee,
      totalToday: completedCount + pendingCount,
      completedToday: completedCount,
      pendingToday: pendingCount,
    };
  });
}

export async function listCompletedTasks(): Promise<TaskWithEmployee[]> {
  const { data, error } = await supabase
    .from("tasks")
    .select("*, employee:profiles(name, email)")
    .eq("status", "completed")
    .order("completed_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as unknown as TaskWithEmployee[];
}
