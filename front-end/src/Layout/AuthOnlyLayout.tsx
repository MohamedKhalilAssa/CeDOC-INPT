import { AuthContextType, useAuth } from "@/Context/Auth/index";
import { checkAuth } from "@/Helpers/AuthFunctions";
import { useAlert } from "@/Hooks/UseAlert";
import appConfig from "@/public/config";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthOnlyLayout = () => {
  const auth: AuthContextType = useAuth();
  const navigate = useNavigate();
  const swal = useAlert();

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") checkAuth(auth);
    if (!auth.isAuthenticated) {
      navigate(appConfig.FRONTEND_PATHS.login.path);
      swal.toast("Accès refusé : Vous êtes Non connecté", "error");
    }
  }, []);

  return <Outlet />;
};

export default AuthOnlyLayout;
