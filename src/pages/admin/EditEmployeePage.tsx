import { FormEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Calendar, Camera, ChevronDown, ChevronRight, Mail, Phone, X } from "lucide-react";
import {
  getEmployee,
  updateEmployee,
  uploadEmployeePhoto,
  validatePhotoFile,
} from "../../services/employees";
import type { Profile } from "../../types";

const JOB_ROLES = ["Admin", "Manager", "Team Lead", "Employee", "HR"];

const DESIGNATIONS = [
  "Software Engineer",
  "Senior Software Engineer",
  "UI/UX Designer",
  "Project Manager",
  "QA Engineer",
  "Marketing Executive",
  "Sales Executive",
  "HR Executive",
  "Content Writer",
  "Intern",
  "Other",
];

const DEPARTMENTS = [
  "Engineering",
  "Design",
  "Marketing",
  "Sales",
  "Human Resources",
  "Finance",
  "Operations",
  "Management",
];

const EMPLOYMENT_TYPES = ["Full Time", "Part Time", "Intern", "Contract"];
const WORK_LOCATIONS = ["Office", "Remote", "Hybrid"];

interface FormState {
  name: string;
  phone: string;
  jobRole: string;
  designation: string;
  department: string;
  employmentType: string;
  joiningDate: string;
  workLocation: string;
}

type FieldErrors = Partial<Record<keyof FormState | "photo", string>>;

function Required() {
  return <span className="text-red-500 ml-0.5">*</span>;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-[11px] font-medium text-red-600">{message}</p>;
}

const inputClass =
  "w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-heading placeholder:text-muted/70 focus:outline-none focus:ring-2 transition-colors disabled:bg-grid disabled:text-muted disabled:cursor-not-allowed";
const inputBorder = (hasError?: string) =>
  hasError
    ? "border-red-300 focus:ring-red-200 focus:border-red-400"
    : "border-border focus:ring-azure/40 focus:border-azure";

export default function EditEmployeePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [employee, setEmployee] = useState<Profile | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [form, setForm] = useState<FormState | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    getEmployee(id)
      .then((emp) => {
        setEmployee(emp);
        setForm({
          name: emp.name,
          phone: emp.phone ?? "",
          jobRole: emp.job_role ?? "",
          designation: emp.designation ?? "",
          department: emp.department ?? "",
          employmentType: emp.employment_type ?? "",
          joiningDate: emp.joining_date ?? "",
          workLocation: emp.work_location ?? "",
        });
        setPhotoPreview(emp.photo_url);
      })
      .catch((err) => setLoadError(err.message));
  }, [id]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  function handlePhotoSelect(file: File | null) {
    if (!file) return;
    const validationError = validatePhotoFile(file);
    if (validationError) {
      setFieldErrors((prev) => ({ ...prev, photo: validationError }));
      return;
    }
    setFieldErrors((prev) => ({ ...prev, photo: undefined }));
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  function validate(f: FormState): FieldErrors {
    const errors: FieldErrors = {};
    if (!f.name.trim()) errors.name = "Full name is required.";
    if (!f.phone.trim()) errors.phone = "Phone number is required.";
    if (!f.jobRole) errors.jobRole = "Select a role.";
    if (!f.designation) errors.designation = "Select a designation.";
    if (!f.department) errors.department = "Select a department.";
    if (!f.employmentType) errors.employmentType = "Select employment type.";
    if (!f.joiningDate) errors.joiningDate = "Pick a joining date.";
    if (!f.workLocation) errors.workLocation = "Select a work location.";
    return errors;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form || !id) return;
    setFormError(null);

    const errors = validate(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setSubmitting(true);
    try {
      await updateEmployee(id, {
        name: form.name.trim(),
        phone: form.phone.trim(),
        designation: form.designation,
        department: form.department,
        job_role: form.jobRole,
        employment_type: form.employmentType,
        joining_date: form.joiningDate,
        work_location: form.workLocation,
      });

      if (photoFile) {
        try {
          await uploadEmployeePhoto(id, photoFile);
        } catch {
          // Non-fatal — profile details already saved successfully.
        }
      }

      navigate("/admin/employees", { replace: true, state: { updated: true } });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  if (loadError) {
    return <p className="text-sm font-medium text-red-600">{loadError}</p>;
  }

  if (!employee || !form) {
    return (
      <div className="p-10 flex justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-border border-t-azure animate-spin" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex items-center gap-1.5 text-xs text-muted mb-6">
        <Link to="/admin/employees" className="hover:text-azure transition-colors">
          Employees
        </Link>
        <ChevronRight size={12} />
        <span className="font-semibold text-heading">Edit Employee</span>
      </div>

      <div className="rounded-card bg-card border border-border p-6 sm:p-10">
        <form onSubmit={handleSubmit} noValidate>
          <section>
            <p className="text-xs font-bold uppercase tracking-wide text-azure mb-6">
              01 — Personal Information
            </p>

            <div className="flex flex-col sm:flex-row gap-8">
              <div className="flex flex-col items-center gap-2.5 shrink-0 sm:w-32">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-28 h-28 rounded-full border-2 border-dashed border-border bg-grid flex items-center justify-center overflow-hidden hover:border-azure/50 transition-colors"
                    aria-label="Change photo"
                  >
                    {photoPreview ? (
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Camera size={26} className="text-muted" />
                    )}
                  </button>
                  {photoPreview && (
                    <button
                      type="button"
                      onClick={() => {
                        setPhotoFile(null);
                        setPhotoPreview(null);
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                      aria-label="Remove photo"
                      className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white border border-border flex items-center justify-center text-muted hover:text-red-600 transition-colors shadow-sm"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-semibold text-azure hover:text-teal transition-colors"
                >
                  {photoPreview ? "Change Photo" : "Upload Photo"}
                </button>
                <p className="text-[10px] text-muted text-center leading-snug">
                  JPG, PNG or WebP
                  <br />
                  Max 2MB
                </p>
                <FieldError message={fieldErrors.photo} />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => handlePhotoSelect(e.target.files?.[0] ?? null)}
                />
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-muted mb-1.5">
                    Full Name
                    <Required />
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className={`${inputClass} ${inputBorder(fieldErrors.name)}`}
                  />
                  <FieldError message={fieldErrors.name} />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted mb-1.5">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    value={employee.employee_id ?? "—"}
                    disabled
                    className={`${inputClass} ${inputBorder()}`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted mb-1.5">Email</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                    <input
                      type="email"
                      value={employee.email}
                      disabled
                      className={`${inputClass} ${inputBorder()} pl-10`}
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-muted">Login email can't be changed here.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted mb-1.5">
                    Phone Number
                    <Required />
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className={`${inputClass} ${inputBorder(fieldErrors.phone)} pl-10`}
                    />
                  </div>
                  <FieldError message={fieldErrors.phone} />
                </div>
              </div>
            </div>
          </section>

          <section className="mt-8 pt-8 border-t border-border">
            <p className="text-xs font-bold uppercase tracking-wide text-azure mb-6">
              02 — Employment Information
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-muted mb-1.5">
                  Role
                  <Required />
                </label>
                <div className="relative">
                  <select
                    value={form.jobRole}
                    onChange={(e) => update("jobRole", e.target.value)}
                    className={`${inputClass} ${inputBorder(fieldErrors.jobRole)} appearance-none pr-9`}
                  >
                    <option value="" disabled>
                      Select role
                    </option>
                    {JOB_ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
                  />
                </div>
                <FieldError message={fieldErrors.jobRole} />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted mb-1.5">
                  Designation
                  <Required />
                </label>
                <div className="relative">
                  <select
                    value={form.designation}
                    onChange={(e) => update("designation", e.target.value)}
                    className={`${inputClass} ${inputBorder(fieldErrors.designation)} appearance-none pr-9`}
                  >
                    <option value="" disabled>
                      Select designation
                    </option>
                    {DESIGNATIONS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
                  />
                </div>
                <FieldError message={fieldErrors.designation} />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted mb-1.5">
                  Department
                  <Required />
                </label>
                <div className="relative">
                  <select
                    value={form.department}
                    onChange={(e) => update("department", e.target.value)}
                    className={`${inputClass} ${inputBorder(fieldErrors.department)} appearance-none pr-9`}
                  >
                    <option value="" disabled>
                      Select department
                    </option>
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
                  />
                </div>
                <FieldError message={fieldErrors.department} />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted mb-1.5">
                  Employment Type
                  <Required />
                </label>
                <div className="relative">
                  <select
                    value={form.employmentType}
                    onChange={(e) => update("employmentType", e.target.value)}
                    className={`${inputClass} ${inputBorder(fieldErrors.employmentType)} appearance-none pr-9`}
                  >
                    <option value="" disabled>
                      Select employment type
                    </option>
                    {EMPLOYMENT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
                  />
                </div>
                <FieldError message={fieldErrors.employmentType} />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted mb-1.5">
                  Joining Date
                  <Required />
                </label>
                <div className="relative">
                  <Calendar
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                  />
                  <input
                    type="date"
                    value={form.joiningDate}
                    onChange={(e) => update("joiningDate", e.target.value)}
                    className={`${inputClass} ${inputBorder(fieldErrors.joiningDate)} pl-10`}
                  />
                </div>
                <FieldError message={fieldErrors.joiningDate} />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted mb-1.5">
                  Work Location
                  <Required />
                </label>
                <div className="relative">
                  <select
                    value={form.workLocation}
                    onChange={(e) => update("workLocation", e.target.value)}
                    className={`${inputClass} ${inputBorder(fieldErrors.workLocation)} appearance-none pr-9`}
                  >
                    <option value="" disabled>
                      Select work location
                    </option>
                    {WORK_LOCATIONS.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
                  />
                </div>
                <FieldError message={fieldErrors.workLocation} />
              </div>
            </div>
          </section>

          {formError && (
            <p className="mt-8 text-xs font-medium text-red-600 bg-red-50 border border-red-100 rounded-xl px-3.5 py-2.5">
              {formError}
            </p>
          )}

          <div className="flex items-center gap-3 mt-8 pt-6 border-t border-border">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full px-6 py-2.5 text-sm font-semibold bg-azure text-white transition-colors duration-250 hover:bg-teal disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
            >
              {submitting && (
                <span className="w-3.5 h-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
              )}
              {submitting ? "Saving…" : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/employees")}
              className="rounded-full px-6 py-2.5 text-sm font-semibold border border-border text-muted hover:text-heading hover:border-heading/30 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
