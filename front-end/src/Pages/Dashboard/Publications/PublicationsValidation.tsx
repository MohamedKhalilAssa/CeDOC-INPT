import React, { useState, useEffect } from "react";
import { getData, putData, patchData } from "@/Helpers/CRUDFunctions";

interface Publication {
  id: number;
  titre: string;
  auteurs: string;
  journal: string;
  volume?: string;
  numero?: string;
  pages?: string;
  annee: number;
  doi?: string;
  url?: string;
  resume?: string;
  motsCles?: string;
  status: string;
  participantId: number;
  validateurId?: number;
  createdAt: string;
  updatedAt: string;
}

const PublicationsValidation: React.FC = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [processingIds, setProcessingIds] = useState<Set<number>>(new Set());
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);

  useEffect(() => {
    fetchPublications();
  }, [currentPage]);

  const fetchPublications = async (): Promise<void> => {
    try {
      setLoading(true);
      const data = await getData<any>(
        `publications/?page=${currentPage}&size=10&sortDir=desc`
      );

      if (data && typeof data === "object") {
        if (Array.isArray(data)) {
          setPublications(data);
          setTotalPages(1);
          setTotalElements(data.length);
        } else if (data.content && Array.isArray(data.content)) {
          setPublications(data.content);
          setTotalPages(data.totalPages || 1);
          setTotalElements(data.totalElements || data.content.length);
        } else {
          setPublications([]);
        }
      } else {
        setPublications([]);
      }
    } catch (error) {
      console.error("Error fetching publications:", error);
      setErrorMessage("Erreur lors du chargement des publications");
      setPublications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleValidation = async (
    publicationId: number,
    action: "valider" | "refuser"
  ): Promise<void> => {
    if (processingIds.has(publicationId)) return;

    const confirmMessage =
      action === "valider"
        ? "Êtes-vous sûr de vouloir valider cette publication ?"
        : "Êtes-vous sûr de vouloir refuser cette publication ?";

    if (!window.confirm(confirmMessage)) return;

    setProcessingIds((prev) => new Set(prev).add(publicationId));
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const endpoint = `publications/${publicationId}/${action}`;

      const response = await patchData<Publication>(endpoint, {});

      if (response) {
        setPublications((prev) =>
          prev.map((pub) =>
            pub.id === publicationId
              ? { ...pub, status: action === "valider" ? "VALIDEE" : "REFUSEE" }
              : pub
          )
        );
        setSuccessMessage(
          `Publication ${
            action === "valider" ? "validée" : "refusée"
          } avec succès!`
        );
      } else {
        await fetchPublications();
        setSuccessMessage(
          `Publication ${
            action === "valider" ? "validée" : "refusée"
          } avec succès!`
        );
      }

      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      console.error(`Error ${action}ing publication:`, error);
      setErrorMessage(
        `Erreur lors de la ${
          action === "valider" ? "validation" : "refus"
        } de la publication`
      );
    } finally {
      setProcessingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(publicationId);
        return newSet;
      });
    }
  };

  const formatDate = (dateString: string): string => {
    try {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }
      return date.toLocaleDateString("fr-FR", options);
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "VALIDEE":
        return "text-green-600 bg-green-100";
      case "REFUSEE":
        return "text-red-600 bg-red-100";
      case "EN_ATTENTE":
        return "text-yellow-600 bg-yellow-100";
      case "DECLAREE":
        return "text-blue-600 bg-blue-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusText = (status: string): string => {
    switch (status) {
      case "VALIDEE":
        return "Validée";
      case "REFUSEE":
        return "Refusée";
      case "EN_ATTENTE":
        return "En attente";
      case "DECLAREE":
        return "Déclarée";
      default:
        return status;
    }
  };

  const canValidateOrRefuse = (status: string): boolean => {
    return status === "EN_ATTENTE" || status === "DECLAREE";
  };

  const handlePageChange = (newPage: number): void => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-600">Chargement des publications...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Validation des Publications
          </h1>
          <p className="text-gray-600">
            Validez ou refusez les publications soumises par les doctorants.
          </p>
          {totalElements > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              {totalElements} publication{totalElements > 1 ? "s" : ""} au total
            </p>
          )}
        </div>

        <div className="p-6">
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errorMessage}
            </div>
          )}

          {publications.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Journal
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date de publication
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Auteurs
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Titre de l'article
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Justificatif
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {publications.map((publication) => (
                      <tr key={publication.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {publication.journal}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {publication.annee}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {publication.auteurs}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {publication.titre}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                          {publication.url ? (
                            <a
                              href={publication.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                            >
                              Voir le justificatif
                            </a>
                          ) : (
                            <span className="text-gray-400">Aucun</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              publication.status
                            )}`}
                          >
                            {getStatusText(publication.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {canValidateOrRefuse(publication.status) && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() =>
                                  handleValidation(publication.id, "valider")
                                }
                                disabled={processingIds.has(publication.id)}
                                className={`px-3 py-1 rounded text-white text-xs font-medium ${
                                  processingIds.has(publication.id)
                                    ? "bg-green-400 cursor-not-allowed"
                                    : "bg-green-600 hover:bg-green-700"
                                } transition-colors`}
                              >
                                {processingIds.has(publication.id) ? (
                                  <span className="flex items-center">
                                    <svg
                                      className="animate-spin -ml-1 mr-1 h-3 w-3 text-white"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                      ></circle>
                                      <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                      ></path>
                                    </svg>
                                    ...
                                  </span>
                                ) : (
                                  "Valider"
                                )}
                              </button>
                              <button
                                onClick={() =>
                                  handleValidation(publication.id, "refuser")
                                }
                                disabled={processingIds.has(publication.id)}
                                className={`px-3 py-1 rounded text-white text-xs font-medium ${
                                  processingIds.has(publication.id)
                                    ? "bg-red-400 cursor-not-allowed"
                                    : "bg-red-600 hover:bg-red-700"
                                } transition-colors`}
                              >
                                {processingIds.has(publication.id) ? (
                                  <span className="flex items-center">
                                    <svg
                                      className="animate-spin -ml-1 mr-1 h-3 w-3 text-white"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                      ></circle>
                                      <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                      ></path>
                                    </svg>
                                    ...
                                  </span>
                                ) : (
                                  "Refuser"
                                )}
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6 flex justify-center items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    className={`px-3 py-2 rounded ${
                      currentPage === 0
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    Précédent
                  </button>

                  <span className="text-gray-600">
                    Page {currentPage + 1} sur {totalPages}
                  </span>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                    className={`px-3 py-2 rounded ${
                      currentPage === totalPages - 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    Suivant
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                Aucune publication à valider
              </h3>
              <p className="text-gray-600">
                Toutes les publications ont été traitées ou aucune publication
                n'a été soumise.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicationsValidation;
