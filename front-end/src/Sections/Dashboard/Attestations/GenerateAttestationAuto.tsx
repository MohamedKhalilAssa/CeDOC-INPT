import { postData } from '@/Helpers/CRUDFunctions';
import appConfig from '@/public/config';
import React, { useState } from 'react';

interface requestType {
    typeAttestationAutomatique: string;
}

// Generate Attestation Component
const GenerateAttestation: React.FC = () => {
  const [selectedAttestation, setSelectedAttestation] = useState<string>('');

  const handleGenerate = async () => {

    const request: requestType = {
        typeAttestationAutomatique : selectedAttestation
    };

    try{
        const response = await postData(appConfig.API_PATHS.ATTESTATION.generer.path, request);
        if(response){
              alert(`Generating attestation: ${selectedAttestation}`);
        }
    } catch (err){
        console.error(err)
    }

    if (!selectedAttestation) {
        alert('Please choose an attestation type');
    }

  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Generate an Attestation</h2>
      <div className="space-y-4">
        <select
          value={selectedAttestation}
          onChange={(e) => setSelectedAttestation(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        >
          <option value="">Choose an attestation</option>
          <option value="INSCRIPTION">Attestation d'inscription</option>
          <option value="TRAVAIL">Attestation de travail au laboratoire</option>
        </select>
        <div className="flex justify-end">
          <button
            onClick={handleGenerate}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateAttestation;