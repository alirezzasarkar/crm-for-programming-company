import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  login as apiLogin,
  register as apiRegister,
} from "../../services/userService"; // مسیر صحیح فایل خدمات API

interface User {
  phone_number: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: {
    phone_number: string;
    password: string;
  }) => Promise<void>;
  register: (userData: {
    full_name: string;
    phone_number: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // const [user, setUser] = useState<User | null>(null);
  const [user, setUser] = useState<User | null>({
    phone_number: "09901032844",
    role: "manager",
  });

  const login = async (credentials: {
    phone_number: string;
    password: string;
  }) => {
    try {
      const response = await apiLogin(credentials);
      setUser(response.user);
      localStorage.setItem("authToken", response.token);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const register = async (userData: {
    full_name: string;
    phone_number: string;
    password: string;
  }) => {
    try {
      const response = await apiRegister(userData);
      setUser(response.user);
      localStorage.setItem("authToken", response.token);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
