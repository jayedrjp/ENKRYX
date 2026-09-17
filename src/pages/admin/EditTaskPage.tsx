import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { listEmployees } from "../../services/employees";
import { getTask, updateTask } from "../../services/tasks";
import type { Profile, Task, TaskStatus } from "../../types";

export default function EditTaskPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [task, setTask] = useState<Task | null>(null);
  const [employees, setEmployees] = useState<Profile[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [assignedDate, setAssignedDate] = useState("");
  const [status, setStatus] = useState<TaskStatus>("pending");
  const [workUrl, setWorkUrl] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    Promise.all([getTask(id), listEmployees()])
      .then(([t, emps]) => {
        setTask(t);
        setEmployees(emps);
        setTitle(t.title);
        setDescription(t.description ?? "");
        setEmployeeId(t.employee_id);
        setAssignedDate(t.assigned_date);
        setStatus(t.status);
        setWorkUrl(t.work_url ?? "");
      })
      .catch((err) => setLoadError(err.message));
  }, [id]);

  function validate(): string | null {
    if (!title.trim()) return "Task title is required.";
    if (!employeeId) return "Select an employee.";
    if (!assignedDate) return "Pick an assigned date.";
    return null;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!id || !task) return;
    setError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    try {
      await updateTask(
        id,
        {
          title: title.trim(),
          description: description.trim(),
          employee_id: employeeId,
          assigned_date: assignedDate,
          status,
          work_url: workUrl.trim(),
        },
        task.status
      );
      navigate("/admin/tasks", { replace: true, state: { updated: true } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  if (loadError) return <p className="text-sm font-medium text-red-600">{loadError}</p>;

  if (!task || !employees) {
    return (
      <div className="p-10 flex justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-border border-t-azure animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-1.5 text-xs text-muted mb-6">
        <Link to="/admin/tasks" className="hover:text-azure transition-colors">
          Tasks
        </Link>
        <ChevronRight size={12} />
        <span className="font-semibold text-heading">Edit Task</span>
      </div>

      <div className="rounded-card bg-card border border-border p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-xs font-semibold text-muted mb-1.5">
              Task Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-heading focus:outline-none focus:ring-2 focus:ring-azure/40 focus:border-azure transition-colors"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-xs font-semibold text-muted mb-1.5">
              Task Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-heading focus:outline-none focus:ring-2 focus:ring-azure/40 focus:border-azure transition-colors resize-none"
            />
          </div>

          <div>
            <label htmlFor="employee" className="block text-xs font-semibold text-muted mb-1.5">
              Employee
            </label>
            <div className="relative">
              <select
                id="employee"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="w-full appearance-none rounded-xl border border-border bg-white px-4 py-2.5 pr-9 text-sm text-heading focus:outline-none focus:ring-2 focus:ring-azure/40 focus:border-azure transition-colors"
              >
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} — {emp.email}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="assignedDate" className="block text-xs font-semibold text-muted mb-1.5">
                Assigned Date
              </label>
              <input
                id="assignedDate"
                type="date"
                value={assignedDate}
                onChange={(e) => setAssignedDate(e.target.value)}
                className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-heading focus:outline-none focus:ring-2 focus:ring-azure/40 focus:border-azure transition-colors"
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-xs font-semibold text-muted mb-1.5">
                Status
              </label>
              <div className="relative">
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as TaskStatus)}
                  className="w-full appearance-none rounded-xl border border-border bg-white px-4 py-2.5 pr-9 text-sm text-heading focus:outline-none focus:ring-2 focus:ring-azure/40 focus:border-azure transition-colors"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="workUrl" className="block text-xs font-semibold text-muted mb-1.5">
              Work URL
            </label>
            <input
              id="workUrl"
              type="url"
              value={workUrl}
              onChange={(e) => setWorkUrl(e.target.value)}
              placeholder="https://…"
              className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-heading placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-azure/40 focus:border-azure transition-colors"
            />
            {status === "completed" && !workUrl && (
              <p className="mt-1.5 text-[11px] text-muted">
                No work link submitted yet — you can add one on their behalf if needed.
              </p>
            )}
          </div>

          {error && (
            <p className="text-xs font-medium text-red-600 bg-red-50 border border-red-100 rounded-xl px-3.5 py-2.5">
              {error}
            </p>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full px-6 py-2.5 text-sm font-semibold bg-azure text-white transition-colors duration-250 hover:bg-teal disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Saving…" : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/tasks")}
              className="text-sm font-semibold text-muted hover:text-heading transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
