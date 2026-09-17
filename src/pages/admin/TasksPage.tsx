import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle2, ExternalLink, Pencil, Search, Trash2 } from "lucide-react";
import { deleteTask, listTasks, TaskWithEmployee } from "../../services/tasks";
import type { TaskStatus } from "../../types";

const FILTERS: { label: string; value: "all" | TaskStatus }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
];

function StatusBadge({ status }: { status: TaskStatus }) {
  const isCompleted = status === "completed";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${
        isCompleted ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
      }`}
    >
      {status}
    </span>
  );
}

export default function TasksPage() {
  const location = useLocation();
  const [tasks, setTasks] = useState<TaskWithEmployee[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | TaskStatus>("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showAssignedBanner, setShowAssignedBanner] = useState(
    Boolean((location.state as { assigned?: boolean; updated?: boolean } | null)?.assigned)
  );
  const [showUpdatedBanner, setShowUpdatedBanner] = useState(
    Boolean((location.state as { assigned?: boolean; updated?: boolean } | null)?.updated)
  );

  function loadTasks() {
    listTasks()
      .then(setTasks)
      .catch((err) => setError(err.message));
  }

  useEffect(loadTasks, []);

  const filtered = useMemo(() => {
    if (!tasks) return [];
    let result = tasks;
    if (filter !== "all") result = result.filter((t) => t.status === filter);
    const q = search.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.employee?.name ?? "").toLowerCase().includes(q)
      );
    }
    return result;
  }, [tasks, search, filter]);

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this task? This can't be undone.")) return;
    setDeletingId(id);
    try {
      await deleteTask(id);
      setTasks((prev) => prev?.filter((t) => t.id !== id) ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete task.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      {showAssignedBanner && (
        <div className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
          <span className="flex items-center gap-2 text-sm font-medium text-green-700">
            <CheckCircle2 size={16} />
            Task assigned successfully.
          </span>
          <button
            type="button"
            onClick={() => setShowAssignedBanner(false)}
            className="text-xs font-semibold text-green-700/70 hover:text-green-700"
          >
            Dismiss
          </button>
        </div>
      )}

      {showUpdatedBanner && (
        <div className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
          <span className="flex items-center gap-2 text-sm font-medium text-green-700">
            <CheckCircle2 size={16} />
            Task updated successfully.
          </span>
          <button
            type="button"
            onClick={() => setShowUpdatedBanner(false)}
            className="text-xs font-semibold text-green-700/70 hover:text-green-700"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative sm:max-w-xs w-full">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks…"
              className="w-full rounded-xl border border-border bg-white pl-10 pr-4 py-2.5 text-sm text-heading placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-azure/40 focus:border-azure transition-colors"
            />
          </div>

          <div className="flex gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors duration-250 ${
                  filter === f.value
                    ? "bg-azure text-white"
                    : "bg-white border border-border text-muted hover:text-heading"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <Link
          to="/admin/tasks/assign"
          className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold bg-azure text-white transition-colors duration-250 hover:bg-teal shrink-0"
        >
          + Assign Task
        </Link>
      </div>

      <div className="rounded-card bg-card border border-border overflow-hidden">
        {error && <p className="p-6 text-sm font-medium text-red-600">{error}</p>}

        {!error && tasks === null && (
          <div className="p-10 flex justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-border border-t-azure animate-spin" />
          </div>
        )}

        {!error && tasks !== null && filtered.length === 0 && (
          <p className="p-10 text-sm text-muted text-center">
            {tasks.length === 0
              ? "No tasks yet. Assign the first one to get started."
              : "No tasks match your search/filter."}
          </p>
        )}

        {!error && filtered.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs font-bold uppercase tracking-wide text-muted">
                  <th className="px-6 py-4">Task</th>
                  <th className="px-6 py-4">Employee</th>
                  <th className="px-6 py-4">Assigned</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Work</th>
                  <th className="px-6 py-4">Completed</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((task) => (
                  <tr key={task.id} className="border-b border-border last:border-0">
                    <td className="px-6 py-4 font-medium text-heading max-w-xs truncate">
                      {task.title}
                    </td>
                    <td className="px-6 py-4 text-muted whitespace-nowrap">
                      {task.employee?.name ?? "—"}
                    </td>
                    <td className="px-6 py-4 text-muted whitespace-nowrap">
                      {new Date(task.assigned_date).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={task.status} />
                    </td>
                    <td className="px-6 py-4">
                      {task.work_url ? (
                        <a
                          href={task.work_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-azure hover:text-teal transition-colors"
                        >
                          <ExternalLink size={13} />
                          View
                        </a>
                      ) : (
                        <span className="text-muted text-xs">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-muted whitespace-nowrap">
                      {task.completed_at
                        ? new Date(task.completed_at).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                          })
                        : "—"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-4">
                        <Link
                          to={`/admin/tasks/${task.id}/edit`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-heading transition-colors"
                        >
                          <Pencil size={14} />
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(task.id)}
                          disabled={deletingId === task.id}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 transition-colors disabled:opacity-50"
                        >
                          <Trash2 size={14} />
                          {deletingId === task.id ? "Deleting…" : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
