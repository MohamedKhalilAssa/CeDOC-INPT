import React from 'react';

import ProgressBar from '@/Sections/Dashboard/MesFormationsDoctorant/ProgressBar';
import FormationDeclaration from '../../../Sections/Dashboard/MesFormationsDoctorant/FormationDeclaration';
import FormationsTable from '../../../Sections/Dashboard/MesFormationsDoctorant/FormationsTable';
import { PageMeta } from '@/Components/DashComps';
import PageBreadcrumb from '@/Components/DashComps/common/PageBreadCrumb';


const DoctorantFormations: React.FC = () => {
  return (<>
    <PageMeta
        title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
    />
    <PageBreadcrumb pageTitle="Mes Formations" />
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        <ProgressBar />
        <FormationDeclaration />
        <FormationsTable />
      </div>
    </div>
    </>
  );
};

export default DoctorantFormations;