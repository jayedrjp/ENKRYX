import { X } from "lucide-react";
import type { Profile } from "../../types";

interface EmployeeDetailModalProps {
  employee: Profile;
  onClose: () => void;
}

export default function EmployeeDetailModal({ employee, onClose }: EmployeeDetailModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} aria-hidden />

      <div className="relative w-full max-w-sm rounded-card bg-card border border-border shadow-[0_20px_60px_rgba(7,24,39,0.15)] p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 text-muted hover:text-heading transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center text-white text-xl font-bold bg-azure mb-4">
            {employee.photo_url ? (
              <img src={employee.photo_url} alt={employee.name} className="w-full h-full object-cover" />
            ) : (
              employee.name.slice(0, 1).toUpperCase()
            )}
          </div>
          <h2 className="text-lg font-extrabold italic uppercase text-heading">{employee.name}</h2>
          {employee.employee_id && (
            <p className="text-[11px] text-muted mt-0.5">{employee.employee_id}</p>
          )}
          <span className="mt-2 inline-flex items-center rounded-full bg-grid px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-azure">
            {employee.job_role ?? employee.role}
          </span>
        </div>

        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Email</dt>
            <dd className="text-heading font-medium text-right break-all">{employee.email}</dd>
          </div>
          {employee.phone && (
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Phone</dt>
              <dd className="text-heading font-medium">{employee.phone}</dd>
            </div>
          )}
          {employee.designation && (
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Designation</dt>
              <dd className="text-heading font-medium">{employee.designation}</dd>
            </div>
          )}
          {employee.department && (
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Department</dt>
              <dd className="text-heading font-medium">{employee.department}</dd>
            </div>
          )}
          {employee.employment_type && (
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Employment Type</dt>
              <dd className="text-heading font-medium">{employee.employment_type}</dd>
            </div>
          )}
          {employee.work_location && (
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Work Location</dt>
              <dd className="text-heading font-medium">{employee.work_location}</dd>
            </div>
          )}
          {employee.joining_date && (
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Joined</dt>
              <dd className="text-heading font-medium">
                {new Date(employee.joining_date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}
