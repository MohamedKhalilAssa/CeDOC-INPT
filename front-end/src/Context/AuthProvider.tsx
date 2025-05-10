// context/AuthContext.tsx
import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";
export type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  utilisateur: Utilisateur | null;
};

export type Utilisateur = {
  sub: string; // subject OR Email
  role: string[];
  iat: number;
  exp: number;
};

const AuthContext = createContext<AuthContextType | null>(null);
let externalLogin: () => void = () => {};
let externalLogout: () => void = () => {};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      return jwtDecode<Utilisateur>(token);
    } catch {
      return null;
    }
  });

  const login = () => {
    localStorage.setItem("isAuthenticated", "true");

    setIsAuthenticated(true);
    setUtilisateur(utilisateur);
  };

  const logout = () => {
    localStorage.setItem("isAuthenticated", "false");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUtilisateur(null);
  };

  externalLogin = login;
  externalLogout = logout;
  // Handle storage changes across tabs or manually
  useEffect(() => {
    const syncAuthState = () => {
      const storedState = localStorage.getItem("isAuthenticated") === "true";
      setIsAuthenticated(storedState);
    };
    window.addEventListener("storage", syncAuthState);
    return () => window.removeEventListener("storage", syncAuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, utilisateur }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const getExternalAuthHandlers = () => ({
  login: externalLogin,
  logout: externalLogout,
});
