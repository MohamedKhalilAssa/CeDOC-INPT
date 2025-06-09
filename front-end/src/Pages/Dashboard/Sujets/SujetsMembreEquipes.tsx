import Badge from "@/Components/DashComps/ui/badge/Badge";
import type { Column } from "@/Components/Table/Table";
import DataTable from "@/Components/Table/Table";
import { getData } from "@/Helpers/CRUDFunctions";
import appConfig from "@/public/config";
import { SujetResponseDTO } from "@/Types/CandidatureTypes";
import { PaginatedResponse } from "@/Types/GlobalTypes";
import { CheckCircle, Eye, EyeOff, XCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

interface SujetMembreEquipe extends SujetResponseDTO {
  // Extending the base type with team member specific fields if needed
}

const SujetsMembreEquipes: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SujetMembreEquipe[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getData<PaginatedResponse<SujetMembreEquipe>>(
          appConfig.API_PATHS.CHEFS_EQUIPES.sujetsDesMembresEquipe.path
        );

        if (response) {
          setData(response.content);
        } else {
          setData([]);
        }
      } catch (err) {
        console.error("Erreur lors du chargement des sujets:", err);
        setError("Impossible de charger les sujets des membres de l'équipe");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Status badge component for validation status
  const StatusBadge: React.FC<{ isValid: boolean; label: string }> = ({
    isValid,
    label,
  }) => (
    <Badge
      variant={isValid ? "solid" : "light"}
      color={isValid ? "success" : "warning"}
      size="sm"
    >
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
    <Badge
      variant={isPublic ? "solid" : "light"}
      color={isPublic ? "primary" : "light"}
      size="sm"
    >
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
          </div>{" "}
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
    // {
    //   key: "chefEquipe",
    //   label: "Chef d'Équipe",
    //   render: (_: any, sujet: SujetMembreEquipe) => (
    //     <div className="text-sm">
    //       {sujet.chefEquipe ? (
    //         <>
    //           <div className="font-medium text-gray-900">
    //             {sujet.chefEquipe.prenom} {sujet.chefEquipe.nom}
    //           </div>
    //           <div className="text-gray-500">{sujet.chefEquipe.email}</div>
    //         </>
    //       ) : (
    //         <span className="text-gray-400 italic">Non assigné</span>
    //       )}
    //     </div>
    //   ),
    // },
    {
      key: "valide",
      label: "Statut de Validation",
      sortable: true,
      render: (_: any, sujet: SujetMembreEquipe) => (
        <StatusBadge
          isValid={sujet.valide}
          label={sujet.valide ? "Validé" : "En attente"}
        />
      ),
    },
    {
      key: "estPublic",
      label: "Visibilité",
      sortable: true,
      render: (_: any, sujet: SujetMembreEquipe) => (
        <PublicStatusBadge isPublic={sujet.estPublic} />
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
  ]; // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
      <DataTable
        title="Sujets des Membres de l'Équipe"
        subtitle="Gestion et supervision des sujets de thèse proposés par les membres de votre équipe de recherche"
        data={data}
        columns={columns}
        loading={loading}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        itemsPerPage={10}
        searchPlaceholder="Rechercher par intitulé, description..."
        emptyMessage="Aucun sujet trouvé pour les membres de l'équipe"
      />
    </div>
  );
};

export default SujetsMembreEquipes;
