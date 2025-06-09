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

export type PaginatedResponse<T> = {
  content: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  isLast: boolean;
};
