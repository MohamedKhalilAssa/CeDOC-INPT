import React, { useState, useEffect, ChangeEvent } from "react";
import { getData, patchData } from "@/Helpers/CRUDFunctions";

interface ConfParticipation {
  id: number;
  titre: string;
  conference: string;
  date: string;
  lieu: string;
  autresParticipants: string;
  status: string;
  participantId: number;
  validateurId?: number;
  createdAt: string;
  updatedAt: string;
  // Additional fields that might be useful for validation
  participant?: {
    nom: string;
    prenom: string;
    email: string;
  };
}

interface ValidationComment {
  [key: number]: string;
}

interface ValidationRequest {
  status: "VALIDEE" | "REFUSEE";
  comment?: string;
}

const DirectionCedocValidation: React.FC = () => {
  const [conferences, setConferences] = useState<ConfParticipation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("DECLAREE");
  const [comments, setComments] = useState<ValidationComment>({});
  const [validatingIds, setValidatingIds] = useState<Set<number>>(new Set());
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Fetch conferences from backend
  useEffect(() => {
    const fetchConferences = async (): Promise<void> => {
      try {
        setLoading(true);
        setErrorMessage(""); // Clear previous errors
        console.log(
          "🔍 Fetching conferences for validation from /confparticipation/"
        );

        const data = await getData<any>("/confparticipation/");
        console.log("📦 Received data:", data);

        // Handle paginated response with more robust checking
        let conferencesArray: ConfParticipation[] = [];
        if (data) {
          if (Array.isArray(data)) {
            conferencesArray = data;
          } else if (data.content && Array.isArray(data.content)) {
            conferencesArray = data.content;
          } else if (data.data && Array.isArray(data.data)) {
            conferencesArray = data.data;
          } else if (
            typeof data === "object" &&
            data.results &&
            Array.isArray(data.results)
          ) {
            conferencesArray = data.results;
          }
        }

        // Validate that we have proper conference objects
        const validConferences = conferencesArray.filter(
          (conf) =>
            conf &&
            typeof conf === "object" &&
            conf.id &&
            conf.titre &&
            conf.status
        );

        setConferences(validConferences);
        console.log("📊 Valid conferences loaded:", validConferences.length);
        console.log(
          "📊 Status distribution:",
          validConferences.reduce((acc, conf) => {
            acc[conf.status] = (acc[conf.status] || 0) + 1;
            return acc;
          }, {} as Record<string, number>)
        );
      } catch (error) {
        console.error("❌ Error fetching conferences:", error);
        let errorMsg = "Erreur lors du chargement des conférences";

        // More specific error messages
        if (error instanceof Error) {
          if (error.message.includes("Network")) {
            errorMsg =
              "Erreur de connexion. Vérifiez votre connexion internet.";
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
        setConferences([]);
      } finally {
        setLoading(false);
      }
    };

    fetchConferences();
  }, []);

  const handleCommentChange = (id: number, comment: string): void => {
    setComments((prev) => ({
      ...prev,
      [id]: comment,
    }));
  };

  const validateConference = async (
    id: number,
    status: "VALIDEE" | "REFUSEE"
  ): Promise<void> => {
    // Validate input
    if (!id || (status !== "VALIDEE" && status !== "REFUSEE")) {
      setErrorMessage("Paramètres de validation invalides");
      return;
    }

    setValidatingIds((prev) => new Set(prev).add(id));
    setErrorMessage(""); // Clear previous errors
    setSuccessMessage(""); // Clear previous success messages

    try {
      const comment = comments[id]?.trim() || "";

      console.log(
        `🔄 ${status === "VALIDEE" ? "Validating" : "Rejecting"} conference:`,
        id
      );
      console.log(`📝 Comment:`, comment);

      // Prepare validation request
      const validationRequest: ValidationRequest = {
        status: status,
        comment: comment || undefined, // Only include comment if not empty
      };

      const response = await patchData<ConfParticipation>(
        `/confparticipation/${id}/valider`,
        validationRequest
      );

      console.log("🔄 Validation response:", response);

      // Handle successful response
      if (response) {
        // Update local state with the response
        setConferences((prev) =>
          prev.map((conf) =>
            conf.id === id
              ? {
                  ...conf,
                  status: status,
                  validateurId: response.validateurId || 1,
                  updatedAt: response.updatedAt || new Date().toISOString(),
                }
              : conf
          )
        );

        setSuccessMessage(
          `Participation ${
            status === "VALIDEE" ? "validée" : "refusée"
          } avec succès!`
        );
      } else {
        // If no response but no error, assume success and refetch
        console.log("🔄 No response object, refetching data...");
        await refetchConferences();
        setSuccessMessage(
          `Participation ${
            status === "VALIDEE" ? "validée" : "refusée"
          } avec succès!`
        );
      }

      // Clear the comment for this conference
      setComments((prev) => {
        const newComments = { ...prev };
        delete newComments[id];
        return newComments;
      });

      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      console.error("❌ Error validating conference:", error);

      let errorMsg = `Erreur lors de la ${
        status === "VALIDEE" ? "validation" : "refus"
      } de la participation`;

      // More specific error handling
      if (error instanceof Error) {
        if (error.message.includes("Network")) {
          errorMsg = "Erreur de connexion lors de la validation";
        } else if (error.message.includes("404")) {
          errorMsg = "Participation non trouvée";
        } else if (
          error.message.includes("403") ||
          error.message.includes("401")
        ) {
          errorMsg = "Vous n'avez pas les permissions pour cette action";
        } else if (error.message.includes("400")) {
          errorMsg = "Données de validation invalides";
        } else if (error.message.includes("409")) {
          errorMsg = "Cette participation a déjà été traitée";
        } else if (error.message.includes("500")) {
          errorMsg = "Erreur serveur lors de la validation";
        }
      }

      setErrorMessage(errorMsg);
      setTimeout(() => setErrorMessage(""), 8000);
    } finally {
      setValidatingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  // Helper function to refetch conferences
  const refetchConferences = async (): Promise<void> => {
    try {
      const updatedData = await getData<any>("/confparticipation/");
      let conferencesArray: ConfParticipation[] = [];

      if (updatedData) {
        if (Array.isArray(updatedData)) {
          conferencesArray = updatedData;
        } else if (updatedData.content && Array.isArray(updatedData.content)) {
          conferencesArray = updatedData.content;
        } else if (updatedData.data && Array.isArray(updatedData.data)) {
          conferencesArray = updatedData.data;
        }
      }

      const validConferences = conferencesArray.filter(
        (conf) =>
          conf &&
          typeof conf === "object" &&
          conf.id &&
          conf.titre &&
          conf.status
      );

      setConferences(validConferences);
    } catch (error) {
      console.error("❌ Error refetching conferences:", error);
    }
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return "Date non spécifiée";

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

  const filteredConferences = conferences.filter((conf) => {
    if (filter === "TOUS") return true;
    return conf.status === filter;
  });

  const declareeCount = conferences.filter(
    (conf) => conf.status === "DECLAREE"
  ).length;
  const pendingCount = conferences.filter(
    (conf) => conf.status === "EN_ATTENTE"
  ).length;
  const validatedCount = conferences.filter(
    (conf) => conf.status === "VALIDEE"
  ).length;
  const rejectedCount = conferences.filter(
    (conf) => conf.status === "REFUSEE"
  ).length;
  const awaitingValidationCount = declareeCount + pendingCount;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-600">
            Chargement des participations...
          </span>
        </div>
      </div>
    );
  }

  // Show error state if we have an error and no conferences
  if (errorMessage && conferences.length === 0) {
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
            Validation des Participations aux Conférences
          </h1>
          <p className="text-gray-600">
            Validez ou refusez les participations aux conférences soumises par
            les doctorants.
          </p>
        </div>

        <div className="p-6">
          {/* Statistics Cards */}
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
                    {conferences.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { key: "TOUS", label: "Toutes", count: conferences.length },
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

          {/* Success/Error Messages */}
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

          {/* Conferences List */}
          {filteredConferences.length > 0 ? (
            <div className="space-y-4">
              {filteredConferences.map((conference) => (
                <div
                  key={conference.id}
                  className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {conference.titre}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            conference.status
                          )}`}
                        >
                          {getStatusLabel(conference.status)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>
                          <strong>Conférence:</strong> {conference.conference}
                        </p>
                        <p>
                          <strong>Date:</strong> {formatDate(conference.date)}
                        </p>
                        <p>
                          <strong>Lieu:</strong> {conference.lieu}
                        </p>
                        {conference.autresParticipants && (
                          <p>
                            <strong>Autres participants:</strong>{" "}
                            {conference.autresParticipants}
                          </p>
                        )}
                        {conference.participant && (
                          <p>
                            <strong>Participant:</strong>{" "}
                            {conference.participant.nom}{" "}
                            {conference.participant.prenom}
                          </p>
                        )}
                        <p>
                          <strong>Soumis le:</strong>{" "}
                          {formatDate(conference.createdAt)}
                        </p>
                        {conference.updatedAt !== conference.createdAt && (
                          <p>
                            <strong>Mis à jour le:</strong>{" "}
                            {formatDate(conference.updatedAt)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Validation Actions - Only show for pending conferences */}
                  {(conference.status === "DECLAREE" ||
                    conference.status === "EN_ATTENTE") && (
                    <div className="border-t border-gray-200 pt-4">
                      <div className="mb-3">
                        <label
                          htmlFor={`comment-${conference.id}`}
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Commentaire (optionnel):
                        </label>
                        <textarea
                          id={`comment-${conference.id}`}
                          value={comments[conference.id] || ""}
                          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                            handleCommentChange(conference.id, e.target.value)
                          }
                          placeholder="Ajoutez un commentaire pour expliquer votre décision..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          rows={3}
                          disabled={validatingIds.has(conference.id)}
                        />
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() =>
                            validateConference(conference.id, "VALIDEE")
                          }
                          disabled={validatingIds.has(conference.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          {validatingIds.has(conference.id) ? (
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
                            validateConference(conference.id, "REFUSEE")
                          }
                          disabled={validatingIds.has(conference.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          {validatingIds.has(conference.id) ? (
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

                  {/* Show validation info for processed conferences */}
                  {(conference.status === "VALIDEE" ||
                    conference.status === "REFUSEE") && (
                    <div className="border-t border-gray-200 pt-4">
                      <div className="text-sm text-gray-600">
                        <p>
                          <strong>
                            {conference.status === "VALIDEE"
                              ? "Validé"
                              : "Refusé"}{" "}
                            le:
                          </strong>{" "}
                          {formatDate(conference.updatedAt)}
                        </p>
                        {conference.validateurId && (
                          <p>
                            <strong>Validateur ID:</strong>{" "}
                            {conference.validateurId}
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
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                Aucune participation trouvée
              </h3>
              <p className="text-gray-600">
                {filter === "TOUS"
                  ? "Aucune participation aux conférences n'a été soumise."
                  : `Aucune participation avec le statut "${getStatusLabel(
                      filter
                    )}" trouvée.`}
              </p>
              {filter !== "TOUS" && (
                <button
                  onClick={() => setFilter("TOUS")}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Voir toutes les participations
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DirectionCedocValidation;
