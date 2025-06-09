import type { AuthContextType } from "@/Context/Auth/index"; // adjust this import as needed
import { getData, postData } from "@/Helpers/CRUDFunctions";
import { UseAlert } from "@/Hooks/UseAlert";
import appConfig from "@/public/config";
import { AuthenticationResponseValues } from "@/Types/AuthTypes";
import { decodedJWT } from "@/Types/GlobalTypes";
import { jwtDecode } from "jwt-decode";

export const checkAuth = async (
  onSuccess: (user: decodedJWT) => void,
  onFailure: () => void
): Promise<any> => {
  try {
    if (localStorage.getItem("isAuthenticated") === "false") return;

    const res = await getData(appConfig.API_PATHS.AUTH.authCheck.path);
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Missing token");

    const decoded = jwtDecode<decodedJWT>(token);
    onSuccess(decoded);
    return res;
  } catch (error: any) {
    // Handle specific token expiration errors
    if (
      error?.response?.status === 401 &&
      error?.response?.data?.requiresLogin
    ) {
      console.warn("Token validation failed:", error.response.data.message);
      localStorage.setItem("tokenExpired", "true");
    }

    onFailure();
    return null;
  }
};
export const logout = async (auth: AuthContextType, swal: UseAlert) => {
  try {
    const res: AuthenticationResponseValues | undefined = await postData(
      appConfig.API_PATHS.AUTH.logout.path,
      {}
    );

    if (res?.status === 200) {
      userDirectedLogoutStorage();
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

const userDirectedLogoutStorage = () => {
  localStorage.setItem("userDirectedLogout", "true");
  localStorage.removeItem("userDirectedLogin");
};

export const userDirectedLoginStorage = () => {
  localStorage.setItem("userDirectedLogin", "true");
  localStorage.removeItem("userDirectedLogout");
};
