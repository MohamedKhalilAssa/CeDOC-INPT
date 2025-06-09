import { getData } from '@/Helpers/CRUDFunctions';
import appConfig from '@/public/config';
import { UtilisateurResponseDTO } from '@/Types/UtilisateursTypes';
import React, { useEffect, useState } from 'react';




// Progress Bar Component
const ProgressBar: React.FC = () => {
  const [completedHours, setCompletedHours] = useState(0);
  const totalHours = 200;

  const fetchCompletedHours = async () => {
    const user = await getData<UtilisateurResponseDTO>(appConfig.API_PATHS.AUTH.currentUser.path);
    if (!user?.id) return;

    const url = `${appConfig.API_PATHS.SEANCEFORMATION.getTotalValidatedDuree.path}?doctorantUtilisateurId=${user.id}`;
    const total = await getData<number>(url);
    if (typeof total === 'number') {
      setCompletedHours(total);
    }
  };

  useEffect(() => {
    fetchCompletedHours();
  }, []);

  const progressPercentage = (completedHours / totalHours) * 100;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Nombre d'heures comptabilisées dans les formations</h2>
        <span className="text-sm text-gray-600">{completedHours}/{totalHours} heures</span>
      </div>
      <div className='flex items-center'>
        <div className="w-full bg-gray-200 rounded-full h-3 mr-4">
            <div 
            className="bg-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
            ></div>
        </div>
        <button
          className={`w-full md:w-auto px-4 py-2 rounded-md transition-all ${
            progressPercentage === 100
              ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          onClick={() => {
            if (progressPercentage === 100) {
              alert('Voir les détails de la progression');
            }
          }}
          disabled={progressPercentage !== 100}
        >
          Postuler
        </button>
      </div>
      
      <p className="text-sm text-gray-600">
        {Math.round(progressPercentage)}% complété
      </p>
    </div>
  );
};

export default ProgressBar;