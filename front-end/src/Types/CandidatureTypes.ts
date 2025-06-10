import { UtilisateurResponseDTO } from "@/Types/UtilisateursTypes";

export enum GradeProfesseurEnum {
  ASSISTANT = "ASSISTANT",
  HABILITE = "HABILITE",
  PES = "PES",
}

export interface ProfesseurResponseDTO extends UtilisateurResponseDTO {
  grade: GradeProfesseurEnum;
}

export interface CandidatureAccessible {
  id: number;
  statutCandidature: string;
  dossierCandidature: string;
  diplome: string;
  mentionBac: string;
  mentionDiplome: string;
  specialite: string;
  intitulePFE: string;
  typeEtablissement: string;
  createdAt: string;
  updatedAt: string;
  candidat: UtilisateurResponseDTO;
  sujets: SujetResponseDTO[];
}

export interface SujetResponseDTO {
  id: number;
  intitule: string;
  description: string;
  estPublic: boolean;
  valide: boolean;
  createdAt: string;
  updatedAt: string;
  chefEquipe: UtilisateurResponseDTO;
  directeurDeThese?: UtilisateurResponseDTO;
  professeurs: ProfesseurResponseDTO[];
}

export interface ChefSujetsResponseDTO {
  chef: UtilisateurResponseDTO;
  sujets: SujetResponseDTO[];
}

// SujetEquipeDTO défini plus haut
export interface SujetEquipeDTO {
  intituleSujet: string;
  nomEquipe: string;
}

// Extend your existing ProfesseurResponseDTO…
export interface DoctorantResponseDTO extends UtilisateurResponseDTO {
  dateInscription: string;
  statutDoctorant: string;
  nombreHeuresLabo: number;
  draftDiplomeUrl: string;
  archiver: boolean;
}

/**
 * Payload returned by GET /api/chefs-equipe/chefs-sujets
 */
export interface PublicSujetWithEquipeAndChef {
  intituleSujet: string;
  equipeIntitule: string;
  nomCompletChef: string;
  equipeId: number;
}

/**
 * Payload returned by paginated GET /api/sujets/chefs-sujets-equipes
 */
export interface ChefSujetsEquipeResponseDTO {
  intituleSujet: string;
  nomCompletChef: string;
  equipeIntitule: string;
}

export interface AccepterCandidatureRequest {
  dateEntretien: string; // ISO date, e.g. "2025-06-10"
}

export interface RefuserCandidatureRequest {
  motif: string;
}

// CandidatureResponseDTO to match backend structure
export interface CandidatureResponseDTO {
  id: number;
  createdAt: string;
  updatedAt: string;
  statutCandidature: string; // CandidatureEnum from backend
  mentionBac: string; // MentionEnum from backend
  diplome: string; // DiplomeEnum from backend
  mentionDiplome: string; // MentionEnum from backend
  dossierCandidature: string;
  typeEtablissement: string; // EtablissementEnum from backend
  specialite: string;
  intitulePFE: string;
  sujetsIds: number[]; // List<Long> from backend
  candidatId: number;
  candidatNom: string;
  candidatPrenom: string;
}
