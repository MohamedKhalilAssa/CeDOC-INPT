import type { AuthContextType } from "@/Context/AuthProvider"; // adjust this import as needed
import { getData, postData } from "@/Helpers/CRUDFunctions";
import { UseAlert } from "@/Hooks/UseAlert";
import appConfig from "@/public/config";
import { AuthenticationResponseValues } from "@/Types/RegisterTypes";

export const checkAuth = async (auth: AuthContextType): Promise<any> => {
  try {
    if (localStorage.getItem("isAuthenticated") === "false") return;
    const res = await getData(appConfig.API_PATHS.authCheck.path);
    auth.login();
    return res;
  } catch (error) {
    auth.logout();
    return null;
  }
};

export const logout = async (auth: AuthContextType, swal: UseAlert) => {
  try {
    const res: AuthenticationResponseValues | undefined = await postData(
      appConfig.API_PATHS.logout.path,
      {}
    );
    if (res?.status === 200) {
      auth.logout();
      swal.toast("Déconnexion réussie", "success");
    } else {
      throw new Error("Failed to logout");
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
