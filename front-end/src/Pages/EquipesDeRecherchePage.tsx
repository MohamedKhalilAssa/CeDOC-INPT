import { getData } from '@/Helpers/CRUDFunctions';
import appConfig from '@/public/config';
import { SujetEquipeDTO } from '@/Types/CandidatureTypes.ts';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const ResearchTeamsTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [subjects, setSubjects] = useState<SujetEquipeDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    setLoading(true);
    getData<SujetEquipeDTO[]>(appConfig.API_PATHS.sujetsEquipes.path)
      .then(data => {
        if (data) {
          setSubjects(data);
        } else {
          setSubjects([]);
        }
      })
      .catch(err => {
        console.error(err);
        setError('Impossible de charger les données.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  

  const filteredSubjects = subjects.filter(s =>
    s.intituleSujet.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.nomEquipe.toLowerCase().includes(searchTerm.toLowerCase())
  );  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span>Chargement…</span>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">INPT</span>
                </div>
                <span className="text-xl font-semibold text-gray-900">CEDoc</span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <nav className="flex space-x-6">
                <a href="#" className="text-gray-600 hover:text-gray-900">Accueil</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Recherche</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Admission</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Pages</a>
              </nav>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">LO</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ÉQUIPES ET SUJETS DE RECHERCHE
          </h1>
          <p className="text-gray-600 mb-6">
            RECHERCHE ACTIVITIES SUPPORTED BY INPT CEDOC INCLUDING BASIC RESEARCH, APPLIED RESEARCH, NETWORKS AND APPLIED TECHNOLOGY LABORATORIES. THEY ARE BASED ON THE ACTIVITIES OF THE UNIVERSITY'S RESEARCH TEAMS.
          </p>
          
          {/* Search and Actions */}
          <div className="flex items-center justify-between mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher dans le tableau..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-600">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider w-1/3">
                  Sujets
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider w-2/3">
                  Équipes de recherche
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubjects.map((subject, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-6 whitespace-nowrap align-top">
                    <div className="text-sm font-medium text-blue-600 leading-relaxed">
                      {subject.intituleSujet}
                    </div>
                  </td>
                  <td className="px-6 py-6 align-top">
                    <div className="text-sm text-gray-700 leading-relaxed">
                      {subject.nomEquipe}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Info */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <div>
            Affichage de {filteredSubjects.length} sujet{filteredSubjects.length > 1 ? 's' : ''} de recherche
          </div>
          <div>
            Total: {subjects.length} équipes de recherche
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">{subjects.length}</div>
            <div className="text-sm text-gray-600">Sujets de recherche</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">{subjects.length}</div>
            <div className="text-sm text-gray-600">Équipes de recherche</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">40+</div>
            <div className="text-sm text-gray-600">Chercheurs actifs</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">150+</div>
            <div className="text-sm text-gray-600">Publications</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchTeamsTable;