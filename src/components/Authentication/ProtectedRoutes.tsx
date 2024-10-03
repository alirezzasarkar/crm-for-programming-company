import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface ProtectedRouteProps {
  redirectTo?: string;
  children?: React.ReactNode; // Allow children as a prop
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectTo = "/login",
  children,
}) => {
  const { user } = useAuth(); // گرفتن اطلاعات کاربر از AuthContext
  const location = useLocation();

  // اگر کاربر لاگین نکرده باشد، او را به صفحه لاگین هدایت کنید
  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // در غیر این صورت محتوای محافظت‌شده را نمایش دهید
  return <>{children ? children : <Outlet />}</>;
};

export default ProtectedRoute;
