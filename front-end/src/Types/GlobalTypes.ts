export type decodedJWT = {
  exp: number;
  iat: number;
  sub: string;
  role: string[];
};

export type baseResponse = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
};


