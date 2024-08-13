import React from "react";
import Login from "../components/Authentication/Login";

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-gray-200 to-gray-500">
      <Login />
    </div>
  );
};

export default LoginPage;
