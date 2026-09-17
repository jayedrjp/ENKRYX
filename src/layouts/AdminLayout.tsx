import { useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ListChecks,
  CalendarCheck,
  History,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const NAV_ITEMS = [
  { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Employees", to: "/admin/employees", icon: Users },
  { label: "Tasks", to: "/admin/tasks", icon: ListChecks },
  { label: "Today's Work", to: "/admin/today", icon: CalendarCheck },
  { label: "Task History", to: "/admin/history", icon: History },
];

// Page title + short description shown in the header, keyed by route.
// Extend this as new admin pages are added.
const PAGE_META: Record<string, { title: string; description: string }> = {
  "/admin/dashboard": { title: "Dashboard", description: "Overview of employees and task activity." },
  "/admin/employees": { title: "Employees", description: "View and manage employee accounts." },
  "/admin/employees/create": { title: "Create Employee", description: "Add a new employee to ENKRYX." },
  "/admin/tasks": { title: "Tasks", description: "All tasks assigned across the team." },
  "/admin/tasks/assign": { title: "Assign Task", description: "Assign a new task to an employee." },
  "/admin/today": { title: "Today's Work", description: "Who's completed today's tasks, and who hasn't." },
  "/admin/history": { title: "Task History", description: "Browse all completed tasks and submitted work." },
};

function resolvePageMeta(pathname: string): { title: string; description: string } {
  if (PAGE_META[pathname]) return PAGE_META[pathname];
  if (/^\/admin\/employees\/.+\/edit$/.test(pathname)) {
    return { title: "Edit Employee", description: "Update this employee's details." };
  }
  if (/^\/admin\/tasks\/.+\/edit$/.test(pathname)) {
    return { title: "Edit Task", description: "Update this task's details." };
  }
  return { title: "Admin Panel", description: "" };
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut();
    navigate("/login", { replace: true });
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="h-20 flex items-center px-6 border-b border-border shrink-0">
        <Link to="/admin/dashboard" className="flex items-center select-none">
          <img src="/enkryx-logo.png" alt="ENKRYX" className="h-8 w-auto" />
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-1">
        {NAV_ITEMS.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors duration-250 ${
                isActive
                  ? "bg-azure text-white"
                  : "text-heading hover:bg-grid"
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border p-4 shrink-0">
        <div className="flex items-center gap-3 px-2 mb-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold bg-azure shrink-0">
            {(profile?.name ?? "A").slice(0, 1).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-heading truncate">{profile?.name ?? "Admin"}</p>
            <p className="text-[11px] text-muted truncate">{profile?.email}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-muted hover:bg-grid hover:text-heading transition-colors duration-250"
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Best-effort match of the current path to a header title/description.
  const { pathname } = useLocation();
  const meta = resolvePageMeta(pathname);

  return (
    <div className="min-h-screen flex bg-canvas">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 border-r border-border">
        <div className="fixed w-64 h-screen">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile sidebar drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85%] shadow-xl">
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top header */}
        <header className="h-20 shrink-0 flex items-center justify-between gap-4 px-6 lg:px-10 border-b border-border bg-white/90 backdrop-blur sticky top-0 z-30">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              className="lg:hidden text-heading shrink-0"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <div className="min-w-0">
              <h1 className="text-lg font-extrabold italic uppercase tracking-tight text-heading truncate">
                {meta.title}
              </h1>
              {meta.description && (
                <p className="text-xs text-muted truncate">{meta.description}</p>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
