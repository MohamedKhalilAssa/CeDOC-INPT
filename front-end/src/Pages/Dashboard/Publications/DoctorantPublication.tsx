import React, { useState, useEffect, ChangeEvent } from "react";
import { getData, postData, deleteData } from "@/Helpers/CRUDFunctions";

const debugPublication = (pub: Publication) => {
  console.log("=== Publication Debug ===");
  console.log("Full object:", pub);
  console.log("titre:", pub.titre, "type:", typeof pub.titre);
  console.log("resume:", pub.resume, "type:", typeof pub.resume);
  console.log("contenu:", pub.contenu, "type:", typeof pub.contenu);
  console.log("motsCles:", pub.motsCles, "type:", typeof pub.motsCles);
  console.log("journal:", pub.journal, "type:", typeof pub.journal);
  console.log("=========================");
};

interface Publication {
  id: number;
  titre: string;
  resume: string;
  motsCles: string;
  contenu: string;
  journal: string;
  datePublication: string;
  prixIntitule?: string;
  status: string;
  auteurId: number;
  coAuteursIds: number[];
  createdAt: string;
  updatedAt: string;
}

interface NewPublication {
  titre: string;
  resume: string;
  motsCles: string;
  contenu: string;
  journal: string;
  datePublication: string;
  prixIntitule?: string;
  coAuteursIds: number[];
}

interface Errors {
  [key: string]: string | undefined;
  titre?: string;
  resume?: string;
  motsCles?: string;
  contenu?: string;
  datePublication?: string;
  submit?: string;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          Something went wrong. Please refresh the page.
        </div>
      );
    }
    return this.props.children;
  }
}

const DoctorantPublications: React.FC = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [selectedPublication, setSelectedPublication] =
    useState<Publication | null>(null);
  const [showPublicationModal, setShowPublicationModal] =
    useState<boolean>(false);
  const [newPublication, setNewPublication] = useState<NewPublication>({
    titre: "",
    resume: "",
    motsCles: "",
    contenu: "",
    journal: "",
    datePublication: "",
    coAuteursIds: [],
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Improved function to safely display text values
  const safeDisplayText = (
    text: string | null | undefined,
    fallback: string = "Non spécifié"
  ): string => {
    if (text === null || text === undefined) {
      return fallback;
    }

    const stringValue = String(text).trim();
    if (
      stringValue === "" ||
      stringValue === "null" ||
      stringValue === "undefined" ||
      stringValue === "None"
    ) {
      return fallback;
    }

    return stringValue;
  };

  // Function to check if content has meaningful value
  const hasContent = (text: string | null | undefined): boolean => {
    if (!text) return false;
    const stringValue = String(text).trim();
    return (
      stringValue !== "" &&
      stringValue !== "null" &&
      stringValue !== "undefined" &&
      stringValue !== "None"
    );
  };

  useEffect(() => {
    const fetchPublications = async (): Promise<void> => {
      try {
        setLoading(true);
        const data = await getData<any>("/publications/");

        let publicationsArray: Publication[] = [];
        if (data) {
          if (Array.isArray(data)) {
            publicationsArray = data;
          } else if (Array.isArray(data?.content)) {
            publicationsArray = data.content;
          } else if (Array.isArray(data?.data)) {
            publicationsArray = data.data;
          } else if (Array.isArray(data?.publications)) {
            publicationsArray = data.publications;
          } else if (data?.results && Array.isArray(data.results)) {
            publicationsArray = data.results;
          } else {
            console.warn("Unexpected data format:", data);
            publicationsArray = [];
          }
        }

        setPublications(publicationsArray);
      } catch (error) {
        console.error("Error fetching publications:", error);
        setErrors({ submit: "Erreur lors du chargement des publications" });
        setPublications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setNewPublication((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validate = (): Errors => {
    const newErrors: Errors = {};
    if (!newPublication.titre.trim())
      newErrors.titre = "Le titre de la publication est requis";
    if (!newPublication.resume.trim())
      newErrors.resume = "Le résumé est requis";
    if (!newPublication.motsCles.trim())
      newErrors.motsCles = "Les mots-clés sont requis";
    if (!newPublication.contenu.trim())
      newErrors.contenu = "Le contenu est requis";

    if (newPublication.datePublication) {
      const dateObj = new Date(newPublication.datePublication);
      if (isNaN(dateObj.getTime())) {
        newErrors.datePublication = "Format de date invalide";
      }
    }

    return newErrors;
  };

  const handleSubmit = async (): Promise<void> => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const publicationData = {
        titre: newPublication.titre.trim(),
        resume: newPublication.resume.trim(),
        motsCles: newPublication.motsCles.trim(),
        contenu: newPublication.contenu.trim(),
        journal: newPublication.journal.trim() || "Non spécifié",
        datePublication: newPublication.datePublication
          ? new Date(newPublication.datePublication).toISOString()
          : new Date().toISOString(),
        prixIntitule: newPublication.prixIntitule?.trim() || undefined,
        coAuteursIds: newPublication.coAuteursIds || [],
      };

      console.log("Sending publication data:", publicationData);

      const response = await postData<Publication>(
        "/publications/",
        publicationData
      );

      console.log("Response from backend:", response);

      if (response) {
        setPublications((prev) => [...prev, response]);
        setSuccessMessage("Publication ajoutée avec succès!");
      } else {
        // Fallback to refetching all publications
        const updatedData = await getData<any>("/publications/");
        console.log("Refetched data after empty response:", updatedData);

        if (updatedData) {
          let publicationsArray: Publication[] = [];
          if (Array.isArray(updatedData)) {
            publicationsArray = updatedData;
          } else if (Array.isArray(updatedData?.content)) {
            publicationsArray = updatedData.content;
          } else if (Array.isArray(updatedData?.data)) {
            publicationsArray = updatedData.data;
          } else if (Array.isArray(updatedData?.publications)) {
            publicationsArray = updatedData.publications;
          } else if (
            updatedData?.results &&
            Array.isArray(updatedData.results)
          ) {
            publicationsArray = updatedData.results;
          }
          setPublications(publicationsArray);
          setSuccessMessage("Publication ajoutée avec succès!");
        } else {
          setErrors({
            submit:
              "Publication ajoutée mais échec de la mise à jour de la liste.",
          });
        }
      }

      resetForm();
      setShowAddForm(false);
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      console.error("Error adding publication:", error);
      let errorMessage = "Une erreur s'est produite lors de l'ajout";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "object" && error !== null) {
        if ("errors" in error) {
          const apiErrors = (
            error as { errors: Record<string, { message: string }> }
          ).errors;
          const errorList = Object.values(apiErrors)
            .map((err) => err.message)
            .join(", ");
          errorMessage = errorList;
        } else if ("message" in error) {
          errorMessage = (error as { message: string }).message;
        }
      }

      setErrors({ submit: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = (): void => {
    setNewPublication({
      titre: "",
      resume: "",
      motsCles: "",
      contenu: "",
      journal: "",
      datePublication: "",
      coAuteursIds: [],
    });
    setErrors({});
  };

  const removePublication = async (id: number): Promise<void> => {
    if (
      !window.confirm("Êtes-vous sûr de vouloir supprimer cette publication?")
    ) {
      return;
    }

    try {
      await deleteData(`/publications/${id}`);
      setPublications((prev) => prev.filter((pub) => pub.id !== id));
      setSuccessMessage("Publication supprimée avec succès!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error removing publication:", error);
      setErrors({
        submit: "Erreur lors de la suppression de la publication",
      });
    }
  };

  const openPublicationModal = (publication: Publication): void => {
    setSelectedPublication(publication);
    setShowPublicationModal(true);
  };

  const closePublicationModal = (): void => {
    setSelectedPublication(null);
    setShowPublicationModal(false);
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "Non spécifiée";
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
    <ErrorBoundary>
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Mes Publications Scientifiques
            </h1>
            <p className="text-gray-600">
              Gérez vos publications scientifiques et articles de recherche.
            </p>
          </div>

          <div className="p-6">
            <button
              onClick={() => {
                setShowAddForm(!showAddForm);
                if (showAddForm) resetForm();
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <span className="text-lg">➕</span>
              {showAddForm ? "Annuler" : "Ajouter une publication"}
            </button>

            {successMessage && (
              <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                {successMessage}
              </div>
            )}

            {errors.submit && (
              <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {errors.submit}
              </div>
            )}

            {publications.length > 0 ? (
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Publications enregistrées ({publications.length})
                </h2>

                {publications.map((publication) => {
                  console.log("Rendering publication:", publication);

                  return (
                    <div
                      key={publication.id}
                      className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-1">
                            {safeDisplayText(
                              publication.titre,
                              "Titre non spécifié"
                            )}
                          </h3>
                          <p className="text-gray-600 mb-1">
                            {hasContent(publication.resume)
                              ? safeDisplayText(publication.resume).length > 150
                                ? safeDisplayText(publication.resume).substring(
                                    0,
                                    150
                                  ) + "..."
                                : safeDisplayText(publication.resume)
                              : "Aucun résumé"}
                          </p>
                          <p className="text-gray-700 mb-1">
                            Journal: {safeDisplayText(publication.journal)}
                          </p>
                          <p className="text-gray-700 mb-2">
                            Date: {formatDate(publication.datePublication)}
                          </p>
                          <p className="text-sm text-gray-600 mb-1">
                            Mots-clés:{" "}
                            {safeDisplayText(
                              publication.motsCles,
                              "Aucun mot-clé"
                            )}
                          </p>
                          {hasContent(publication.prixIntitule) && (
                            <p className="text-sm text-gray-600 mb-1">
                              Prix: {safeDisplayText(publication.prixIntitule)}
                            </p>
                          )}
                          <p className="text-sm text-gray-500">
                            Statut:{" "}
                            <span
                              className={`font-medium ${
                                publication.status === "PUBLIEE"
                                  ? "text-green-600"
                                  : publication.status === "REFUSEE"
                                  ? "text-red-600"
                                  : "text-yellow-600"
                              }`}
                            >
                              {safeDisplayText(
                                publication.status,
                                "Non défini"
                              )}
                            </span>
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              debugPublication(publication);
                              openPublicationModal(publication);
                            }}
                            className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded"
                            aria-label={`Voir la publication ${publication.titre}`}
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => removePublication(publication.id)}
                            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded"
                            aria-label={`Supprimer la publication ${publication.titre}`}
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  Aucune publication enregistrée
                </h3>
                <p className="text-gray-600">
                  Commencez par ajouter votre première publication.
                </p>
              </div>
            )}

            {showAddForm && (
              <div className="mt-6 border border-gray-200 rounded-lg">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Ajouter une nouvelle publication
                  </h2>
                  <button
                    onClick={() => {
                      setShowAddForm(false);
                      resetForm();
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                    <h3 className="flex items-center font-medium text-blue-800 mb-4">
                      <span className="mr-2">📝</span>
                      Informations de Base
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="titre"
                          className="block mb-1 font-medium text-gray-700"
                        >
                          Titre de la publication*
                        </label>
                        <input
                          type="text"
                          id="titre"
                          name="titre"
                          value={newPublication.titre}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded p-2"
                          placeholder="Titre de votre publication"
                        />
                        {errors.titre && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.titre}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="datePublication"
                          className="block mb-1 font-medium text-gray-700"
                        >
                          Date de Publication
                        </label>
                        <input
                          type="date"
                          id="datePublication"
                          name="datePublication"
                          value={newPublication.datePublication}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded p-2"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Si non spécifiée, la date actuelle sera utilisée
                        </p>
                        {errors.datePublication && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.datePublication}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="motsCles"
                          className="block mb-1 font-medium text-gray-700"
                        >
                          Mots-clés*
                        </label>
                        <input
                          type="text"
                          id="motsCles"
                          name="motsCles"
                          value={newPublication.motsCles}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded p-2"
                          placeholder="Séparés par des virgules"
                        />
                        {errors.motsCles && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.motsCles}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="resume"
                          className="block mb-1 font-medium text-gray-700"
                        >
                          Résumé*
                        </label>
                        <textarea
                          id="resume"
                          name="resume"
                          value={newPublication.resume}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded p-2"
                          rows={4}
                          placeholder="Résumé de votre publication"
                        />
                        {errors.resume && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.resume}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="contenu"
                          className="block mb-1 font-medium text-gray-700"
                        >
                          Contenu*
                        </label>
                        <textarea
                          id="contenu"
                          name="contenu"
                          value={newPublication.contenu}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded p-2"
                          rows={6}
                          placeholder="Contenu complet de votre publication"
                        />
                        {errors.contenu && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.contenu}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
                    <h3 className="flex items-center font-medium text-purple-800 mb-4">
                      <span className="mr-2">📰</span>
                      Information du Journal
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="journal"
                          className="block mb-1 font-medium text-gray-700"
                        >
                          Nom du Journal
                        </label>
                        <input
                          type="text"
                          id="journal"
                          name="journal"
                          value={newPublication.journal}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded p-2"
                          placeholder="Nom du journal de publication (optionnel)"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                    <h3 className="flex items-center font-medium text-yellow-800 mb-4">
                      <span className="mr-2">🏆</span>
                      Prix et Distinctions
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="prixIntitule"
                          className="block mb-1 font-medium text-gray-700"
                        >
                          Intitulé du Prix
                        </label>
                        <input
                          type="text"
                          id="prixIntitule"
                          name="prixIntitule"
                          value={newPublication.prixIntitule || ""}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded p-2"
                          placeholder="Nom du prix ou distinction reçue (optionnel)"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      onClick={() => {
                        setShowAddForm(false);
                        resetForm();
                      }}
                      className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className={`px-4 py-2 rounded text-white ${
                        isSubmitting
                          ? "bg-blue-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                      aria-busy={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                          En cours...
                        </span>
                      ) : (
                        "Publier"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {showPublicationModal && selectedPublication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">
                  {safeDisplayText(
                    selectedPublication.titre,
                    "Titre non spécifié"
                  )}
                </h2>
                <button
                  onClick={closePublicationModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">
                      Journal
                    </h3>
                    <p className="text-gray-600">
                      {safeDisplayText(selectedPublication.journal)}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">
                      Date de Publication
                    </h3>
                    <p className="text-gray-600">
                      {formatDate(selectedPublication.datePublication)}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">Statut</h3>
                    <span
                      className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                        selectedPublication.status === "PUBLIEE"
                          ? "bg-green-100 text-green-800"
                          : selectedPublication.status === "REFUSEE"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {safeDisplayText(
                        selectedPublication.status,
                        "Non défini"
                      )}
                    </span>
                  </div>
                  {hasContent(selectedPublication.prixIntitule) && (
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-1">Prix</h3>
                      <p className="text-gray-600">
                        {safeDisplayText(selectedPublication.prixIntitule)}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Mots-clés
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {safeDisplayText(
                      selectedPublication.motsCles,
                      "Aucun mot-clé"
                    )
                      .split(",")
                      .map((keyword, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                        >
                          {keyword.trim()}
                        </span>
                      ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Résumé</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">
                      {safeDisplayText(
                        selectedPublication.resume,
                        "Aucun résumé disponible"
                      )}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Contenu</h3>
                  <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                    <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {safeDisplayText(
                        selectedPublication.contenu,
                        "Aucun contenu disponible"
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
                  <div>
                    <span className="font-medium">Créé le:</span>{" "}
                    {formatDate(selectedPublication.createdAt)}
                  </div>
                  <div>
                    <span className="font-medium">Modifié le:</span>{" "}
                    {formatDate(selectedPublication.updatedAt)}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end">
                <button
                  onClick={closePublicationModal}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default DoctorantPublications;
