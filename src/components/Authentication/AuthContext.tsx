import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { jwtDecode } from "jwt-decode";
import {
  login as apiLogin,
  register as apiRegister,
} from "../../services/userService";
import LoadingSpinner from "../Common/Loading";

interface User {
  user_id: number;
  role: string; // نقش کاربر
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: {
    phone_number: string;
    password: string;
  }) => Promise<boolean>; // تغییر نوع به Promise<boolean>
  register: (userData: {
    first_name: string;
    last_name: string;
    phone_number: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  loading: boolean; // وضعیت لودینگ
  hasAccess: (requiredRole: string) => boolean; // تابع بررسی دسترسی
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        setUser(decodeToken(token)); // ست کردن کاربر با نقش
      } catch (e) {
        console.error("Error decoding token:", e);
        localStorage.removeItem("authToken");
      }
    }
    setLoading(false);
  }, []);

  const decodeToken = (token: string): User => {
    const decoded: any = jwtDecode(token);
    return {
      user_id: decoded.user_id,
      role: decoded.role, // نقش کاربر را از توکن استخراج می‌کنیم
    };
  };

  const login = async (credentials: {
    phone_number: string;
    password: string;
  }): Promise<boolean> => {
    try {
      const response = await apiLogin(credentials);
      const token = response.access;
      localStorage.setItem("authToken", token);
      setUser(decodeToken(token));
      return true; // بازگرداندن true در صورت موفقیت
    } catch (error) {
      console.error("Login failed:", error);
      return false; // بازگرداندن false در صورت شکست
    }
  };

  const register = async (userData: {
    first_name: string;
    last_name: string;
    phone_number: string;
    password: string;
  }) => {
    try {
      const response = await apiRegister(userData);
      const token = response.data.access;
      localStorage.setItem("authToken", token);
      setUser(decodeToken(token));
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error("Registration failed");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
  };

  const isAuthenticated = !!user;

  const hasAccess = (requiredRole: string) => {
    return user?.role === requiredRole; // بررسی نقش کاربر
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        loading,
        hasAccess,
      }}
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
