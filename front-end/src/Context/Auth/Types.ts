export type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  utilisateur: Utilisateur | null;
};

export type Utilisateur = {
  sub: string; // subject OR Email
  role: string[];
  iat: number;
  exp: number;
};
