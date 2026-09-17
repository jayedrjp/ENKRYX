import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { initLenis } from "./lib/lenis";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import PortfolioPage from "./pages/PortfolioPage";
import TeamPage from "./pages/TeamPage";
import AboutPage from "./pages/AboutPage";
import ProgramsPage from "./pages/ProgramsPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import EmployeeLoginPage from "./pages/employee/EmployeeLoginPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import EmployeeLayout from "./layouts/EmployeeLayout";
import EmployeeDashboardPage from "./pages/employee/EmployeeDashboardPage";
import MyTasksPage from "./pages/employee/MyTasksPage";
import EmployeeTaskHistoryPage from "./pages/employee/EmployeeTaskHistoryPage";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import EmployeesPage from "./pages/admin/EmployeesPage";
import CreateEmployeePage from "./pages/admin/CreateEmployeePage";
import EditEmployeePage from "./pages/admin/EditEmployeePage";
import TasksPage from "./pages/admin/TasksPage";
import AssignTaskPage from "./pages/admin/AssignTaskPage";
import EditTaskPage from "./pages/admin/EditTaskPage";
import TodaysWorkPage from "./pages/admin/TodaysWorkPage";
import TaskHistoryPage from "./pages/admin/TaskHistoryPage";

// Public marketing site keeps its own Navbar/Footer chrome.
// Auth and admin/employee routes render full-screen, without the marketing chrome.
function MarketingLayout() {
  return (
    <div className="bg-canvas">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isAppShell = location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/employee") ||
    location.pathname === "/login" ||
    location.pathname === "/reset-password";

  if (!isAppShell) {
    return <MarketingLayout />;
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/employee/login" element={<EmployeeLoginPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />

      <Route
        path="/employee"
        element={
          <ProtectedRoute allowedRole="employee">
            <EmployeeLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<EmployeeDashboardPage />} />
        <Route path="tasks" element={<MyTasksPage />} />
        <Route path="history" element={<EmployeeTaskHistoryPage />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="employees" element={<EmployeesPage />} />
        <Route path="employees/create" element={<CreateEmployeePage />} />
        <Route path="employees/:id/edit" element={<EditEmployeePage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="tasks/assign" element={<AssignTaskPage />} />
        <Route path="tasks/:id/edit" element={<EditTaskPage />} />
        <Route path="today" element={<TodaysWorkPage />} />
        <Route path="history" element={<TaskHistoryPage />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  // Starts once for the whole app, so smooth scroll works on every
  // route/page, not just while a particular section is mounted.
  useEffect(() => {
    initLenis();
  }, []);

  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}