import React from "react";
import { useAuth } from "./AuthContext"; // مسیر مناسب را تنظیم کنید

interface AccessControlProps {
  role: string; // نقشی که به آن نیاز داریم
  children: React.ReactNode; // محتوایی که باید در صورت داشتن دسترسی نمایش داده شود
}

const AccessControl: React.FC<AccessControlProps> = ({ role, children }) => {
  const { isAuthenticated, hasAccess } = useAuth();

  // اگر کاربر وارد نشده یا به نقش مورد نیاز دسترسی ندارد
  if (!isAuthenticated || !hasAccess(role)) {
    return <></>; // می‌توانید یک صفحه یا پیام دیگر هم نمایش دهید
  }

  return <>{children}</>; // در غیر این صورت محتوای اصلی را نمایش دهید
};

export default AccessControl;
