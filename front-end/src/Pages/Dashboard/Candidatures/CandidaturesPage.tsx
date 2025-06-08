import { getData } from '@/Helpers/CRUDFunctions';
import appConfig from '@/public/config';
import { AlertCircle, Edit, Eye, FileText, Search, Users } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';

// Types
interface Candidature {
  id: number;
  statutCandidature: string;
  candidat: {
    prenom: string;
    nom: string;
    utilisateur: {
      email: string;
    };
  };
  sujets: {
    intitule: string;
  }[];
}

// Status color mapping
const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'soumise':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'en cours':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'acceptée':
    case 'acceptee':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'refusée':
    case 'refusee':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

const CandidaturesPage: React.FC = () => {
  const [candidatures, setCandidatures] = useState<Candidature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch candidatures data
  useEffect(() => {
    const fetchCandidatures = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getData<Candidature[]>(
          appConfig.API_PATHS.CANDIDATURE.accessible.path
        );
        if(data) setCandidatures(data);
      } catch (err) {
        setError('Erreur lors du chargement des candidatures');
        console.error('Error fetching candidatures:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidatures();
  }, []);

  // Filter candidatures based on search term
  const filteredCandidatures = useMemo(() => {
    if (!searchTerm) return candidatures;
    
    return candidatures.filter((candidature) => {
      const candidatName = `${candidature.candidat.prenom} ${candidature.candidat.nom}`.toLowerCase();
      const email = candidature.candidat.utilisateur.email.toLowerCase();
      const sujets = candidature.sujets.map(s => s.intitule.toLowerCase()).join(' ');
      const searchLower = searchTerm.toLowerCase();
      
      return candidatName.includes(searchLower) || 
             email.includes(searchLower) || 
             sujets.includes(searchLower);
    });
  }, [candidatures, searchTerm]);

  // Handle view action
  const handleView = (candidatureId: number) => {
    // Navigate to view page or open modal
    console.log('View candidature:', candidatureId);
    // Example: navigate(`/dashboard/candidatures/${candidatureId}`);
  };

  // Handle edit action
  const handleEdit = (candidatureId: number) => {
    // Navigate to edit page or open modal
    console.log('Edit candidature:', candidatureId);
    // Example: navigate(`/dashboard/candidatures/${candidatureId}/edit`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-lg text-slate-600 dark:text-slate-300">
            Chargement des candidatures...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
            Erreur de chargement
          </h3>
          <p className="text-slate-600 dark:text-slate-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Candidatures
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Gérer les candidatures de doctorat
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
          <Users className="h-4 w-4" />
          <span>{filteredCandidatures.length} candidature(s)</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Rechercher par nom du candidat ou titre du sujet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        {filteredCandidatures.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-slate-400 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
              {searchTerm ? 'Aucun résultat' : 'Aucune candidature'}
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              {searchTerm 
                ? 'Aucune candidature ne correspond à votre recherche.'
                : 'Aucune candidature accessible pour le moment.'
              }
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                    Candidat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                    Sujets
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                {filteredCandidatures.map((candidature, index) => (
                  <tr
                    key={candidature.id}
                    className={`hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${
                      index % 2 === 0 ? 'bg-white dark:bg-slate-800' : 'bg-slate-50/50 dark:bg-slate-750'
                    }`}
                  >
                    {/* Candidat */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                          {candidature.candidat.prenom.charAt(0)}{candidature.candidat.nom.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                            {candidature.candidat.prenom} {candidature.candidat.nom}
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            {candidature.candidat.utilisateur.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Statut */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(candidature.statutCandidature)}`}>
                        {candidature.statutCandidature}
                      </span>
                    </td>

                    {/* Sujets */}
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        {candidature.sujets.length > 0 ? (
                          <div className="space-y-1">
                            {candidature.sujets.slice(0, 2).map((sujet, idx) => (
                              <div
                                key={idx}
                                className="text-sm text-slate-600 dark:text-slate-300 truncate"
                                title={sujet.intitule}
                              >
                                • {sujet.intitule}
                              </div>
                            ))}
                            {candidature.sujets.length > 2 && (
                              <div className="text-xs text-slate-500 dark:text-slate-400">
                                +{candidature.sujets.length - 2} autre(s)
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-sm text-slate-500 dark:text-slate-400 italic">
                            Aucun sujet
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleView(candidature.id)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded transition-colors"
                          title="Voir les détails"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(candidature.id)}
                          className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300 p-1 rounded transition-colors"
                          title="Modifier"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidaturesPage;