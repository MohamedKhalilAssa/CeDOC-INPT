import { ModuleEnum } from "./FormationEnum";




export interface FormationRequestDTO {
  formationName: string;
  module: ModuleEnum | '';
  intitule: string;
  nomFormateur: string;
  dateDebut: string;
  duree: number | '';
  lieu: string;
  doctorantsCiblesEmails?: string[];
  details?: string;
  image?: string;
}