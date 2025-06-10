import React, { useState } from 'react';

// Types
interface Attestation {
  id: string;
  type: string;
  date: string;
  status: 'EN_ATTENTE' | 'VALIDEE' | 'REJETEE';
}

const AttestationHistory: React.FC = () => {
  const [attestations] = useState<Attestation[]>([
    {
      id: '1',
      type: 'Attestation de soutenance',
      date: 'April 2, 2025',
      status: 'EN_ATTENTE'
    },
    {
      id: '2',
      type: "Attestation d'autorisation à la soutenance",
      date: 'March 18, 2025',
      status: 'VALIDEE'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'EN_ATTENTE':
        return 'bg-yellow-100 text-yellow-800';
      case 'VALIDEE':
        return 'bg-green-100 text-green-800';
      case 'REJETEE':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">History of Requested Attestations</h2>
      </div>
      <div className="overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attestations.map((attestation) => (
              <tr key={attestation.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {attestation.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {attestation.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(attestation.status)}`}>
                    {attestation.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttestationHistory;