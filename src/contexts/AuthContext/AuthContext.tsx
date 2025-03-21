"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  id: string;
}

interface AuthContextType {
  user: User | null;
  login: (userId: string, accessToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProverProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProverProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isMounted, setIsMounted] = useState(false); // Prevent hydration mismatch

  useEffect(() => {
    setIsMounted(true);
    const storedUser = localStorage.getItem("id");
    if (storedUser) {
      setUser({ id: storedUser });
    }
  }, []);

  const login = (userId: string, accessToken: string) => {
    localStorage.setItem("id", userId);
    localStorage.setItem("acctoken", accessToken);
    setUser({ id: userId });
  };

  const logout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("acctoken");
    setUser(null);
  };

  if (!isMounted) return null; // Ensure component mounts before rendering

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
