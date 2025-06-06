// Main Utilisateur interface
import { baseResponse } from "@/Types/GlobalTypes";
import { CandidatureEnum, DiplomeEnum, EtablissementEnum, EtatCivilEnum, GenreEnum, MentionEnum } from "@/Types/UtilisateursEnums";
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
export interface CandidatureRequestDTO extends UtilisateurResponseDTO {
  // On conserve le champ statutCandidature (même si on forcera en SOUMISE)
  statutCandidature: CandidatureEnum;

  mentionBac: MentionEnum;

  diplome: DiplomeEnum;

  mentionDiplome: MentionEnum;

  dossierCandidature: File; // Use File or a custom type for file uploads

  typeEtablissement: EtablissementEnum;

  specialite: string;

  intitulePFE: string;

  /**
   * Liste des IDs des sujets choisis (1 à 3 éléments).
   */
  sujetsIds: number[];
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
