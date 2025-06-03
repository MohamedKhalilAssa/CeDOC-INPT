import { AuthContextType, useAuth } from "@/Context/Auth/index";
import { useAlert } from "@/Hooks/UseAlert";
import appConfig from "@/public/config";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthOnlyLayout = () => {
  const auth: AuthContextType = useAuth();
  const navigate = useNavigate();
  const swal = useAlert();

  useEffect(() => {
    if (!auth.loading && !auth.isAuthenticated) {
      const fromLogout = localStorage.getItem("userDirectedLogout") === "true";
      if (!fromLogout) {
        swal.toast("Accès refusé : Vous êtes non connecté", "error");
      }
      navigate(appConfig.FRONTEND_PATHS.AUTH.login.path);
    }
  }, [auth.loading, auth.isAuthenticated]);

  if (auth.loading) return <div>Loading...</div>;

  return <Outlet />;
};

export default AuthOnlyLayout;
