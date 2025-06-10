import GenerateAttestation from '@/Sections/Dashboard/Attestations/GenerateAttestationAuto';
import RequestAttestation from '@/Sections/Dashboard/Attestations/RequestAttestationValidation';
import AttestationHistory from '@/Sections/Dashboard/Attestations/HistoryAttestationValidation';
import PageBreadcrumb from '@/Components/DashComps/common/PageBreadCrumb';
import { PageMeta } from '@/Components/DashComps';


const DoctorantAttestations: React.FC = () => {
    return (
        <>
            <PageMeta title="Attestations" description="Espace pour generer les attestations" />
            <PageBreadcrumb pageTitle="Attestations" />
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-8">
                        <GenerateAttestation />
                        <RequestAttestation />
                        <AttestationHistory />
                    </div>
                </div>
            </div>
        </>
    );
};

export default DoctorantAttestations;