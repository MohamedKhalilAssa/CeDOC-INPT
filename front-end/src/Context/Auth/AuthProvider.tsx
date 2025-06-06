// context/AuthContext.tsx
import { AuthContext } from "@/Context/Auth/AuthContext";
import { checkAuth } from "@/Helpers/AuthFunctions"; // your function that validates token
import { type decodedJWT } from "@/Types/GlobalTypes";
import { RoleEnum } from "@/Types/UtilisateursEnums";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [utilisateur, setUtilisateur] = useState<decodedJWT | null>(null);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState<RoleEnum[]>([]);

  const syncStateFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      setUtilisateur(null);
      return;
    }

    try {
      const decoded = jwtDecode<decodedJWT>(token);
      setUtilisateur(decoded);
      setRoles(decoded.roles);
      setIsAuthenticated(true);
    } catch {
      setUtilisateur(null);
      setIsAuthenticated(false);
    }
  };

  const login = () => {
    localStorage.setItem("isAuthenticated", "true");
    syncStateFromToken();
  };

  const logout = () => {
    localStorage.setItem("isAuthenticated", "false");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setRoles([]);
    setUtilisateur(null);
  };

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token");

        const result = await checkAuth(login, logout);
        if (result) {
          syncStateFromToken();
        } else {
          logout();
        }
      } catch (err) {
        logout();
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);

  useEffect(() => {
    const syncAuthState = () => {
      syncStateFromToken();
    };
    window.addEventListener("storage", syncAuthState);
    return () => window.removeEventListener("storage", syncAuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, utilisateur, login, logout, loading, roles }}
    >
      {children}
    </AuthContext.Provider>
  );
};
