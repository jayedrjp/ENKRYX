import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { UserRole } from "../types";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRole: UserRole;
}

export default function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
  const { session, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas">
        <div className="w-8 h-8 rounded-full border-2 border-border border-t-azure animate-spin" />
      </div>
    );
  }

  if (!session) {
    // Redirect to the login page that matches this route's required role.
    const loginPath = allowedRole === "admin" ? "/admin/login" : "/employee/login";
    return <Navigate to={loginPath} replace />;
  }

  if (profile && profile.role !== allowedRole) {
    // Logged in, but wrong role — send them to their own dashboard instead.
    const redirectTo = profile.role === "admin" ? "/admin/dashboard" : "/employee/dashboard";
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}

