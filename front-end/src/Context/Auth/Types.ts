import { decodedJWT } from "@/Types/GlobalTypes";

export type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  utilisateur: decodedJWT | null;
};
