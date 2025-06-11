import type { Column } from "@/Components/Table/ServerSideTable";
import ServerSideTable from "@/Components/Table/ServerSideTable";
import { getData } from "@/Helpers/CRUDFunctions";
import { useServerSideTable } from "@/Hooks/useServerSideTable";
import EquipeViewModal from "@/Pages/Equipe/EquipeViewModal";
import appConfig from "@/public/config";
import { PaginatedResponse, TableConfig } from "@/Types/GlobalTypes";
import { EquipeResponseDTO } from "@/Types/UtilisateursTypes";
import React, { useCallback, useState } from "react";

const EquipeDeRecherchePage: React.FC = () => {
  // Modal state
  const [selectedEquipe, setSelectedEquipe] =
    useState<EquipeResponseDTO | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Fetcher function for the table hook
  const fetchEquipes = useCallback(
    async (
      config: TableConfig
    ): Promise<PaginatedResponse<EquipeResponseDTO>> => {
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
        appConfig.API_PATHS.EQUIPE.getPublicPaginated.path
      }?${params.toString()}`;

      const response = await getData<PaginatedResponse<EquipeResponseDTO>>(url);

      if (!response) {
        throw new Error("No data received from server");
      }

      return response;
    },
    []
  );
  // Use the table hook
  const { config, data, loading, setConfig } =
    useServerSideTable<EquipeResponseDTO>({
      initialConfig: {
        pageSize: 10,
      },
      fetcher: fetchEquipes,
      onError: (err) => {
        console.error("Error fetching équipes:", err);
      },
    }); // Handle view équipe details
  const handleViewEquipe = async (row: EquipeResponseDTO) => {
    try {
      const url = appConfig.API_PATHS.EQUIPE.getById.path.replace(
        ":id",
        row.id.toString()
      );
      const equipeDetails = await getData<EquipeResponseDTO>(url);
      if (equipeDetails) {
        setSelectedEquipe(equipeDetails);
        setIsViewModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching équipe details:", error);
    }
  };

  const handleCloseModal = () => {
    setIsViewModalOpen(false);
    setSelectedEquipe(null);
  };
  // Define table columns
  const columns: Column[] = [
    {
      key: "nomDeLequipe",
      label: "Nom de l'équipe",
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-900 font-medium">{value}</div>
      ),
    },
    {
      key: "nomCompletChef",
      label: "Chef d'équipe",
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-700">{value || "—"}</div>
      ),
    },
    {
      key: "nombreMembres",
      label: "Membres",
      sortable: true,
      render: (value: number) => (
        <div className="text-sm text-gray-700">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {value} membre{value !== 1 ? "s" : ""}
          </span>
        </div>
      ),
    },
    {
      key: "nombreDoctorants",
      label: "Doctorants",
      sortable: true,
      render: (value: number) => (
        <div className="text-sm text-gray-700">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {value} doctorant{value !== 1 ? "s" : ""}
          </span>
        </div>
      ),
    },
    {
      key: "createdAt",
      label: "Date de création",
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-700">
          {new Date(value).toLocaleDateString("fr-FR")}
        </div>
      ),
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ÉQUIPES DE RECHERCHE
          </h1>
          <p className="text-gray-600">
            Découvrez les équipes de recherche et leurs domaines d'expertise
          </p>
        </div>{" "}
        {/* Server Side Table */}
        <div className="bg-white rounded-lg shadow-sm border">
          <ServerSideTable
            columns={columns}
            headerColor="bg-blue-50 border-b border-blue-200"
            headerColorHover="hover:bg-blue-100"
            data={data}
            loading={loading}
            config={config}
            onConfigChange={setConfig}
            onView={handleViewEquipe}
            actions={true}
            searchPlaceholder="Rechercher par nom d'équipe, chef ou nombre de membres..."
            title="Équipes de recherche"
            subtitle="Liste des équipes de recherche et leurs informations"
            searchable={true}
            emptyMessage="Aucune équipe de recherche trouvée"
          />
        </div>
      </div>

      {/* View Modal */}
      <EquipeViewModal
        isOpen={isViewModalOpen}
        onClose={handleCloseModal}
        equipe={selectedEquipe}
      />
    </div>
  );
};

export default EquipeDeRecherchePage;
