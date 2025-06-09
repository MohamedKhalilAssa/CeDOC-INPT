import { StatutFormationEnum } from './StatutFormationEnum';
import { baseResponse } from '../GlobalTypes';

export interface SeanceFormationResponseDTO extends baseResponse {
  duree: number;
  justificatifPdf: string;
  statut: StatutFormationEnum;
  formation: string;         // This is the formation name or title
  declarantId: number;
  validePar: string; 
  email: string;        // This is likely the full name or email of the validator
}
