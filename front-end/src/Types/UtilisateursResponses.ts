// Main Utilisateur interface
import { EtatCivilEnum, GenreEnum } from "@/Types/UtilisateursEnums";
// Supporting interfaces
export interface Role {
  id: number;
  intitule: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface Nationalite {
  id: number;
  intitule: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface LieuDeNaissance {
  id: number;
  nom: string;
}
export interface UtilisateurResponseDTO {
  id: number;
  nom?: string;
  prenom?: string;
  email: string;
  telephone?: string;
  dateNaissance?: Date;
  etatCivilEnum?: EtatCivilEnum;
  genre?: GenreEnum;
  emailValider: boolean;
  createdAt: Date;
  updatedAt: Date;
  roles: Role[];
  nationalite?: Nationalite;
  lieuDeNaissance?: LieuDeNaissance;
}
