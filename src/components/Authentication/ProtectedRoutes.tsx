import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface ProtectedRouteProps {
  element: React.ReactElement;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  allowedRoles,
}) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user && allowedRoles.includes(user.role)) {
    return element;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default ProtectedRoute;
