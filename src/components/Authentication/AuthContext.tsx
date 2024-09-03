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

interface User {
  user_id: number;
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        setUser(decodeToken(token));
      } catch (e) {
        console.error("Error decoding token:", e);
        localStorage.removeItem("authToken");
      }
    }
    setLoading(false); // پس از بررسی JWT، لودینگ را به پایان برسانید
  }, []);

  const decodeToken = (token: string): User => {
    const decoded: any = jwtDecode(token);
    return {
      user_id: decoded.user_id,
      role: decoded.role,
    };
  };

  const login = async (credentials: {
    phone_number: string;
    password: string;
  }) => {
    try {
      const response = await apiLogin(credentials);
      const token = response.access;
      localStorage.setItem("authToken", token);
      setUser(decodeToken(token));
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
      const token = response.data.access;
      localStorage.setItem("authToken", token);
      setUser(decodeToken(token));
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
  };

  const isAuthenticated = !!user;

  if (loading) {
    return <div>Loading...</div>; // نمایش یک لودینگ ساده تا وقتی که وضعیت JWT بررسی شود
  }

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
