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

export type TableConfig = {
  search: string;
  sortBy: string;
  sort: "asc" | "desc" | "";
  filters: { [key: string]: string };
  page: number;
  pageSize: number;
};

export type TableState<T> = {
  config: TableConfig;
  data: PaginatedResponse<T>;
  loading: boolean;
  error: string | null;
  stableData: PaginatedResponse<T> | null; // For data stability during loading
};
