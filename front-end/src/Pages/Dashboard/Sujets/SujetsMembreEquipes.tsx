// filepath: d:\Programming\CeDOC - INPT\front-end\src\Pages\Dashboard\Sujets\SujetsMembreEquipes.tsx
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

interface SujetMembreEquipe extends SujetResponseDTO {
  // Extending the base type with team member specific fields if needed
}

const SujetsMembreEquipes: React.FC = () => {
  // Fetcher function for the table hook - moved outside to be completely stable
  const swal = useAlert();
  const fetchSujets = useCallback(
    async (
      config: TableConfig
    ): Promise<PaginatedResponse<SujetMembreEquipe>> => {
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
        appConfig.API_PATHS.CHEFS_EQUIPES.sujetsDesMembresEquipe.path
      }?${params.toString()}`;

      const response = await getData<PaginatedResponse<SujetMembreEquipe>>(url);

      if (!response) {
        throw new Error("No data received from server");
      }

      return response;
    },
    [] // Empty dependency array - this function should be stable
  ); // Use the table hook
  const { config, data, loading, error, setConfig, refetch } =
    useServerSideTable<SujetMembreEquipe>({
      initialConfig: {
        pageSize: 10,
      },
      fetcher: fetchSujets,
      onError: (err) => {
        console.error("Error fetching sujets:", err);
      },
    });
  // Modal state management
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedSujet, setSelectedSujet] = useState<SujetMembreEquipe | null>(
    null
  );
  // Modal handlers
  const handleEditSujet = (sujet: SujetMembreEquipe) => {
    setSelectedSujet(sujet);
    setIsEditModalOpen(true);
  };

  const handleViewSujet = (sujet: SujetMembreEquipe) => {
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

  // Define table columns
  const columns: Column[] = [
    {
      key: "intitule",
      label: "Intitulé du Sujet",
      sortable: true,
      render: (_: any, sujet: SujetMembreEquipe) => (
        <div className="min-w-0 max-w-xs">
          <div
            className="font-medium text-gray-900 truncate"
            title={sujet.intitule}
          >
            {sujet.intitule}
          </div>
          {sujet.description && (
            <div
              className="text-sm text-gray-500 truncate mt-1"
              title={sujet.description}
            >
              {sujet.description}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "professeurs",
      label: "Directeur de thèse",
      render: (_: any, sujet: SujetMembreEquipe) => (
        <div className="space-y-1">
          {sujet.directeurDeThese ? (
            <div className="text-sm">
              <div className="font-medium text-gray-900">
                {sujet.directeurDeThese.prenom} {sujet.directeurDeThese.nom}
              </div>
              <div className="text-gray-500">
                {sujet.directeurDeThese.email}
              </div>
            </div>
          ) : (
            <span className="text-gray-400 italic">
              Aucun directeur de thèse assigné
            </span>
          )}
        </div>
      ),
    },
    {
      key: "valide",
      label: "Statut de Validation",
      sortable: true,
      render: (_: any, sujet: SujetMembreEquipe) => (
        <div className="flex justify-center">
          <StatusBadge
            isValid={sujet.valide}
            label={sujet.valide ? "Validé" : "Non Validé"}
          />
        </div>
      ),
    },
    {
      key: "estPublic",
      label: "Visibilité",
      sortable: true,
      render: (_: any, sujet: SujetMembreEquipe) => (
        <div className="flex justify-center">
          <PublicStatusBadge isPublic={sujet.estPublic} />
        </div>
      ),
    },
    {
      key: "createdAt",
      label: "Date de Création",
      sortable: true,
      render: (_: any, sujet: SujetMembreEquipe) => (
        <div className="text-sm text-gray-600">
          {new Date(sujet.createdAt).toLocaleDateString("fr-FR", {
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
      {" "}
      <ServerSideTable
        title="Sujets des Membres de l'Équipe"
        subtitle="Gestion et supervision des sujets de thèse proposés par les membres de votre équipe de recherche"
        columns={columns}
        data={data}
        loading={loading}
        config={config}
        onConfigChange={setConfig}
        searchPlaceholder="Rechercher par intitulé, description ou directeur de thèse..."
        emptyMessage="Aucun sujet trouvé pour les membres de l'équipe"
        dataStability={true}
        onView={(row) => handleViewSujet(row as SujetMembreEquipe)}
        onEdit={(row) => handleEditSujet(row as SujetMembreEquipe)}
        onDelete={async (row) => {
          const isConfirmed: boolean = await swal.confirm(
            "Confirmer la suppression",
            "Êtes-vous sûr de vouloir supprimer ce sujet ?",
            "Supprimer"
          );
          if (isConfirmed) {
            try {
              await deleteData(
                `${appConfig.API_PATHS.SUJET.deleteSujet.path}${row.id}`
              );

              // Show success message
              swal.toast("Sujet supprimé avec succès", "success");

              // Refetch data to update the table
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
      />{" "}
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

export default SujetsMembreEquipes;
