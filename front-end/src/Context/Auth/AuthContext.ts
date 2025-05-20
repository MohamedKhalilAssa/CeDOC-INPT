import { AuthContextType } from "@/Context/Auth/Types";
import { createContext } from "react";

export const AuthContext = createContext<AuthContextType | null>(null);
