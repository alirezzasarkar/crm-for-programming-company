import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface ProtectedRouteProps {
  allowedRoles: string[];
  redirectTo?: string;
  children?: React.ReactNode; // Allow children as a prop
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  redirectTo = "/login",
  children, // Use the children prop here
}) => {
  const { user } = useAuth();
  const location = useLocation();

  // If no user or user's role is not in allowedRoles, redirect to login
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Render children if user is authorized
  return <>{children ? children : <Outlet />}</>; // Render children or Outlet if none provided
};

export default ProtectedRoute;
