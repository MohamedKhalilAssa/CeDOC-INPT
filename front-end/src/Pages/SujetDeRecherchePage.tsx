// src/Pages/EquipesDeRecherchePage.tsx
import type { Column } from "@/Components/Table/ServerSideTable";
import ServerSideTable from "@/Components/Table/ServerSideTable";
import { getData } from "@/Helpers/CRUDFunctions";
import { useServerSideTable } from "@/Hooks/useServerSideTable";
import appConfig from "@/public/config";
import { ChefSujetsEquipeResponseDTO } from "@/Types/CandidatureTypes";
import { PaginatedResponse, TableConfig } from "@/Types/GlobalTypes";
import React, { useCallback } from "react";
import { Link } from "react-router-dom";

const SujetDeRecherchePage: React.FC = () => {
  // Fetcher function for the table hook
  const fetchSujets = useCallback(
    async (
      config: TableConfig
    ): Promise<PaginatedResponse<ChefSujetsEquipeResponseDTO>> => {
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
        appConfig.API_PATHS.SUJET.sujetsChefEquipes.path
      }?${params.toString()}`;

      const response = await getData<
        PaginatedResponse<ChefSujetsEquipeResponseDTO>
      >(url);

      if (!response) {
        throw new Error("No data received from server");
      }

      return response;
    },
    []
  );

  // Use the table hook
  const { config, data, loading, setConfig } =
    useServerSideTable<ChefSujetsEquipeResponseDTO>({
      initialConfig: {
        pageSize: 10,
      },
      fetcher: fetchSujets,
      onError: (err) => {
        console.error("Error fetching sujets:", err);
      },
    });

  // Define table columns
  const columns: Column[] = [
    {
      key: "intituleSujet",
      label: "Sujet",
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
      key: "equipeIntitule",
      label: "Équipe de recherche",
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-700">
          {value ? (
            <Link
              className="text-blue-500 hover:underline transition hover:text-blue-700"
              to={appConfig.FRONTEND_PATHS.EQUIPE.Listings.path}
            >
              {value}
            </Link>
          ) : (
            "—"
          )}
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
            ÉQUIPES ET SUJETS DE RECHERCHE
          </h1>
          <p className="text-gray-600">
            Découvrez les sujets de recherche disponibles et leurs équipes
            associées
          </p>
        </div>

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
            searchPlaceholder="Rechercher par sujet, chef d'équipe ou équipe..."
            title="Sujets de recherche"
            subtitle="Liste des sujets de recherche proposés par les équipes"
            searchable={true}
            emptyMessage="Aucun sujet de recherche trouvé"
            actions={false}
          />
        </div>
      </div>
    </div>
  );
};

export default SujetDeRecherchePage;
