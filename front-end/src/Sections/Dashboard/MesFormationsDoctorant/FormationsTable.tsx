import React, { useEffect, useState } from 'react';
import { Search,  Clock} from 'lucide-react';
import { FormationResponseDTO } from '@/Types/FormationTypes/FormationResponse';
import { UtilisateurResponseDTO } from '@/Types/UtilisateursTypes';
import appConfig from '@/public/config';
import { getData } from '@/Helpers/CRUDFunctions';

// Types


// interface SeanceFormation {
//   id: number;
//   formationName: string;
//   formateur: string;
//   status: 'Approved' | 'Rejected' | 'Pending';
//   duree: number;
//   date: string;
// }


// Mock data

// const mockSeanceFormations: SeanceFormation[] = [
//   { id: 1, formationName: "Machine Learning Fundamentals", formateur: "Dr. Smith", status: "Approved", duree: 8, date: "2024-03-15" },
//   { id: 2, formationName: "React Advanced Patterns", formateur: "Prof. Johnson", status: "Rejected", duree: 12, date: "2024-03-10" },
//   { id: 3, formationName: "Network Security", formateur: "Dr. Wilson", status: "Approved", duree: 18, date: "2024-02-28" },
//   { id: 4, formationName: "Data Analytics", formateur: "Prof. Brown", status: "Approved", duree: 14, date: "2024-02-15" },
// ];




const FormationsTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [formations, setFormations] = useState<FormationResponseDTO[]>([]);

  const fetchDureeByFormationAndDoctorant = async (formationId: number, userId: number): Promise<number> => {
    try {
      const url = `${appConfig.API_PATHS.SEANCEFORMATION.getValidatedFormationDuree.path}?formationId=${formationId}&doctorantUtilisateurId=${userId}`;
      const res = await getData<number>(url);
      return res || 0;
    } catch (error) {
      console.error("Error fetching duree for formation", formationId, error);
      return 0;
    }
  };


  const fetchValidatedFormations = async () => {
    try {
      const user = await getData<UtilisateurResponseDTO>(appConfig.API_PATHS.AUTH.currentUser.path);
      if (!user?.id) return;

    const url = `${appConfig.API_PATHS.SEANCEFORMATION.getValidatedFormationsByDoctorant.path}/${user.id}`;
    const formationList = await getData<FormationResponseDTO[]>(url);

    if (!formationList) {
      setFormations([]);
      return;
    }
    
    const formationWithDuree = await Promise.all(
      formationList.map(async (formation) => {
        const duree = await fetchDureeByFormationAndDoctorant(formation.id, user.id);
        return { ...formation, duree };
      })
    );

    setFormations(formationWithDuree);

    } catch (error) {
      console.error("Erreur lors du chargement des formations validées :", error);
    }
  };

  useEffect(() => {
    fetchValidatedFormations();
  }, []);

  const filteredFormations = formations.filter(formation =>
    formation.formationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    formation.nomFormateur.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const getStatusIcon = (status: string) => {
  //   switch (status) {
  //     case 'Approved':
  //       return <CheckCircle className="w-5 h-5 text-green-500" />;
  //     case 'Rejected':
  //       return <XCircle className="w-5 h-5 text-red-500" />;
  //     default:
  //       return <AlertCircle className="w-5 h-5 text-yellow-500" />;
  //   }
  // };

  // const getStatusBadge = (status: string) => {
  //   const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
  //   switch (status) {
  //     case 'Approved':
  //       return `${baseClasses} bg-green-100 text-green-800`;
  //     case 'Rejected':
  //       return `${baseClasses} bg-red-100 text-red-800`;
  //     default:
  //       return `${baseClasses} bg-yellow-100 text-yellow-800`;
  //   }
  // };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Mes Formations Validées</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Formation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Formateur
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                heures passées
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredFormations.map((formation) => (
              <tr key={formation.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {formation.formationName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{formation.nomFormateur}</div>
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(formation.status)}
                    <span className={getStatusBadge(formation.status)}>
                      {formation.status}
                    </span>
                  </div>
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <Clock className="w-4 h-4 mr-1 text-gray-400" />
                    {formation.duree} heures
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default FormationsTable;