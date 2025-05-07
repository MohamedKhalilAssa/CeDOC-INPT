enum EtatCivilEnum {
  MARIER = "Marié",
  DIVORCER = "Divorcé",
  CELIBATAIRE = "Veuf",
}

enum GenreEnum {
  HOMME = "Homme",
  FEMME = "Femme",
}

type RegisterFormValues = {
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

export { EtatCivilEnum, GenreEnum };
export type { RegisterFormValues };
