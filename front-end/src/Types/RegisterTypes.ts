enum EtatCivilEnum {
  MARIER = "Marié",
  DIVORCER = "Divorcé",
  CELIBATAIRE = "Veuf",
}

enum GenreEnum {
  HOMME = "Homme",
  FEMME = "Femme",
}

type UtilisateurValues = {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  password: string;
  passwordConfirmation: string;
  dateNaissance: Date;
  genre: GenreEnum;
  etatCivilEnum: EtatCivilEnum;
  nationaliteId: number;
  lieuDeNaissanceId: number;
};
type RegisterFormValues = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

type AuthenticationFormValues = {
  email: string;
  password: string;
};
type AuthenticationResponseValues = {
  access_token: string;
  status: number;
  message: string;
};

export { EtatCivilEnum, GenreEnum };
export type {
  AuthenticationFormValues,
  AuthenticationResponseValues,
  RegisterFormValues,
  UtilisateurValues,
};
