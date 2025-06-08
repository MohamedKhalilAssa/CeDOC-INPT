import { StatutFormationEnum } from "./StatutFormationEnum";

export interface SeanceFormationRequestDTO {
  duree: number;
  justificatifPdf: string;
  statut: StatutFormationEnum;
  formationName: string;
  module: string;
}
