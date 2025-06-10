import Badge from "@/Components/DashComps/ui/badge/Badge";
import type { Column } from "@/Components/Table/ServerSideTable";
import ServerSideTable from "@/Components/Table/ServerSideTable";
import { getData } from "@/Helpers/CRUDFunctions";
import { useServerSideTable } from "@/Hooks/useServerSideTable";
import appConfig from "@/public/config";
import { CandidatureResponseDTO } from "@/Types/CandidatureTypes";
import { PaginatedResponse, TableConfig } from "@/Types/GlobalTypes";
import { CheckCircle, Clock, User, XCircle } from "lucide-react";
import React, { useCallback, useState } from "react";
import EditMaCandidatureModal from "./EditMaCandidatureModal";
import ViewCandidatureModal from "./ViewCandidatureModal";

interface CandidatureTableData extends CandidatureResponseDTO {
  // Extending the base type with additional fields if needed
}

const LesCandidature: React.FC = () => {
  // Fetcher function for the table hook
  const fetchCandidatures = useCallback(
    async (
      config: TableConfig
    ): Promise<PaginatedResponse<CandidatureTableData>> => {
      // Build query parameters
      const params = new URLSearchParams();
      params.append("page", (config.page - 1).toString()); // Backend uses 0-based indexing
      params.append("size", config.pageSize.toString());

      if (config.search.trim()) {
        params.append("search", config.search.trim());
      }

      if (config.sortBy && config.sort) {
        params.append("sortBy", config.sortBy);
        params.append("sort", config.sort);
      }

      // Add filters if any
      Object.entries(config.filters).forEach(([key, value]) => {
        if (value) {
          params.append(key, value);
        }
      });

      const url = `${
        appConfig.API_PATHS.CANDIDATURE.accessible.path
      }?${params.toString()}`;

      const response = await getData<PaginatedResponse<CandidatureTableData>>(
        url
      );

      if (!response) {
        throw new Error("No data received from server");
      }

      return response;
    },
    [] // Empty dependency array - this function should be stable
  );

  // Use the table hook
  const { config, data, loading, error, setConfig } =
    useServerSideTable<CandidatureTableData>({
      initialConfig: {
        pageSize: 10,
      },
      fetcher: fetchCandidatures,
      onError: (err) => {
        console.error("Error fetching candidatures:", err);
      },
    });

  // Modal state management
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCandidature, setSelectedCandidature] =
    useState<CandidatureTableData | null>(null);

  // Modal handlers
  const handleViewCandidature = (candidature: CandidatureTableData) => {
    setSelectedCandidature(candidature);
    setIsViewModalOpen(true);
  };

  const handleEditCandidature = (candidature: CandidatureTableData) => {
    setSelectedCandidature(candidature);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedCandidature(null);
  };

  const handleEditSuccess = (_updatedCandidature: CandidatureResponseDTO) => {
    // Refresh the table data to show updated information
    window.location.reload(); // Simple refresh - you could implement more sophisticated state update
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

  // Define table columns
  const columns: Column[] = [
    {
      key: "id",
      label: "ID",
      sortable: true,
      render: (_: any, candidature: CandidatureTableData) => (
        <div className="text-sm font-medium text-gray-900">
          #{candidature.id}
        </div>
      ),
    },
    {
      key: "candidat",
      label: "Candidat",
      sortable: true,
      render: (_: any, candidature: CandidatureTableData) => (
        <div className="min-w-0">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-400" />
            <div>
              <div className="font-medium text-gray-900">
                {candidature.candidatPrenom} {candidature.candidatNom}
              </div>
              <div className="text-sm text-gray-500">
                ID: {candidature.candidatId}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "specialite",
      label: "Spécialité",
      sortable: true,
      render: (_: any, candidature: CandidatureTableData) => (
        <div className="text-sm font-medium text-gray-900">
          {candidature.specialite}
        </div>
      ),
    },
    {
      key: "intitulePFE",
      label: "Intitulé PFE",
      sortable: true,
      render: (_: any, candidature: CandidatureTableData) => (
        <div className="text-sm">
          {candidature.intitulePFE ? (
            <div
              className="font-medium text-gray-900 truncate max-w-xs"
              title={candidature.intitulePFE}
            >
              {candidature.intitulePFE}
            </div>
          ) : (
            <span className="text-gray-400 italic">Non spécifié</span>
          )}
        </div>
      ),
    },
    {
      key: "sujetsIds",
      label: "Sujets Postulés",
      render: (_: any, candidature: CandidatureTableData) => (
        <div className="space-y-1">
          {candidature.sujetsIds && candidature.sujetsIds.length > 0 ? (
            <div>
              <div className="text-sm font-medium text-gray-900">
                {candidature.sujetsIds.length} sujet(s)
              </div>
              <div className="text-xs text-gray-500">
                IDs: {candidature.sujetsIds.slice(0, 3).join(", ")}
                {candidature.sujetsIds.length > 3 && "..."}
              </div>
            </div>
          ) : (
            <span className="text-gray-400 italic text-sm">Aucun sujet</span>
          )}
        </div>
      ),
    },
    {
      key: "statutCandidature",
      label: "Statut",
      sortable: true,
      render: (_: any, candidature: CandidatureTableData) => (
        <div className="flex justify-center">
          <StatusBadge status={candidature.statutCandidature} />
        </div>
      ),
    },
    {
      key: "createdAt",
      label: "Date de Candidature",
      sortable: true,
      render: (_: any, candidature: CandidatureTableData) => (
        <div className="text-sm text-gray-600">
          {new Date(candidature.createdAt).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      ),
    },
  ];

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Erreur de Chargement
          </h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <ServerSideTable
        title="Candidatures Accessibles"
        subtitle="Gestion et suivi des candidatures soumises par les doctorants"
        columns={columns}
        data={data}
        loading={loading}
        config={config}
        onConfigChange={setConfig}
        searchPlaceholder="Rechercher par nom, prénom, spécialité ou établissement..."
        emptyMessage="Aucune candidature trouvée"
        dataStability={true}
        onView={(row) => handleViewCandidature(row as CandidatureTableData)}
        onEdit={(row) => handleEditCandidature(row as CandidatureTableData)}
        // Note: Delete actions might need specific permissions
        // onDelete={async (row) => { ... }}
      />

      <ViewCandidatureModal
        candidature={selectedCandidature}
        isOpen={isViewModalOpen}
        onClose={handleCloseModal}
      />

      <EditMaCandidatureModal
        candidature={selectedCandidature}
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleEditSuccess}
        onError={(error) => console.error("Edit error:", error)}
      />
    </div>
  );
};

export default LesCandidature;
