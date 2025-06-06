import { useAuth } from "@/Context/Auth/index";
import { useAlert } from "@/Hooks/UseAlert";
import appConfig from "@/public/config";
import { useEffect, type JSX } from "react";
import { Outlet, useNavigate } from "react-router-dom";
const GuestAuthLayout = (): JSX.Element => {
  const auth = useAuth();
  const navigate = useNavigate();
  const swal = useAlert();
  useEffect(() => {
    if (!auth.loading && auth.isAuthenticated) {
      const fromLogin = localStorage.getItem("userDirectedLogin") === "true";
      if (!fromLogin) {
        swal.toast("Accès refusé : Vous êtes déjà connecté", "error");
      }
      navigate(appConfig.FRONTEND_PATHS.GLOBAL.landingPage.path);
    }
  }, [auth.loading, auth.isAuthenticated]);

  if (auth.loading) return <div>Loading...</div>;

  return <Outlet />;
};

export default GuestAuthLayout;
