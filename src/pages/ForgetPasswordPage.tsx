import React from "react";
import ForgetPassword from "../components/Authentication/ForgotPassword";

const ForgetPasswordPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-gray-200 to-gray-500">
      <ForgetPassword />
    </div>
  );
};

export default ForgetPasswordPage;
