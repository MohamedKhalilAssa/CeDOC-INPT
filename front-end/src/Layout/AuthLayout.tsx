import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar";
import { checkAuth } from "@/Helpers/checkAuth";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth(setIsAuthenticated, setLoading);
  }, []);

  if (loading) return <div className="text-center py-10">Chargement...</div>;

  return;
  <>
    <Navbar />
    isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    <Footer />
  </>;
};

export default AuthLayout;
