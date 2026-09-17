export type UserRole = "admin" | "employee";

export interface Profile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  designation: string | null;
  department: string | null;
  employee_id: string | null;
  phone: string | null;
  job_role: string | null;
  employment_type: string | null;
  joining_date: string | null;
  work_location: string | null;
  photo_url: string | null;
  created_at: string;
}

export type TaskStatus = "pending" | "completed";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  employee_id: string;
  assigned_date: string;
  status: TaskStatus;
  work_url: string | null;
  completed_at: string | null;
  created_at: string;
}
