import React from 'react';

import ProgressBar from '@/Sections/Dashboard/MesFormationsDoctorant/ProgressBar';
import FormationDeclaration from './FormationDeclaration';
import FormationsTable from './FormationsTable';


const DoctorantFormations: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Doctorant Formations</h1>
          <p className="text-gray-600 mt-2">
            This page will display the list of formations available for doctorants.
          </p>
        </div>

        <ProgressBar />
        <FormationDeclaration />
        <FormationsTable />
      </div>
    </div>
  );
};

export default DoctorantFormations;