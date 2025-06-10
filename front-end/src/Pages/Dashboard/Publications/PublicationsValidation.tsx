import React, { useState, useEffect, ChangeEvent } from "react";
import { getData, patchData } from "@/Helpers/CRUDFunctions";

interface Publication {
  id: number;
  titre: string;
  auteurId: number;
  autresAuteurs?: string;
  journal: string;
  datePublication: string;
  prixIntitule?: string;
  justificatif?: string;
  status: string;
  validateurId?: number;
  createdAt: string;
  updatedAt: string;
  participant?: {
    nom: string;
    prenom: string;
    email: string;
  };
}

interface ValidationComment {
  [key: number]: string;
}

const PublicationsValidation: React.FC = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("DECLAREE");
  const [comments, setComments] = useState<ValidationComment>({});
  const [processingIds, setProcessingIds] = useState<Set<number>>(new Set());
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);

  useEffect(() => {
    fetchPublications();
  }, [currentPage, filter]);

  const fetchPublications = async (): Promise<void> => {
    try {
      setLoading(true);
      setErrorMessage("");

      let endpoint = `publications/?page=${currentPage}&size=10&sortDir=desc`;
      if (filter !== "TOUS") {
        endpoint += `&status=${filter}`;
      }

      const data = await getData<any>(endpoint);

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
      console.error("❌ Error fetching publications:", error);
      let errorMsg = "Erreur lors du chargement des publications";

      if (error instanceof Error) {
        if (error.message.includes("Network")) {
          errorMsg = "Erreur de connexion. Vérifiez votre connexion internet.";
        } else if (error.message.includes("404")) {
          errorMsg = "Endpoint non trouvé. Vérifiez l'URL de l'API.";
        } else if (
          error.message.includes("403") ||
          error.message.includes("401")
        ) {
          errorMsg = "Accès non autorisé. Vérifiez vos permissions.";
        } else if (error.message.includes("500")) {
          errorMsg = "Erreur serveur. Contactez l'administrateur.";
        }
      }

      setErrorMessage(errorMsg);
      setPublications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentChange = (id: number, comment: string): void => {
    setComments((prev) => ({
      ...prev,
      [id]: comment,
    }));
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
      const comment = comments[publicationId]?.trim() || "";
      const endpoint = `publications/${publicationId}/${action}`;

      const response = await patchData<Publication>(endpoint, {
        comment: comment || undefined,
      });

      if (response) {
        const actualStatus =
          response.status || (action === "valider" ? "VALIDEE" : "REFUSEE");
        setPublications((prev) =>
          prev.map((pub) =>
            pub.id === publicationId
              ? {
                  ...pub,
                  status: actualStatus,
                  validateurId: response.validateurId || 1,
                  updatedAt: response.updatedAt || new Date().toISOString(),
                }
              : pub
          )
        );
        setSuccessMessage(
          `Publication ${
            actualStatus === "VALIDEE" ? "validée" : "refusée"
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

      setComments((prev) => {
        const newComments = { ...prev };
        delete newComments[publicationId];
        return newComments;
      });

      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      console.error(`❌ Error ${action}ing publication:`, error);
      let errorMsg = `Erreur lors de la ${
        action === "valider" ? "validation" : "refus"
      } de la publication`;

      if (error instanceof Error) {
        if (error.message.includes("Network")) {
          errorMsg = "Erreur de connexion lors de la validation";
        } else if (error.message.includes("404")) {
          errorMsg = "Publication non trouvée";
        } else if (
          error.message.includes("403") ||
          error.message.includes("401")
        ) {
          errorMsg = "Vous n'avez pas les permissions pour cette action";
        } else if (error.message.includes("400")) {
          errorMsg = "Données de validation invalides";
        } else if (error.message.includes("409")) {
          errorMsg = "Cette publication a déjà été traitée";
        } else if (error.message.includes("500")) {
          errorMsg = "Erreur serveur lors de la validation";
        }
      }

      setErrorMessage(errorMsg);
      setTimeout(() => setErrorMessage(""), 8000);
    } finally {
      setProcessingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(publicationId);
        return newSet;
      });
    }
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return "Date non spécifiée";

    try {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
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
      case "DECLAREE":
      case "EN_ATTENTE":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case "VALIDEE":
        return "Validée";
      case "REFUSEE":
        return "Refusée";
      case "DECLAREE":
        return "Déclarée";
      case "EN_ATTENTE":
        return "En attente";
      default:
        return status;
    }
  };

  const filteredPublications = publications;
  const declareeCount = publications.filter(
    (pub) => pub.status === "DECLAREE"
  ).length;
  const pendingCount = publications.filter(
    (pub) => pub.status === "EN_ATTENTE"
  ).length;
  const validatedCount = publications.filter(
    (pub) => pub.status === "VALIDEE"
  ).length;
  const rejectedCount = publications.filter(
    (pub) => pub.status === "REFUSEE"
  ).length;
  const awaitingValidationCount = declareeCount + pendingCount;

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

  if (errorMessage && publications.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              Erreur de chargement
            </h3>
            <p className="text-red-600 mb-4">{errorMessage}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Recharger la page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Validation des Publications
          </h1>
          <p className="text-gray-600">
            Validez ou refusez les publications soumises par les doctorants.
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-yellow-600 font-bold">⏳</span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-yellow-800">
                    À valider
                  </p>
                  <p className="text-2xl font-bold text-yellow-900">
                    {awaitingValidationCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">Validées</p>
                  <p className="text-2xl font-bold text-green-900">
                    {validatedCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold">✗</span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">Refusées</p>
                  <p className="text-2xl font-bold text-red-900">
                    {rejectedCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">📊</span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-800">Total</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {publications.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { key: "TOUS", label: "Toutes", count: publications.length },
              { key: "DECLAREE", label: "Déclarées", count: declareeCount },
              { key: "EN_ATTENTE", label: "En attente", count: pendingCount },
              { key: "VALIDEE", label: "Validées", count: validatedCount },
              { key: "REFUSEE", label: "Refusées", count: rejectedCount },
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  filter === key
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {label}
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    filter === key ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  {count}
                </span>
              </button>
            ))}
          </div>

          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded flex items-center">
              <span className="mr-2">✅</span>
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center">
              <span className="mr-2">⚠️</span>
              {errorMessage}
            </div>
          )}

          {filteredPublications.length > 0 ? (
            <div className="space-y-4">
              {filteredPublications.map((publication) => (
                <div
                  key={publication.id}
                  className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {publication.titre}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            publication.status
                          )}`}
                        >
                          {getStatusLabel(publication.status)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>
                          <strong>Journal:</strong> {publication.journal}
                        </p>
                        <p>
                          <strong>Auteur principal ID:</strong>{" "}
                          {publication.auteurId}
                        </p>
                        {publication.autresAuteurs && (
                          <p>
                            <strong>Autres auteurs:</strong>{" "}
                            {publication.autresAuteurs}
                          </p>
                        )}
                        <p>
                          <strong>Date de publication:</strong>{" "}
                          {formatDate(publication.datePublication)}
                        </p>
                        {publication.prixIntitule && (
                          <p>
                            <strong>Prix:</strong> {publication.prixIntitule}
                          </p>
                        )}
                        {publication.participant && (
                          <p>
                            <strong>Participant:</strong>{" "}
                            {publication.participant.nom}{" "}
                            {publication.participant.prenom}
                          </p>
                        )}
                        <p>
                          <strong>Soumis le:</strong>{" "}
                          {formatDate(publication.createdAt)}
                        </p>
                        {publication.updatedAt !== publication.createdAt && (
                          <p>
                            <strong>Mis à jour le:</strong>{" "}
                            {formatDate(publication.updatedAt)}
                          </p>
                        )}
                      </div>
                    </div>
                    {publication.justificatif && (
                      <div className="ml-4">
                        <a
                          href={publication.justificatif}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <span className="mr-1">📄</span>
                          Voir le justificatif
                        </a>
                      </div>
                    )}
                  </div>

                  {(publication.status === "DECLAREE" ||
                    publication.status === "EN_ATTENTE") && (
                    <div className="border-t border-gray-200 pt-4">
                      <div className="mb-3">
                        <label
                          htmlFor={`comment-${publication.id}`}
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Commentaire (optionnel):
                        </label>
                        <textarea
                          id={`comment-${publication.id}`}
                          value={comments[publication.id] || ""}
                          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                            handleCommentChange(publication.id, e.target.value)
                          }
                          placeholder="Ajoutez un commentaire pour expliquer votre décision..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          rows={3}
                          disabled={processingIds.has(publication.id)}
                        />
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() =>
                            handleValidation(publication.id, "valider")
                          }
                          disabled={processingIds.has(publication.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          {processingIds.has(publication.id) ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              Validation...
                            </>
                          ) : (
                            <>
                              <span>✓</span>
                              Valider
                            </>
                          )}
                        </button>

                        <button
                          onClick={() =>
                            handleValidation(publication.id, "refuser")
                          }
                          disabled={processingIds.has(publication.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          {processingIds.has(publication.id) ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              Refus...
                            </>
                          ) : (
                            <>
                              <span>✗</span>
                              Refuser
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {(publication.status === "VALIDEE" ||
                    publication.status === "REFUSEE") && (
                    <div className="border-t border-gray-200 pt-4">
                      <div className="text-sm text-gray-600">
                        <p>
                          <strong>
                            {publication.status === "VALIDEE"
                              ? "Validé"
                              : "Refusé"}{" "}
                            le:
                          </strong>{" "}
                          {formatDate(publication.updatedAt)}
                        </p>
                        {publication.validateurId && (
                          <p>
                            <strong>Validateur ID:</strong>{" "}
                            {publication.validateurId}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                Aucune publication trouvée
              </h3>
              <p className="text-gray-600">
                {filter === "TOUS"
                  ? "Aucune publication n'a été soumise."
                  : `Aucune publication avec le statut "${getStatusLabel(
                      filter
                    )}" trouvée.`}
              </p>
              {filter !== "TOUS" && (
                <button
                  onClick={() => setFilter("TOUS")}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Voir toutes les publications
                </button>
              )}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-6 flex justify-center items-center space-x-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 0}
                className={`px-4 py-2 rounded-lg ${
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
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === totalPages - 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Suivant
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicationsValidation;
