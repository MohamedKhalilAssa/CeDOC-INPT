import React, { useState } from 'react';
import ProgressBar from '@/Sections/Dashboard/MesFormationsDoctorant/ProgressBar';
import FormationDeclaration from '@/Sections/Dashboard/MesFormationsDoctorant/FormationDeclaration';
import FormationsTable from '@/Sections/Dashboard/MesFormationsDoctorant/FormationsTable';
import DeclaredSeancesTable from '@/Sections/Dashboard/MesFormationsDoctorant/DeclaredSeancesTable';
import PageBreadcrumb from '@/Components/DashComps/common/PageBreadCrumb';
import { PageMeta } from '@/Components/DashComps';

const DoctorantFormations: React.FC = () => {
  const [showDeclared, setShowDeclared] = useState(false);

  return (
    <>
      <PageMeta title="Mes Formations" description="Espace de suivi des formations" />
      <PageBreadcrumb pageTitle="Mes Formations" />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <ProgressBar />
          <FormationDeclaration />

          <div className="mb-4 flex ">
            <button
              onClick={() => setShowDeclared(!showDeclared)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {showDeclared ? 'Voir mes formations' : 'Voir mes déclarations'}
            </button>
          </div>

          {showDeclared ? <DeclaredSeancesTable /> : <FormationsTable />}
        </div>
      </div>
    </>
  );
};

export default DoctorantFormations;
