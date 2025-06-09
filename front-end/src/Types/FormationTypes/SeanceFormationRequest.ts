import { StatutFormationEnum } from "./StatutFormationEnum";

export interface SeanceFormationRequestDTO {
  duree: number;
  justificatifPdf: string;
  statut: StatutFormationEnum;
  formationId: number;
  declarantId: number;
}