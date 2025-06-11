// Main Utilisateur interface
import { baseResponse } from "@/Types/GlobalTypes";
import {
  CandidatureEnum,
  DiplomeEnum,
  EtablissementEnum,
  EtatCivilEnum,
  GenreEnum,
  MentionEnum,
} from "@/Types/UtilisateursEnums";
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

// Professeur response DTO
export interface ProfesseurResponseDTO extends UtilisateurResponseDTO {
  grade: string;
}

// Doctorant response DTO
export interface DoctorantResponseDTO extends UtilisateurResponseDTO {
  dateInscription?: string;
  statutDoctorant?: string;
  nombreHeuresLabo?: number;
  draftDiplomeUrl?: string;
  archiver?: boolean;
}

// Équipe de recherche response DTO
export interface EquipeResponseDTO extends baseResponse {
  nomDeLequipe: string;
  nomCompletChef?: string;
  chefEquipeId?: number;
  membres: ProfesseurResponseDTO[];
  doctorants?: DoctorantResponseDTO[]; // Add doctorants list for detailed view
  nombreMembres: number;
  nombreDoctorants: number;
}

// Équipe de recherche request DTO
export interface EquipeRequestDTO {
  nomDeLequipe: string;
  chefEquipeId?: number;
  membreIds?: number[]; // Liste des IDs des professeurs membres de l'équipe
  doctorantIds?: number[]; // Liste des IDs des doctorants rattachés à l'équipe
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
