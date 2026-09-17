import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { LINK_TYPE_LABELS, detectLinkType } from "../../lib/linkType";
import { listMyCompletedTasks } from "../../services/employeeTasks";
import type { Task } from "../../types";

export default function EmployeeTaskHistoryPage() {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listMyCompletedTasks()
      .then(setTasks)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p className="text-sm font-medium text-red-600">{error}</p>;

  if (tasks === null) {
    return (
      <div className="p-10 flex justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-border border-t-azure animate-spin" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="rounded-card bg-card border border-border p-10 text-center">
        <p className="text-sm text-muted">Nothing completed yet — finished tasks will show up here.</p>
      </div>
    );
  }

  return (
    <div className="rounded-card bg-card border border-border p-6 sm:p-8">
      <ol className="space-y-6">
        {tasks.map((task, i) => (
          <li key={task.id} className="relative pl-8">
            <span className="absolute left-0 top-1 w-3 h-3 rounded-full bg-azure" />
            {i !== tasks.length - 1 && (
              <span className="absolute left-[5px] top-4 bottom-[-24px] w-px bg-border" />
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="font-semibold text-sm text-heading">{task.title}</h3>
                <p className="text-[11px] text-muted mt-0.5">
                  Completed{" "}
                  {task.completed_at &&
                    new Date(task.completed_at).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                </p>
              </div>

              {task.work_url && (
                <a
                  href={task.work_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-azure hover:text-teal transition-colors shrink-0"
                >
                  <ExternalLink size={13} />
                  {LINK_TYPE_LABELS[detectLinkType(task.work_url)]}
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
