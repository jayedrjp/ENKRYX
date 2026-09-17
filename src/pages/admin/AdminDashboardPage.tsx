import { useEffect, useState } from "react";
import { CheckCircle2, ClipboardList, Clock, Users } from "lucide-react";
import {
  DashboardStats,
  EmployeeTodayRow,
  getDashboardStats,
  getEmployeeTodayOverview,
} from "../../services/dashboard";

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number | null;
  icon: typeof Users;
}) {
  return (
    <div className="rounded-card bg-card border border-border p-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</span>
        <div className="w-9 h-9 rounded-xl bg-grid flex items-center justify-center text-azure">
          <Icon size={17} />
        </div>
      </div>
      <p className="text-3xl font-extrabold italic text-heading">
        {value === null ? (
          <span className="inline-block w-10 h-7 rounded bg-grid animate-pulse align-middle" />
        ) : (
          value
        )}
      </p>
    </div>
  );
}

function EmployeeStatusBadge({ row }: { row: EmployeeTodayRow }) {
  if (row.totalToday === 0) {
    return (
      <span className="inline-flex items-center rounded-full bg-grid px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-muted">
        No Tasks
      </span>
    );
  }
  if (row.pendingToday === 0) {
    return (
      <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-green-700">
        All Done
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-700">
      Pending
    </span>
  );
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [overview, setOverview] = useState<EmployeeTodayRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getDashboardStats(), getEmployeeTodayOverview()])
      .then(([s, o]) => {
        setStats(s);
        setOverview(o);
      })
      .catch((err) => setError(err.message));
  }, []);

  const todayTotals = overview?.reduce(
    (acc, row) => ({
      total: acc.total + row.totalToday,
      completed: acc.completed + row.completedToday,
      pending: acc.pending + row.pendingToday,
    }),
    { total: 0, completed: 0, pending: 0 }
  );

  return (
    <div>
      {error && (
        <p className="mb-6 text-sm font-medium text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      {/* Overview stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard label="Total Employees" value={stats?.totalEmployees ?? null} icon={Users} />
        <StatCard label="Total Tasks" value={stats?.totalTasks ?? null} icon={ClipboardList} />
        <StatCard label="Pending Tasks" value={stats?.pendingTasks ?? null} icon={Clock} />
        <StatCard label="Completed Tasks" value={stats?.completedTasks ?? null} icon={CheckCircle2} />
      </div>

      {/* Today's task status */}
      <div className="rounded-card bg-card border border-border p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-sm font-extrabold italic uppercase tracking-tight text-heading">
            Today's Task Status
          </h2>
          {todayTotals && (
            <div className="flex gap-5 text-xs">
              <span className="text-muted">
                Assigned <span className="font-bold text-heading">{todayTotals.total}</span>
              </span>
              <span className="text-muted">
                Completed <span className="font-bold text-green-700">{todayTotals.completed}</span>
              </span>
              <span className="text-muted">
                Pending <span className="font-bold text-amber-700">{todayTotals.pending}</span>
              </span>
            </div>
          )}
        </div>

        {overview === null && !error && (
          <div className="py-10 flex justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-border border-t-azure animate-spin" />
          </div>
        )}

        {overview !== null && overview.length === 0 && (
          <p className="py-10 text-sm text-muted text-center">
            No employees yet — create one to start assigning tasks.
          </p>
        )}

        {overview !== null && overview.length > 0 && (
          <div className="overflow-x-auto -mx-6 sm:-mx-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs font-bold uppercase tracking-wide text-muted">
                  <th className="px-6 sm:px-8 py-3">Employee</th>
                  <th className="px-6 sm:px-8 py-3">Today's Tasks</th>
                  <th className="px-6 sm:px-8 py-3">Completed</th>
                  <th className="px-6 sm:px-8 py-3">Pending</th>
                  <th className="px-6 sm:px-8 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {overview.map((row) => (
                  <tr key={row.employee.id} className="border-b border-border last:border-0">
                    <td className="px-6 sm:px-8 py-3.5 font-medium text-heading whitespace-nowrap">
                      {row.employee.name}
                    </td>
                    <td className="px-6 sm:px-8 py-3.5 text-muted">{row.totalToday}</td>
                    <td className="px-6 sm:px-8 py-3.5 text-muted">{row.completedToday}</td>
                    <td className="px-6 sm:px-8 py-3.5 text-muted">{row.pendingToday}</td>
                    <td className="px-6 sm:px-8 py-3.5">
                      <EmployeeStatusBadge row={row} />
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
