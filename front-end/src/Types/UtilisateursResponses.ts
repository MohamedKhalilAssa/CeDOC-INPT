// Main Utilisateur interface
import { baseResponse } from "@/Types/GlobalTypes";
import { EtatCivilEnum, GenreEnum } from "@/Types/UtilisateursEnums";
// Supporting interfaces
export interface Role extends baseResponse {
  id: number;
  intitule: string;
}
export interface Nationalite extends baseResponse {
  intitule: string;
}
export interface LieuDeNaissance extends baseResponse {
  nom: string;
}
export interface UtilisateurResponseDTO extends baseResponse {
  nom?: string;
  prenom?: string;
  email: string;
  telephone?: string;
  dateNaissance?: Date;
  etatCivilEnum?: EtatCivilEnum;
  genre?: GenreEnum;
  emailValider: boolean;
  roles: Role[];
  nationalite?: Nationalite;
  lieuDeNaissance?: LieuDeNaissance;
}
