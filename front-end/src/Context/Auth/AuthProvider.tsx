// context/AuthContext.tsx
import { AuthContext } from "@/Context/Auth/AuthContext";
import { type decodedJWT } from "@/Types/GlobalTypes";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const [utilisateur, setUtilisateur] = useState<decodedJWT | null>(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      return jwtDecode<decodedJWT>(token);
    } catch {
      return null;
    }
  });

  const login = () => {
    localStorage.setItem("isAuthenticated", "true");

    setIsAuthenticated(true);
    const token = localStorage.getItem("token");
    if (token) {
      try {
        setUtilisateur(jwtDecode<decodedJWT>(token));
      } catch {
        setUtilisateur(null);
      }
    } else {
      setUtilisateur(null);
    }
  };

  const logout = () => {
    localStorage.setItem("isAuthenticated", "false");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUtilisateur(null);
  };

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
