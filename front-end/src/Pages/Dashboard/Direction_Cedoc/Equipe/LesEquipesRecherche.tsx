// import ViewEquipeModal from "@/Components/Dashboard/Direction_Cedoc/Equipe/ViewEquipeModal";
import type { Column } from "@/Components/Table/ServerSideTable";
import ServerSideTable from "@/Components/Table/ServerSideTable";
import { getData } from "@/Helpers/CRUDFunctions";
import { useAuth } from "@/Hooks/UseAuth";
import { useServerSideTable } from "@/Hooks/useServerSideTable";
import appConfig from "@/public/config";
import { PaginatedResponse, TableConfig } from "@/Types/GlobalTypes";
import { RoleEnum } from "@/Types/UtilisateursEnums";
import { EquipeResponseDTO } from "@/Types/UtilisateursTypes";
import { Calendar, Plus, User, Users, XCircle } from "lucide-react";
import React, { useCallback, useState } from "react";
import CreateEquipeDeRechercheModal from "./CreateEquipeDeRechercheModal";
import DeleteEquipeModal from "./DeleteEquipeModal";
import EditEquipeModal from "./EditEquipeModal";
import ViewEquipeModal from "./ViewEquipeModal";

interface EquipeTableData extends EquipeResponseDTO {
  // Extending the base type with additional fields if needed
}

const LesEquipesRecherche: React.FC = () => {
  const auth = useAuth();

  // Fetcher function for the table hook
  const fetchEquipes = useCallback(
    async (
      config: TableConfig
    ): Promise<PaginatedResponse<EquipeTableData>> => {
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
        appConfig.API_PATHS.EQUIPE.getAllPaginated?.path ||
        "/api/equipes/paginated"
      }?${params.toString()}`;

      const response = await getData<PaginatedResponse<EquipeTableData>>(url);

      if (!response) {
        throw new Error("No data received from server");
      }

      return response;
    },
    [] // Empty dependency array - this function should be stable
  );

  // Use the table hook
  const { config, data, loading, error, setConfig } =
    useServerSideTable<EquipeTableData>({
      initialConfig: {
        pageSize: 10,
      },
      fetcher: fetchEquipes,
      onError: (err) => {
        console.error("Error fetching equipes:", err);
      },
    });

  // Modal state management
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEquipe, setSelectedEquipe] = useState<EquipeTableData | null>(
    null
  );

  // Modal handlers
  const handleCreateEquipe = () => {
    setIsCreateModalOpen(true);
  };

  const handleViewEquipe = (equipe: EquipeTableData) => {
    setSelectedEquipe(equipe);
    setIsViewModalOpen(true);
  };

  const handleEditEquipe = (equipe: EquipeTableData) => {
    setSelectedEquipe(equipe);
    setIsEditModalOpen(true);
  };

  const handleDeleteEquipe = (equipe: EquipeTableData) => {
    setSelectedEquipe(equipe);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedEquipe(null);
  };

  const handleSuccess = () => {
    // Refresh the table data to show updated information
    window.location.reload(); // Simple refresh - you could implement more sophisticated state update
  };

  // Check if user has permission to manage equipes
  const canManageEquipes = auth.roles.some((role) =>
    [RoleEnum.DIRECTION_CEDOC].includes(role)
  );

  // Define table columns
  const columns: Column[] = [
    {
      key: "id",
      label: "ID",
      sortable: true,
      render: (_: any, equipe: EquipeTableData) => (
        <div className="text-sm font-medium text-gray-900">#{equipe.id}</div>
      ),
    },
    {
      key: "nomDeLequipe",
      label: "Nom de l'équipe",
      sortable: true,
      render: (_: any, equipe: EquipeTableData) => (
        <div className="min-w-0">
          <div className="font-medium text-gray-900 truncate">
            {equipe.nomDeLequipe}
          </div>
        </div>
      ),
    },
    {
      key: "nomCompletChef",
      label: "Chef d'équipe",
      sortable: true,
      render: (_: any, equipe: EquipeTableData) => (
        <div className="min-w-0">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-400" />
            <div>
              <div className="font-medium text-gray-900">
                {equipe.nomCompletChef || "Non assigné"}
              </div>
              {equipe.chefEquipeId && (
                <div className="text-sm text-gray-500">
                  ID: {equipe.chefEquipeId}
                </div>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "nombreMembres",
      label: "Membres",
      sortable: true,
      render: (_: any, equipe: EquipeTableData) => (
        <div className="text-sm text-gray-700">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Users className="w-3 h-3 mr-1" />
            {equipe.nombreMembres} membre{equipe.nombreMembres !== 1 ? "s" : ""}
          </span>
        </div>
      ),
    },
    {
      key: "nombreDoctorants",
      label: "Doctorants",
      sortable: true,
      render: (_: any, equipe: EquipeTableData) => (
        <div className="text-sm text-gray-700">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {equipe.nombreDoctorants} doctorant
            {equipe.nombreDoctorants !== 1 ? "s" : ""}
          </span>
        </div>
      ),
    },
    {
      key: "createdAt",
      label: "Date de création",
      sortable: true,
      render: (_: any, equipe: EquipeTableData) => (
        <div className="text-sm text-gray-600">
          <Calendar className="w-4 h-4 inline mr-1" />
          {new Date(equipe.createdAt).toLocaleDateString("fr-FR", {
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
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Gestion des Équipes de Recherche
            </h1>
            <p className="text-gray-600 mt-1">
              Gérez les équipes de recherche, leurs chefs et leurs membres
            </p>
          </div>
          {canManageEquipes && (
            <div className="mt-4 sm:mt-0">
              <button
                onClick={handleCreateEquipe}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                <Plus className="w-4 h-4 mr-2" />
                Créer une équipe
              </button>
            </div>
          )}
        </div>
      </div>

      <ServerSideTable
        title="Équipes de Recherche"
        subtitle="Gestion et suivi des équipes de recherche et de leurs membres"
        columns={columns}
        data={data}
        loading={loading}
        config={config}
        onConfigChange={setConfig}
        searchPlaceholder="Rechercher par nom d'équipe, chef d'équipe..."
        emptyMessage="Aucune équipe trouvée"
        dataStability={true}
        onView={(row) => handleViewEquipe(row as EquipeTableData)}
        onEdit={
          canManageEquipes
            ? (row) => handleEditEquipe(row as EquipeTableData)
            : undefined
        }
        onDelete={
          canManageEquipes
            ? (row) => handleDeleteEquipe(row as EquipeTableData)
            : undefined
        }
      />

      {/* Modals */}
      <CreateEquipeDeRechercheModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
      />

      <ViewEquipeModal
        equipe={selectedEquipe}
        isOpen={isViewModalOpen}
        onClose={handleCloseModal}
      />

      {canManageEquipes && (
        <>
          <EditEquipeModal
            equipe={selectedEquipe}
            isOpen={isEditModalOpen}
            onClose={handleCloseModal}
            onSuccess={handleSuccess}
          />

          <DeleteEquipeModal
            equipe={selectedEquipe}
            isOpen={isDeleteModalOpen}
            onClose={handleCloseModal}
            onSuccess={handleSuccess}
          />
        </>
      )}
    </div>
  );
};

export default LesEquipesRecherche;
