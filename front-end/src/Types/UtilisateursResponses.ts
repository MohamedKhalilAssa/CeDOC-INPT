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
  pays: string;
  ville: string;
}
export interface UtilisateurResponseDTO extends baseResponse {
  nom?: string;
  prenom?: string;
  email: string;
  telephone?: string;
  dateNaissance?: Date;
  etatCivilEnum?: EtatCivilEnum;
  statutProfessionnel?: string;
  
  genre?: GenreEnum;
  emailValider: boolean;
  roles: Role[];
  nationalite?: Nationalite;
  lieuDeNaissance?: LieuDeNaissance;
}
export interface CandidatResponseDTO extends UtilisateurResponseDTO {

}

export enum RoleEnum {
  CANDIDAT = "CANDIDAT",
  PROFESSEUR = "PROFESSEUR",
  DOCTORANT = "DOCTORANT",
  CHEF_EQUIPE = "CHEF_EQUIPE",
  RESPONSABLE_FORMATION = "RESPONSABLE_FORMATION",
  DIRECTEUR_DE_THESE = "DIRECTEUR_DE_THESE",
  DIRECTION_CEDOC = "DIRECTION_CEDOC"
}
