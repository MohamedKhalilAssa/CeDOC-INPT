import React, { useEffect, useState } from 'react';
import { Search, Upload } from 'lucide-react';
import { FormationResponseDTO } from "@/Types/FormationTypes/FormationResponse";
import { SeanceFormationRequestDTO} from "@/Types/FormationTypes/SeanceFormationRequest";
import { StatutFormationEnum } from "@/Types/FormationTypes/StatutFormationEnum";
import { getData } from "@/Helpers/CRUDFunctions";
import appConfig from "@/public/config";
import { ModuleEnum } from '@/Types/FormationTypes/FormationEnum';




// Types
interface Formation {
  id: number;
  name: string;
  module: string;
}


interface SeanceFormationRequest {
  duree: number;
  justificatifPdf: string;
  statut: string;
  formationId: number;
  formationName: string;
  module: string;
}


const modules = Object.values(ModuleEnum);









export const displayModuleLabel = (key: keyof typeof ModuleEnum): string => {
  return ModuleEnum[key];
};




const FormationDeclaration: React.FC = () => {

const fetchFormations = async (): Promise<FormationResponseDTO[]> => {
  return (await getData<FormationResponseDTO[]>(appConfig.API_PATHS.FORMATION.getAll.path)) || [];
};

const [formations, setFormations] = useState<FormationResponseDTO[]>([]);

useEffect(() => {
  const loadFormations = async () => {
    const data = await fetchFormations();
    setFormations(data);
  };

  loadFormations();
}, []);



const [formData, setFormData] = useState<SeanceFormationRequestDTO>({
  duree: 0,
  justificatifPdf: '',
  statut: StatutFormationEnum.DECLARER,
  formationName: '',
  module: ''
});
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormationDropdownOpen, setIsFormationDropdownOpen] = useState(false);
  const [isModuleDropdownOpen, setIsModuleDropdownOpen] = useState(false);

  const filteredFormations = formations.filter(formation =>
    formation.formationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    formation.module.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const handleSubmit = () => {
  //   console.log('Formation declared:', formData);
  //   setFormData({
  //     duree: 0,
  //     justificatifPdf: '',
  //     statut: 'Pending',
  //     formationId: 0,
  //     formationName: '',
  //     module: ''
  //   });
  // };
  const handleSubmit = () => {
    console.log('Formation declared:', formData);
    setFormData({
      duree: 0,
      justificatifPdf: '',
      statut: StatutFormationEnum.DECLARER,
      formationName: '',
      module: ''
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Nouvelle Déclaration</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Module de la formation
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsModuleDropdownOpen(!isModuleDropdownOpen)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left bg-white"
              >
                {formData.module || "Choisir une catégorie"}
              </button>
              {isModuleDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  {modules.map((module) => (
                    <button
                      key={module}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, module });
                        setIsModuleDropdownOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                    >
                      {module}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Intitulé de la formation
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsFormationDropdownOpen(!isFormationDropdownOpen)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left bg-white"
              >
                {formData.formationName || "Sélectionner une formation"}
              </button>
              {isFormationDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  <div className="p-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Rechercher..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="max-h-48 overflow-auto">
                    {filteredFormations.map((formation) => (
                      <button
                        key={formation.id}
                        type="button"
                        onClick={() => {
                          setFormData({ 
                            ...formData, 
                            formationName: formation.formationName,
                            module: displayModuleLabel(formation.module as unknown as keyof typeof ModuleEnum)
                          });
                          console.log('Selected formation:', formation.module);
                          setIsFormationDropdownOpen(false);
                          setSearchTerm('');
                        }}
                        className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                      >
                        <div className="font-medium">{formation.formationName}</div>
                        <div className="text-sm text-gray-500">{formation.module}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom complet du Formateur
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nom du formateur"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lieu de la formation
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Lieu de formation"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date de début de la Formation
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date de fin de la Formation
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre d'heures comptabilisées
            </label>
            <input
              type="number"
              value={formData.duree}
              onChange={(e) => setFormData({ ...formData, duree: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
              min="0"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Justificatif de présence
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFormData({ ...formData, justificatifPdf: file.name });
                }
              }}
              className="hidden"
              id="pdf-upload"
            />
            <label
              htmlFor="pdf-upload"
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose File
            </label>
            {formData.justificatifPdf && (
              <span className="text-sm text-gray-600">{formData.justificatifPdf}</span>
            )}
            <span className="text-xs text-gray-500">PDF only (max 5MB)</span>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Déclarer
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormationDeclaration;