import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import { useAuth } from "./components/Authentication/AuthContext"; // فرض بر این است که یک AuthContext داریم

const App: React.FC = () => {
  const { user } = useAuth(); // استفاده از AuthContext

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        {/* Protected Route برای داشبورد */}
        <Route
          path="/dashboard/*"
          element={user ? <DashboardPage /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
