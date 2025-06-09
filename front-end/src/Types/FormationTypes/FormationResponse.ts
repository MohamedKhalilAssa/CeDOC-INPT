
import { baseResponse } from '../GlobalTypes';
import { ModuleEnum } from './FormationEnum';
//Formations types 

export interface FormationResponseDTO extends baseResponse{
  formationName: string;
  module: ModuleEnum;
  intitule: string;
  nomFormateur: string;
  dateDebut: string;
  duree: number;
  lieu: string;
  doctorantIds: number[];
  details?: string;
  image?: string;
}