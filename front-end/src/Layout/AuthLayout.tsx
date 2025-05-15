import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar";
import { AuthContextType, useAuth } from "@/Context/Auth/index";
import { checkAuth } from "@/Helpers/AuthFunctions";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const auth: AuthContextType = useAuth();
  useEffect(() => {
    checkAuth(auth);
  }, []);

  return;
  <>
    <Navbar />
    isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    <Footer />
  </>;
};

export default AuthLayout;
