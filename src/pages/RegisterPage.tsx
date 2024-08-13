import React from "react";
import Register from "../components/Authentication/Register";

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-gray-200 to-gray-500">
      <Register />
    </div>
  );
};

export default RegisterPage;
