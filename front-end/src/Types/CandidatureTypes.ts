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
