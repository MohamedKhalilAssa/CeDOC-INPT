import { getData } from "@/Helpers/CRUDFunctions";
import appConfig from "@/public/config";

type SetStateFn = React.Dispatch<React.SetStateAction<boolean>>;

export const checkAuth = async (
  setIsAuthenticated: SetStateFn,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
): Promise<any> => {
  try {
    if(localStorage.getItem("isAuthenticated") === "false") return;
    const res = await getData(appConfig.API_PATHS.authCheck.path);
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
    return res;
  } catch (error) {
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", "false");
    localStorage.removeItem("token");
    return null;
  } finally {
    if (setLoading) setLoading(false);
  }
};
