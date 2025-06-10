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
    // Check if logout was due to token expiration
    const wasTokenExpired = localStorage.getItem("tokenExpired") === "true";
    if (wasTokenExpired) {
      localStorage.removeItem("tokenExpired");
      // You could show a toast message here about session expiration
      console.log("Session expired, user logged out");
    }
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
        // Check if this was due to token expiration
        const tokenExpired = localStorage.getItem("tokenExpired");
        if (tokenExpired === "true") {
          localStorage.removeItem("tokenExpired");
          console.warn("Authentication failed due to expired tokens");
        }
        logout();
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);
  useEffect(() => {
    const handleStorageChange = () => {
      // Check if tokenExpired flag was set
      const tokenExpired = localStorage.getItem("tokenExpired");
      if (tokenExpired === "true") {
        console.warn("Token expired detected in localStorage - logging out");
        localStorage.removeItem("tokenExpired");
        logout();
        return;
      }

      // Check if isAuthenticated was manually set to false
      const authStatus = localStorage.getItem("isAuthenticated");
      if (authStatus === "false" && isAuthenticated) {
        console.log("Authentication status changed to false - logging out");
        logout();
        return;
      }

      // Check if token was removed
      const token = localStorage.getItem("token");
      if (!token && isAuthenticated) {
        console.log("Token removed from localStorage - logging out");
        logout();
        return;
      }

      // If we have a token and auth status is true, sync the state
      if (token && authStatus === "true") {
        syncStateFromToken();
      }
    };

    // Check initial state
    handleStorageChange();

    // Listen for storage changes
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, utilisateur, login, logout, loading, roles }}
    >
      {children}
    </AuthContext.Provider>
  );
};
