import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Search } from "lucide-react";
import { listCompletedTasks } from "../../services/dashboard";
import type { TaskWithEmployee } from "../../services/tasks";

export default function TaskHistoryPage() {
  const [tasks, setTasks] = useState<TaskWithEmployee[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    listCompletedTasks()
      .then(setTasks)
      .catch((err) => setError(err.message));
  }, []);

  const filtered = useMemo(() => {
    if (!tasks) return [];
    const q = search.trim().toLowerCase();
    if (!q) return tasks;
    return tasks.filter(
      (t) => t.title.toLowerCase().includes(q) || (t.employee?.name ?? "").toLowerCase().includes(q)
    );
  }, [tasks, search]);

  return (
    <div>
      <div className="relative w-full sm:max-w-xs mb-6">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search history…"
          className="w-full rounded-xl border border-border bg-white pl-10 pr-4 py-2.5 text-sm text-heading placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-azure/40 focus:border-azure transition-colors"
        />
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
              ? "No completed tasks yet."
              : "No completed tasks match your search."}
          </p>
        )}

        {!error && filtered.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs font-bold uppercase tracking-wide text-muted">
                  <th className="px-6 py-4">Employee</th>
                  <th className="px-6 py-4">Task</th>
                  <th className="px-6 py-4">Assigned</th>
                  <th className="px-6 py-4">Completed</th>
                  <th className="px-6 py-4">Work</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((task) => (
                  <tr key={task.id} className="border-b border-border last:border-0">
                    <td className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                      {task.employee?.name ?? "—"}
                    </td>
                    <td className="px-6 py-4 text-muted max-w-xs truncate">{task.title}</td>
                    <td className="px-6 py-4 text-muted whitespace-nowrap">
                      {new Date(task.assigned_date).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-muted whitespace-nowrap">
                      {task.completed_at
                        ? new Date(task.completed_at).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "—"}
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
                          View Work
                        </a>
                      ) : (
                        <span className="text-muted text-xs">—</span>
                      )}
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
