import { getData } from '@/Helpers/CRUDFunctions';
import appConfig from '@/public/config';
import { AlertCircle, Edit, Eye, FileText, Search, Users } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';

// raw enum values from backend
type CandidatureEnum = 'SOUMISE' | 'EN_COURS_DE_TRAITEMENT' | 'ACCEPTER' | 'REFUSER';

interface Candidature {
  id: number;
  statutCandidature: CandidatureEnum;
  candidat: {
    prenom: string;
    nom: string;
    utilisateur: { email: string };
  };
  sujets: { intitule: string }[];
}

// map backend enum → user-friendly label
const formatStatus = (s: CandidatureEnum): string => {
  switch (s) {
    case 'SOUMISE':
      return 'Soumise';
    case 'EN_COURS_DE_TRAITEMENT':
      return 'En cours de traitement';
    case 'ACCEPTER':
      return 'Acceptée';
    case 'REFUSER':
      return 'Refusée';
    default:
      return s;
  }
};

// pick badge color based on backend enum
const getStatusColor = (s: CandidatureEnum): string => {
  switch (s) {
    case 'SOUMISE':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'EN_COURS_DE_TRAITEMENT':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'ACCEPTER':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'REFUSER':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

const CandidaturesPage: React.FC = () => {
  const [candidatures, setCandidatures] = useState<Candidature[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // fetch accessible candidatures on mount
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getData<Candidature[]>(
          appConfig.API_PATHS.CANDIDATURE.accessible.path
        );
        setCandidatures(data || []);
      } catch (err) {
        console.error('Error fetching candidatures:', err);
        setError('Erreur lors du chargement des candidatures');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // filter by candidate name, email or sujet titles
  const filteredCandidatures = useMemo(() => {
    const lower = searchTerm.toLowerCase();
    return candidatures.filter(c => {
      const name = `${c.candidat.prenom} ${c.candidat.nom}`.toLowerCase();
      const mail = c.candidat.utilisateur.email.toLowerCase();
      const sujets = c.sujets.map(s => s.intitule.toLowerCase()).join(' ');
      return (
        name.includes(lower) ||
        mail.includes(lower) ||
        sujets.includes(lower)
      );
    });
  }, [candidatures, searchTerm]);

  const handleView = (id: number) => {
    console.log('View candidature:', id);
    // e.g. navigate(`/dashboard/candidatures/${id}`);
  };

  const handleEdit = (id: number) => {
    console.log('Edit candidature:', id);
    // e.g. navigate(`/dashboard/candidatures/${id}/edit`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        <span className="ml-2 text-lg text-slate-600 dark:text-slate-300">
          Chargement des candidatures…
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 text-red-600">
        <AlertCircle className="h-12 w-12 mb-4" />
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Réessayer
        </button>
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

      {/* Search */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Rechercher par nom du candidat, email ou sujet..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-x-auto">
        {filteredCandidatures.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-slate-400 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
              {searchTerm ? 'Aucun résultat' : 'Aucune candidature'}
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              {searchTerm
                ? 'Aucune candidature ne correspond à votre recherche.'
                : 'Aucune candidature accessible pour le moment.'}
            </p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
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
              {filteredCandidatures.map((c, idx) => {
                const label = formatStatus(c.statutCandidature);
                const color = getStatusColor(c.statutCandidature);
                return (
                  <tr
                    key={c.id}
                    className={`hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${
                      idx % 2 === 0 ? 'bg-white dark:bg-slate-800' : 'bg-slate-50/50 dark:bg-slate-750'
                    }`}
                  >
                    {/* Candidat */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                          {c.candidat.prenom.charAt(0)}
                          {c.candidat.nom.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                            {c.candidat.prenom} {c.candidat.nom}
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            {c.candidat.utilisateur.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Statut */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${color}`}
                      >
                        {label}
                      </span>
                    </td>

                    {/* Sujets */}
                    <td className="px-6 py-4 max-w-xs">
                      {c.sujets.length > 0 ? (
                        <div className="space-y-1">
                          {c.sujets.slice(0, 2).map((s, i) => (
                            <div
                              key={i}
                              className="text-sm text-slate-600 dark:text-slate-300 truncate"
                              title={s.intitule}
                            >
                              • {s.intitule}
                            </div>
                          ))}
                          {c.sujets.length > 2 && (
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              +{c.sujets.length - 2} autre(s)
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-slate-500 dark:text-slate-400 italic">
                          Aucun sujet
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleView(c.id)}
                        className="mr-2 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded transition-colors"
                        title="Voir les détails"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(c.id)}
                        className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300 p-1 rounded transition-colors"
                        title="Modifier"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CandidaturesPage;
