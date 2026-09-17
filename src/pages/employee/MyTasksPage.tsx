import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { listMyPendingTasks } from "../../services/employeeTasks";
import SubmitWorkModal from "../../components/employee/SubmitWorkModal";
import type { Task } from "../../types";

export default function MyTasksPage() {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  function loadTasks() {
    listMyPendingTasks()
      .then(setTasks)
      .catch((err) => setError(err.message));
  }

  useEffect(loadTasks, []);

  function handleSubmitted() {
    setActiveTask(null);
    loadTasks();
  }

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
        <p className="text-sm text-muted">You're all caught up — no pending tasks right now.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="rounded-card bg-card border border-border p-6 shadow-[0_2px_10px_rgba(7,24,39,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all duration-250 flex flex-col"
          >
            <h3 className="font-extrabold italic uppercase text-heading text-sm mb-2 leading-snug">
              {task.title}
            </h3>
            {task.description && (
              <p className="text-xs text-muted leading-relaxed mb-4 line-clamp-3 flex-1">
                {task.description}
              </p>
            )}
            <div className="flex items-center gap-1.5 text-[11px] text-muted mb-4">
              <Calendar size={12} />
              Assigned{" "}
              {new Date(task.assigned_date).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}
            </div>
            <button
              type="button"
              onClick={() => setActiveTask(task)}
              className="rounded-full px-5 py-2 text-xs font-semibold bg-azure text-white transition-colors duration-250 hover:bg-teal self-start"
            >
              Submit Work
            </button>
          </div>
        ))}
      </div>

      {activeTask && (
        <SubmitWorkModal
          task={activeTask}
          onClose={() => setActiveTask(null)}
          onSubmitted={handleSubmitted}
        />
      )}
    </>
  );
}
