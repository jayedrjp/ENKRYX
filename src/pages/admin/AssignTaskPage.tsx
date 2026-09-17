import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { listEmployees } from "../../services/employees";
import { createTask } from "../../services/tasks";
import { todayDateString } from "../../lib/date";
import type { Profile } from "../../types";

export default function AssignTaskPage() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState<Profile[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [assignedDate, setAssignedDate] = useState(todayDateString());
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    listEmployees()
      .then(setEmployees)
      .catch((err) => setLoadError(err.message));
  }, []);

  function validate(): string | null {
    if (!title.trim()) return "Task title is required.";
    if (!employeeId) return "Select an employee to assign this task to.";
    if (!assignedDate) return "Pick an assigned date.";
    return null;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    try {
      await createTask({
        title: title.trim(),
        description: description.trim(),
        employee_id: employeeId,
        assigned_date: assignedDate,
      });
      navigate("/admin/tasks", { replace: true, state: { assigned: true } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-lg">
      <div className="rounded-card bg-card border border-border p-8">
        {loadError && (
          <p className="mb-5 text-xs font-medium text-red-600 bg-red-50 border border-red-100 rounded-xl px-3.5 py-2.5">
            Couldn't load employees: {loadError}
          </p>
        )}

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
              placeholder="e.g. Redesign the pricing page"
              className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-heading placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-azure/40 focus:border-azure transition-colors"
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
              placeholder="What needs to be done?"
              className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-heading placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-azure/40 focus:border-azure transition-colors resize-none"
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
                disabled={!employees || employees.length === 0}
                className="w-full appearance-none rounded-xl border border-border bg-white px-4 py-2.5 pr-9 text-sm text-heading focus:outline-none focus:ring-2 focus:ring-azure/40 focus:border-azure transition-colors disabled:opacity-60"
              >
                <option value="" disabled>
                  {employees === null
                    ? "Loading employees…"
                    : employees.length === 0
                    ? "No employees yet"
                    : "Select an employee"}
                </option>
                {employees?.map((emp) => (
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
              {submitting ? "Assigning…" : "Assign Task"}
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
