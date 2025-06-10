import React, { useState } from 'react';

const RequestAttestation: React.FC = () => {
  const [selectedAttestation, setSelectedAttestation] = useState<string>('');

  const handleRequest = () => {
    if (selectedAttestation) {
      alert(`Requesting attestation: ${selectedAttestation}`);
    } else {
      alert('Please choose an attestation type');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Request an Attestation</h2>
      <div className="space-y-4">
        <select
          value={selectedAttestation}
          onChange={(e) => setSelectedAttestation(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        >
          <option value="">Choose an attestation</option>
          <option value="SOUTENANCE">Attestation de soutenance</option>
          <option value="AUTORISATION_DE_LA_SOUTENANCE">Attestation d'autorisation à la soutenance</option>
        </select>
        <div className="flex justify-end">
          <button
            onClick={handleRequest}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestAttestation;