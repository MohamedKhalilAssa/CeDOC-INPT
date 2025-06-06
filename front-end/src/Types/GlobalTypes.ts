import { RoleEnum } from "./UtilisateursEnums";

export type decodedJWT = {
  exp: number;
  iat: number;
  sub: string;
  roles: RoleEnum[];
};

export type baseResponse = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
};

export type APIResponse = {
  message: string;
  statusCode: number;
};
