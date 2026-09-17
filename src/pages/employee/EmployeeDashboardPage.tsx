import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Clock, ListChecks } from "lucide-react";
import { listMyTodaysTasks } from "../../services/employeeTasks";
import type { Task } from "../../types";

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: typeof ListChecks;
}) {
  return (
    <div className="rounded-card bg-card border border-border p-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</span>
        <div className="w-9 h-9 rounded-xl bg-grid flex items-center justify-center text-azure">
          <Icon size={17} />
        </div>
      </div>
      <p className="text-3xl font-extrabold italic text-heading">{value}</p>
    </div>
  );
}

export default function EmployeeDashboardPage() {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listMyTodaysTasks()
      .then(setTasks)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p className="text-sm font-medium text-red-600">{error}</p>;

  const completed = tasks?.filter((t) => t.status === "completed").length ?? 0;
  const pending = tasks?.filter((t) => t.status === "pending").length ?? 0;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <StatCard label="Assigned Today" value={tasks?.length ?? 0} icon={ListChecks} />
        <StatCard label="Completed Today" value={completed} icon={CheckCircle2} />
        <StatCard label="Pending Today" value={pending} icon={Clock} />
      </div>

      {pending > 0 && (
        <div className="rounded-card bg-card border border-border p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-heading">
            You have <span className="font-bold">{pending}</span>{" "}
            {pending === 1 ? "task" : "tasks"} still pending.
          </p>
          <Link
            to="/employee/tasks"
            className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-xs font-semibold bg-azure text-white transition-colors duration-250 hover:bg-teal shrink-0"
          >
            View My Tasks
          </Link>
        </div>
      )}
    </div>
  );
}
