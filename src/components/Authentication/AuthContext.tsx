import React, { createContext, useContext, ReactNode } from "react";
import { ROLES } from "./Roles";

// تعریف نوع User
interface User {
  username: string;
  role: string;
}

// نوع داده‌های AuthContext
interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = React.useState<User | null>(null);

  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  const hasRole = (role: string) => {
    return user?.role === role;
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, hasRole }}
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
