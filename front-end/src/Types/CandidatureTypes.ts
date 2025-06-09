import { UtilisateurResponseDTO } from "@/Types/UtilisateursTypes";

export interface ProfesseurResponseDTO extends UtilisateurResponseDTO {
  grade: string;
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
export interface PublicSujetWithParticipants {
  sujet: {
    id: number;
    intitule: string;
    description: string;
    estPublic: boolean;
    valide: boolean;
    createdAt: string;
    updatedAt: string;
  };
  chef: UtilisateurResponseDTO | null;
  professeurs: ProfesseurResponseDTO[];
  doctorants: DoctorantResponseDTO[];
}

export interface AccepterCandidatureRequest {
  dateEntretien: string;  // ISO date, e.g. "2025-06-10"
}

export interface RefuserCandidatureRequest {
  motif: string;
}
