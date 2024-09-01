import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface ProtectedRouteProps {
  allowedRoles: string[];
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  redirectTo = "/login",
}) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
