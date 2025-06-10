import React, { useEffect, useState } from 'react';
import { Check, X, Loader2, AlertCircle, Download, FileText } from 'lucide-react';
import { SeanceFormationResponseDTO } from '@/Types/FormationTypes/SeanceFormationResponse';
import { UtilisateurResponseDTO } from '@/Types/UtilisateursTypes';
import appConfig from '@/public/config';
import { getData, putData } from '@/Helpers/CRUDFunctions';
import PageBreadcrumb from '@/Components/DashComps/common/PageBreadCrumb';
import { PageMeta } from '@/Components/DashComps';
import { StatutFormationEnum } from '@/Types/FormationTypes/StatutFormationEnum';

// JustificatifCell subcomponent
interface JustificatifCellProps {
  justificatifPdf: string | null;
}

const JustificatifCell: React.FC<JustificatifCellProps> = ({ justificatifPdf }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    if (!justificatifPdf) return;
    
      setIsDownloading(true);
        const fullUrl = "http://localhost:8080"+justificatifPdf;
        const link = document.createElement("a");
        link.href = fullUrl;
        link.download = justificatifPdf.split("/").pop() || "justificatif.pdf";
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    
      setIsDownloading(false);
    
  };

  if (!justificatifPdf) {
    return <span className="text-gray-400 text-sm italic">Aucun justificatif</span>;
  }

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {isDownloading ? (
        <Loader2 className="w-4 h-4 mr-1 animate-spin" />
      ) : (
        <FileText className="w-4 h-4 mr-1" />
      )}
      <span className="truncate max-w-32">{justificatifPdf}</span>
      {!isDownloading && <Download className="w-3 h-3 ml-1 opacity-60" />}
    </button>
  );
};

// ActionButtons subcomponent
interface ActionButtonsProps {
  seanceId: number;
  onAccept: (id: number) => void;
  onRefuse: (id: number) => void;
  isProcessing: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  seanceId,
  onAccept,
  onRefuse,
  isProcessing
}) => (
  <div className="flex gap-2 justify-center">
    <button
      onClick={() => onAccept(seanceId)}
      disabled={isProcessing}
      className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
      <span className="ml-1 hidden sm:inline"></span>
    </button>
    <button
      onClick={() => onRefuse(seanceId)}
      disabled={isProcessing}
      className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
      <span className="ml-1 hidden sm:inline"></span>
    </button>
  </div>
);

// SeanceTableRow subcomponent
interface SeanceTableRowProps {
  seance: SeanceFormationResponseDTO;
  onAccept: (id: number) => void;
  onRefuse: (id: number) => void;
  processingId: number | null;
}

const SeanceTableRow: React.FC<SeanceTableRowProps> = ({
  seance,
  onAccept,
  onRefuse,
  processingId
}) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{seance.email}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{seance.formationName}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(typeof seance.createdAt === 'string' ? seance.createdAt : seance.createdAt?.toISOString())}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{seance.duree} h</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <JustificatifCell justificatifPdf={seance.justificatifPdf ?? null} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
        <ActionButtons
          seanceId={seance.id}
          onAccept={onAccept}
          onRefuse={onRefuse}
          isProcessing={processingId === seance.id}
        />
      </td>
    </tr>
  );
};

// Main ValiderSeance component
// const MOCK_SEANCES: SeanceFormationResponseDTO[] = [
//   {
//     id: 1,
//     duree: 12,
//     justificatifPdf: 'justificatif_ia_2024.pdf',
//     statut: StatutFormationEnum.DECLARER,
//     formation: 'Intelligence Artificielle',
//     declarantId: 101,
//     validePar: '',
//     email: 'doctorant1@inpt.ac.ma',
//     createdAt: new Date(),
//     updatedAt: new Date()
//   },
//   {
//     id: 2,
//     duree: 8,
//     justificatifPdf: 'justificatif_cyber_2024.pdf',
//     statut: StatutFormationEnum.DECLARER,
//     formation: 'Cybersécurité',
//     declarantId: 102,
//     validePar: '',
//     email: 'doctorant2@inpt.ac.ma',
//     createdAt: new Date(Date.now() - 86400000),
//     updatedAt: new Date(Date.now() - 86400000)
//   }
// ];

const ValiderSeance: React.FC = () => {
  const [seances, setSeances] = useState<SeanceFormationResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchSeances = async () => {
      try {
        setLoading(true);
        setError(null);
        // Get current user (for validation actions)
        const user = await getData<UtilisateurResponseDTO>(appConfig.API_PATHS.AUTH.currentUser.path);
        setCurrentUserId(user?.id ?? null);
        // Fetch all seances (for all doctorants)
        const allSeances = await getData<SeanceFormationResponseDTO[]>(appConfig.API_PATHS.SEANCEFORMATION.getAll.path);
        // Filter only those with statut DECLARER (pending)
        const pending = (allSeances || []).filter(s => s.statut === StatutFormationEnum.DECLARER);
        setSeances(pending);
      } catch (err) {
        setError("Erreur lors du chargement des séances à valider");
        setSeances([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSeances();
  }, []);

  const handleValidation = async (seanceId: number, action: 'accept' | 'refuse') => {
    if (!currentUserId) {
      setError('Utilisateur non identifié');
      return;
    }
    try {
        setProcessingId(seanceId);
        setError(null);

        // Get the original seance
        const seance = seances.find(s => s.id === seanceId);
        if (!seance) throw new Error("Séance non trouvée");

        const requestDTO = {
            duree: seance.duree,
            justificatifPdf: seance.justificatifPdf,
            statut: action === 'accept' ? 'VALIDER' : 'REFUSER',
            formationId: seance.formationId!, // Ensure this field exists or inject it during fetching
            declarantId: seance.declarantId,
            valideParId: currentUserId,
        };

        await putData(
            `${appConfig.API_PATHS.SEANCEFORMATION.putSeanceFormation.path}/${seanceId}`,
            requestDTO
        );
        setSeances(prev => prev.filter(seance => seance.id !== seanceId));
    } catch (err) {
      setError(`Erreur lors de la ${action === 'accept' ? 'validation' : 'refus'} de la séance`);
    } finally {
      setProcessingId(null);
    }
  };

  const handleAccept = (seanceId: number) => handleValidation(seanceId, 'accept');
  const handleRefuse = (seanceId: number) => handleValidation(seanceId, 'refuse');

  // UI
  return (
    <>
      <PageMeta title="Valider les séances" description="Validation des séances de formation déclarées" />
      <PageBreadcrumb pageTitle="Valider les séances" />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white shadow-sm rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Séances en attente de validation {loading ? '' : `(${seances.length})`}
              </h3>
            </div>
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                <span className="ml-2 text-gray-600">Chargement des séances...</span>
              </div>
            ) : seances.length === 0 ? (
              <div className="text-center p-8">
                <div className="text-gray-500">
                  <Check className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">Aucune séance de formation à valider</p>
                  <p className="text-sm">Aucune déclaration de séance formation n'est disponible pour le moment.</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center p-8">
                <div className="flex items-center text-red-600">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  {error}
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctorant</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Formation</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date de déclaration</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durée</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Justificatif</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {seances.map((seance) => (
                      <SeanceTableRow
                        key={seance.id}
                        seance={seance}
                        onAccept={handleAccept}
                        onRefuse={handleRefuse}
                        processingId={processingId}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ValiderSeance;