import { decodedJWT } from "@/Types/GlobalTypes";
import { RoleEnum } from "@/Types/UtilisateursTypes";

export type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  utilisateur: decodedJWT | null;
  roles?: RoleEnum[];
  loading: boolean;
};
