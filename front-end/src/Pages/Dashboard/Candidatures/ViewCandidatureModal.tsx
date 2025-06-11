import Badge from "@/Components/DashComps/ui/badge/Badge";
import { downloadFile } from "@/Helpers/CRUDFunctions";
import { CandidatureResponseDTO } from "@/Types/CandidatureTypes";
import {
  CheckCircle,
  Clock,
  Download,
  GraduationCap,
  XCircle,
} from "lucide-react";
import React, { useState } from "react";

interface ViewCandidatureModalProps {
  candidature: CandidatureResponseDTO | null;
  isOpen: boolean;
  onClose: () => void;
}

const ViewCandidatureModal: React.FC<ViewCandidatureModalProps> = ({
  candidature,
  isOpen,
  onClose,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  // Function to download the zip file
  const handleDownloadZip = async () => {
    if (!candidature?.dossierCandidature) {
      alert("Aucun dossier de candidature disponible pour le téléchargement.");
      return;
    }
    setIsDownloading(true);
    try {
      // Extract the actual filename from the dossierCandidature path
      // Path format: Uploads/candidatures/1/0d20b7b5-db96-44b1-acea-05f35858fcce.zip
      const pathParts = candidature.dossierCandidature.split("/");
      const actualFilename = pathParts[pathParts.length - 1]; // Get the last part (filename.zip)

      console.log(
        "Download URL:",
        `/api/candidatures/${candidature.id}/dossier/download`
      );
      console.log("Filename:", actualFilename);
      console.log("Full dossier path:", candidature.dossierCandidature);

      // Use the backend API endpoint we created
      await downloadFile(
        `/api/candidatures/${candidature.id}/dossier/download`,
        actualFilename,
        {
          headers: {
            Accept: "application/zip, application/octet-stream",
          },
        }
      );
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error);
      alert("Erreur lors du téléchargement du dossier. Veuillez réessayer.");
    } finally {
      setIsDownloading(false);
    }
  };

  // Status badge component for candidature status
  const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const getStatusConfig = (status: string) => {
      switch (status) {
        case "SOUMISE":
          return {
            color: "primary" as const,
            icon: Clock,
            label: "Soumise",
          };
        case "EN_COURS_DE_TRAITEMENT":
          return {
            color: "warning" as const,
            icon: Clock,
            label: "En Cours",
          };
        case "ACCEPTER":
          return {
            color: "success" as const,
            icon: CheckCircle,
            label: "Acceptée",
          };
        case "REFUSER":
          return { color: "light" as const, icon: XCircle, label: "Refusée" };
        default:
          return { color: "light" as const, icon: Clock, label: status };
      }
    };

    const { color, icon: Icon, label } = getStatusConfig(status);

    return (
      <Badge variant="solid" color={color} size="sm">
        <Icon className="w-3 h-3" />
        {label}
      </Badge>
    );
  };

  // Mention badge component
  const MentionBadge: React.FC<{ mention: string }> = ({ mention }) => {
    const getMentionConfig = (mention: string) => {
      switch (mention) {
        case "E":
          return { color: "success" as const, label: "Excellent" };
        case "TB":
          return { color: "success" as const, label: "Très Bien" };
        case "B":
          return { color: "primary" as const, label: "Bien" };
        case "AB":
          return { color: "warning" as const, label: "Assez Bien" };
        case "P":
          return { color: "light" as const, label: "Passable" };
        default:
          return { color: "light" as const, label: mention };
      }
    };

    const { color, label } = getMentionConfig(mention);

    return (
      <Badge variant="solid" color={color} size="sm">
        <GraduationCap className="w-3 h-3" />
        {label}
      </Badge>
    );
  };

  if (!candidature || !isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Détails de la Candidature</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Candidat
              </label>
              <p className="text-sm text-gray-900">
                {candidature.candidatPrenom} {candidature.candidatNom}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Statut
              </label>
              <StatusBadge status={candidature.statutCandidature} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Spécialité
              </label>
              <p className="text-sm text-gray-900">{candidature.specialite}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Diplôme
              </label>
              <p className="text-sm text-gray-900">{candidature.diplome}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mention Diplôme
              </label>
              {candidature.mentionDiplome && (
                <MentionBadge mention={candidature.mentionDiplome} />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mention Bac
              </label>
              {candidature.mentionBac && (
                <MentionBadge mention={candidature.mentionBac} />
              )}
            </div>
          </div>

          {candidature.intitulePFE && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Intitulé PFE
              </label>
              <p className="text-sm text-gray-900">{candidature.intitulePFE}</p>
            </div>
          )}

          {candidature.typeEtablissement && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type d'Établissement
              </label>
              <p className="text-sm text-gray-900">
                {candidature.typeEtablissement}
              </p>
            </div>
          )}

          {candidature.sujetsIds && candidature.sujetsIds.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sujets Postulés (IDs)
              </label>
              <div className="space-y-2">
                {candidature.sujetsIds.map((sujetId: number, index: number) => (
                  <div key={index} className="bg-gray-50 p-3 rounded">
                    <div className="font-medium text-sm">
                      Sujet ID: {sujetId}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date de Candidature
              </label>
              <p className="text-sm text-gray-900">
                {new Date(candidature.createdAt).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dernière Mise à Jour
              </label>
              <p className="text-sm text-gray-900">
                {new Date(candidature.updatedAt).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Download Section */}
          {candidature.dossierCandidature && (
            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dossier de Candidature
              </label>
              <button
                onClick={handleDownloadZip}
                disabled={isDownloading}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white transition-colors ${
                  isDownloading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                }`}
              >
                <Download className="w-4 h-4 mr-2" />
                {isDownloading
                  ? "Téléchargement..."
                  : "Télécharger le Dossier (ZIP)"}
              </button>
              <p className="text-xs text-gray-500 mt-1">
                Télécharge tous les documents de la candidature dans un fichier
                ZIP
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCandidatureModal;
