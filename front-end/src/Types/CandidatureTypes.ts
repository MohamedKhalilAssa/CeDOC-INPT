import { UtilisateurResponseDTO } from "@/Types/UtilisateursTypes";

export interface ProfesseurResponseDTO extends UtilisateurResponseDTO {
  grade: string;
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
