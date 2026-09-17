import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle2, Eye, Pencil, Search, Trash2 } from "lucide-react";
import { deleteEmployee, listEmployees } from "../../services/employees";
import type { Profile } from "../../types";
import EmployeeDetailModal from "../../components/admin/EmployeeDetailModal";

export default function EmployeesPage() {
  const location = useLocation();
  const [employees, setEmployees] = useState<Profile[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Profile | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showCreatedBanner, setShowCreatedBanner] = useState(
    Boolean((location.state as { created?: boolean; updated?: boolean } | null)?.created)
  );
  const [showUpdatedBanner, setShowUpdatedBanner] = useState(
    Boolean((location.state as { created?: boolean; updated?: boolean } | null)?.updated)
  );

  function loadEmployees() {
    listEmployees()
      .then(setEmployees)
      .catch((err) => setError(err.message));
  }

  useEffect(loadEmployees, []);

  async function handleDelete(employee: Profile) {
    if (
      !window.confirm(
        `Delete ${employee.name}? This removes their login and all their tasks — this can't be undone.`
      )
    )
      return;
    setDeletingId(employee.id);
    try {
      await deleteEmployee(employee.id);
      setEmployees((prev) => prev?.filter((e) => e.id !== employee.id) ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete employee.");
    } finally {
      setDeletingId(null);
    }
  }

  const filtered = useMemo(() => {
    if (!employees) return [];
    const q = search.trim().toLowerCase();
    if (!q) return employees;
    return employees.filter(
      (e) => e.name.toLowerCase().includes(q) || e.email.toLowerCase().includes(q)
    );
  }, [employees, search]);

  return (
    <div>
      {showCreatedBanner && (
        <div className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
          <span className="flex items-center gap-2 text-sm font-medium text-green-700">
            <CheckCircle2 size={16} />
            Employee created successfully.
          </span>
          <button
            type="button"
            onClick={() => setShowCreatedBanner(false)}
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
            Employee updated successfully.
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
        <div className="relative w-full sm:max-w-xs">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search employees…"
            className="w-full rounded-xl border border-border bg-white pl-10 pr-4 py-2.5 text-sm text-heading placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-azure/40 focus:border-azure transition-colors"
          />
        </div>

        <Link
          to="/admin/employees/create"
          className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold bg-azure text-white transition-colors duration-250 hover:bg-teal shrink-0"
        >
          + Create Employee
        </Link>
      </div>

      <div className="rounded-card bg-card border border-border overflow-hidden">
        {error && (
          <p className="p-6 text-sm font-medium text-red-600">{error}</p>
        )}

        {!error && employees === null && (
          <div className="p-10 flex justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-border border-t-azure animate-spin" />
          </div>
        )}

        {!error && employees !== null && filtered.length === 0 && (
          <p className="p-10 text-sm text-muted text-center">
            {employees.length === 0
              ? "No employees yet. Create your first one to get started."
              : "No employees match your search."}
          </p>
        )}

        {!error && filtered.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs font-bold uppercase tracking-wide text-muted">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Created</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((employee) => (
                  <tr key={employee.id} className="border-b border-border last:border-0">
                    <td className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                      {employee.name}
                    </td>
                    <td className="px-6 py-4 text-muted whitespace-nowrap">{employee.email}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-grid px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-azure">
                        {employee.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted whitespace-nowrap">
                      {new Date(employee.created_at).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => setSelected(employee)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-azure hover:text-teal transition-colors"
                        >
                          <Eye size={14} />
                          View
                        </button>
                        <Link
                          to={`/admin/employees/${employee.id}/edit`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-heading transition-colors"
                        >
                          <Pencil size={14} />
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(employee)}
                          disabled={deletingId === employee.id}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 transition-colors disabled:opacity-50"
                        >
                          <Trash2 size={14} />
                          {deletingId === employee.id ? "Deleting…" : "Delete"}
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

      {selected && <EmployeeDetailModal employee={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
