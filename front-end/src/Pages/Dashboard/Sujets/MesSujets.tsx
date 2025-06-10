// filepath: d:\Programming\CeDOC - INPT\front-end\src\Pages\Dashboard\Sujets\MesSujets.tsx
import Badge from "@/Components/DashComps/ui/badge/Badge";
import type { Column } from "@/Components/Table/ServerSideTable";
import ServerSideTable from "@/Components/Table/ServerSideTable";
import { deleteData, getData } from "@/Helpers/CRUDFunctions";
import { useAlert } from "@/Hooks/UseAlert";
import { useServerSideTable } from "@/Hooks/useServerSideTable";
import EditSujetModal from "@/Pages/Dashboard/Sujets/EditSujetsModal";
import ViewSujetsModal from "@/Pages/Dashboard/Sujets/ViewSujetsModal";
import appConfig from "@/public/config";
import { SujetResponseDTO } from "@/Types/CandidatureTypes";
import { PaginatedResponse, TableConfig } from "@/Types/GlobalTypes";
import { CheckCircle, Eye, EyeOff, XCircle } from "lucide-react";
import React, { useCallback, useState } from "react";

interface MesSujets extends SujetResponseDTO {
  // Extending the base type with user-specific fields if needed
}

const MesSujets: React.FC = () => {
  // Fetcher function for the table hook - moved outside to be completely stable
  const swal = useAlert();
  const fetchSujets = useCallback(
    async (config: TableConfig): Promise<PaginatedResponse<MesSujets>> => {
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
        appConfig.API_PATHS.PROFESSEUR.mesSujets.path
      }?${params.toString()}`;

      const response = await getData<PaginatedResponse<MesSujets>>(url);

      if (!response) {
        throw new Error("No data received from server");
      }

      return response;
    },
    [] // Empty dependency array - this function should be stable
  );
  // Use the table hook
  const { config, data, loading, setConfig, refetch } =
    useServerSideTable<MesSujets>({
      initialConfig: {
        pageSize: 10,
      },
      fetcher: fetchSujets,
      onError: (err) => {
        console.error("Error fetching mes sujets:", err);
      },
    });

  // Modal state management
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedSujet, setSelectedSujet] = useState<MesSujets | null>(null);

  // Modal handlers
  const handleEditSujet = (sujet: MesSujets) => {
    setSelectedSujet(sujet);
    setIsEditModalOpen(true);
  };

  const handleViewSujet = (sujet: MesSujets) => {
    setSelectedSujet(sujet);
    setIsViewModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setIsViewModalOpen(false);
    setSelectedSujet(null);
  };

  const handleSaveSuccess = () => {
    refetch(); // Refresh the table data
  };

  const handleError = (message: string) => {
    swal.toast(message, "error");
  };

  const handleSuccess = (message: string) => {
    swal.toast(message, "success");
  };

  // Status badge component for validation status
  const StatusBadge: React.FC<{ isValid: boolean; label: string }> = ({
    isValid,
    label,
  }) => (
    <Badge variant="solid" color={isValid ? "success" : "light"} size="sm">
      {isValid ? (
        <CheckCircle className="w-3 h-3" />
      ) : (
        <XCircle className="w-3 h-3" />
      )}
      {label}
    </Badge>
  );

  // Public status badge component
  const PublicStatusBadge: React.FC<{ isPublic: boolean }> = ({ isPublic }) => (
    <Badge variant="solid" color={isPublic ? "success" : "light"} size="sm">
      {isPublic ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
      {isPublic ? "Public" : "Privé"}
    </Badge>
  );
  // Table columns definition
  const columns: Column[] = [
    {
      key: "intitule",
      label: "Intitulé",
      sortable: true,
      render: (_value: any, sujet: MesSujets) => (
        <div className="font-medium text-gray-900">{sujet.intitule}</div>
      ),
    },
    {
      key: "description",
      label: "Description",
      sortable: false,
      render: (_value: any, sujet: MesSujets) => (
        <div className="text-sm text-gray-600 max-w-xs truncate">
          {sujet.description}
        </div>
      ),
    },
    {
      key: "valide",
      label: "Statut",
      sortable: true,
      render: (_value: any, sujet: MesSujets) => (
        <StatusBadge
          isValid={sujet.valide}
          label={sujet.valide ? "Validé" : "Non validé"}
        />
      ),
    },
    {
      key: "estPublic",
      label: "Visibilité",
      sortable: true,
      render: (_value: any, sujet: MesSujets) => (
        <PublicStatusBadge isPublic={sujet.estPublic} />
      ),
    },
    {
      key: "createdAt",
      label: "Date de création",
      sortable: true,
      render: (_value: any, sujet: MesSujets) => (
        <div className="text-sm text-gray-600">
          {sujet.createdAt
            ? new Date(sujet.createdAt).toLocaleDateString("fr-FR")
            : "N/A"}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes Sujets</h1>
          <p className="text-gray-600">
            Gérez les sujets que vous avez proposés
          </p>
        </div>
      </div>{" "}
      <ServerSideTable
        data={data}
        columns={columns}
        loading={loading}
        config={config}
        onConfigChange={setConfig}
        onView={handleViewSujet}
        onEdit={handleEditSujet}
        onDelete={async (sujet) => {
          const isConfirmed = await swal.confirm(
            "Confirmer la suppression",
            `Êtes-vous sûr de vouloir supprimer le sujet "${sujet.intitule}" ?`,
            "Supprimer"
          );
          if (isConfirmed) {
            try {
              await deleteData(
                `${appConfig.API_PATHS.SUJET.deleteSujet.path}${sujet.id}`
              );
              swal.toast("Sujet supprimé avec succès", "success");
              refetch();
            } catch (error) {
              console.error("Delete error:", error);
              swal.error(
                "Erreur de suppression",
                "Suppression du sujet a échoué."
              );
            }
          }
        }}
      />
      {/* Edit Sujet Modal */}
      <EditSujetModal
        sujet={selectedSujet}
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveSuccess}
        onError={handleError}
        onSuccess={handleSuccess}
      />
      {/* View Sujet Modal */}
      <ViewSujetsModal
        sujet={selectedSujet}
        isOpen={isViewModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default MesSujets;
