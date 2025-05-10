import { useAuth } from "@/Context/AuthProvider";
import { useAlert } from "@/Hooks/UseAlert";
import appConfig from "@/public/config";
import { useEffect, type JSX } from "react";
import { Outlet, useNavigate } from "react-router-dom";
const GuestAuthLayout = (): JSX.Element => {
  const auth = useAuth();
  const navigate = useNavigate();
  const swal = useAlert();
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(appConfig.FRONTEND_PATHS.landingPage.path);
      swal.toast("Acces refusé: Vous etes deja connecter", "error");
    }
  }, []);
  return <Outlet />;
};

export default GuestAuthLayout;
