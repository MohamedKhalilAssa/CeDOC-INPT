import React, { useEffect, useState } from 'react';
import { Clock, AlertCircle, CheckCircle, XCircle, Search } from 'lucide-react';
import { SeanceFormationResponseDTO } from '@/Types/FormationTypes/SeanceFormationResponse';
import { getData } from '@/Helpers/CRUDFunctions';
import { UtilisateurResponseDTO } from '@/Types/UtilisateursTypes';
import appConfig from '@/public/config';

const DeclaredSeancesTable: React.FC = () => {
  const [seances, setSeances] = useState<SeanceFormationResponseDTO[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSeances = async () => {
      const user = await getData<UtilisateurResponseDTO>(appConfig.API_PATHS.AUTH.currentUser.path);
      if (!user?.id) return;

      const url = `${appConfig.API_PATHS.SEANCEFORMATION.getDeclaredSeances.path}/${user.id}`;
      const data = await getData<SeanceFormationResponseDTO[]>(url);
      if (data) setSeances(data);
    };

    fetchSeances();
  }, []);

  const filtered = seances.filter(s =>
    s.formationName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'VALIDER': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'REFUSER': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Mes Déclarations</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Formation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Durée</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Statut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Validation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Déclarée le</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.map(seance => (
              <tr key={seance.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{seance.formationName}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-gray-400" />
                    {seance.duree}h
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 flex items-center space-x-2">
                  {getStatusIcon(seance.statut)}
                  <span>{seance.statut}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{seance.validePar}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {seance.createdAt
                    ? new Date(seance.createdAt).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                    : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeclaredSeancesTable;
