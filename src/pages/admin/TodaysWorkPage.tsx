import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { listCompletedToday, listPendingToday } from "../../services/dashboard";
import type { TaskWithEmployee } from "../../services/tasks";

function formatTime(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

function TaskTable({ tasks, emptyLabel }: { tasks: TaskWithEmployee[]; emptyLabel: string }) {
  if (tasks.length === 0) {
    return <p className="p-8 text-sm text-muted text-center">{emptyLabel}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs font-bold uppercase tracking-wide text-muted">
            <th className="px-6 py-3.5">Employee</th>
            <th className="px-6 py-3.5">Task</th>
            <th className="px-6 py-3.5">Work</th>
            <th className="px-6 py-3.5">Completed At</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-b border-border last:border-0">
              <td className="px-6 py-3.5 font-medium text-heading whitespace-nowrap">
                {task.employee?.name ?? "—"}
              </td>
              <td className="px-6 py-3.5 text-muted max-w-xs truncate">{task.title}</td>
              <td className="px-6 py-3.5">
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
              <td className="px-6 py-3.5 text-muted whitespace-nowrap">
                {formatTime(task.completed_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function TodaysWorkPage() {
  const [completed, setCompleted] = useState<TaskWithEmployee[] | null>(null);
  const [pending, setPending] = useState<TaskWithEmployee[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([listCompletedToday(), listPendingToday()])
      .then(([c, p]) => {
        setCompleted(c);
        setPending(p);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <p className="text-sm font-medium text-red-600">{error}</p>;
  }

  if (completed === null || pending === null) {
    return (
      <div className="p-10 flex justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-border border-t-azure animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-sm font-extrabold italic uppercase tracking-tight text-heading mb-3 flex items-center gap-2">
          Completed Today
          <span className="text-xs font-bold text-green-700 bg-green-50 rounded-full px-2 py-0.5">
            {completed.length}
          </span>
        </h2>
        <div className="rounded-card bg-card border border-border overflow-hidden">
          <TaskTable tasks={completed} emptyLabel="No one has completed a task yet today." />
        </div>
      </div>

      <div>
        <h2 className="text-sm font-extrabold italic uppercase tracking-tight text-heading mb-3 flex items-center gap-2">
          Pending Today
          <span className="text-xs font-bold text-amber-700 bg-amber-50 rounded-full px-2 py-0.5">
            {pending.length}
          </span>
        </h2>
        <div className="rounded-card bg-card border border-border overflow-hidden">
          <TaskTable tasks={pending} emptyLabel="Nothing pending for today — everyone's caught up." />
        </div>
      </div>
    </div>
  );
}
