import React, { useState, useEffect, ChangeEvent } from "react";
import {
  getData,
  postData,
  putData,
  deleteData,
} from "@/Helpers/CRUDFunctions";

const debugPublication = (pub: Publication) => {
  console.log("=== Publication Debug ===");
  console.log("Full object:", pub);
  console.log("titre:", pub.titre, "type:", typeof pub.titre);
  console.log("journal:", pub.journal, "type:", typeof pub.journal);
  console.log("link:", pub.link, "type:", typeof pub.link);
  console.log("=========================");
};

interface Publication {
  id: number;
  titre: string;
  journal: string;
  datePublication: string;
  prixIntitule?: string;
  status: string;
  auteurId: number;
  coAuteurs: string[]; // Changed from coAuteursIds: number[]
  createdAt: string;
  updatedAt: string;
  link: string;
}

interface NewPublication {
  titre: string;
  journal: string;
  datePublication: string;
  prixIntitule?: string;
  coAuteurs: string[]; // Changed from coAuteursIds: number[]
  link: string;
}

interface Errors {
  [key: string]: string | undefined;
  titre?: string;
  journal?: string;
  datePublication?: string;
  link?: string;
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
  const [editingPublication, setEditingPublication] =
    useState<Publication | null>(null);
  const [newPublication, setNewPublication] = useState<NewPublication>({
    titre: "",
    journal: "",
    datePublication: "",
    coAuteurs: [],
    link: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

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

    // Special handling for coAuteurs
    if (name === "coAuteurs") {
      const names = value
        .split(",")
        .map((name) => name.trim())
        .filter((name) => name.length > 0); // Filter out empty names

      if (editingPublication) {
        setEditingPublication((prev) => ({ ...prev!, coAuteurs: names }));
      } else {
        setNewPublication((prev) => ({ ...prev, coAuteurs: names }));
      }
    } else {
      // Standard handling for all other fields
      if (editingPublication) {
        setEditingPublication((prev) => ({
          ...prev!,
          [name]: value,
        }));
      } else {
        setNewPublication((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    }

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validate = (publication: NewPublication | Publication): Errors => {
    const newErrors: Errors = {};
    if (!publication.titre.trim())
      newErrors.titre = "Le titre de la publication est requis";
    if (!publication.journal.trim())
      newErrors.journal = "Le nom du journal est requis";
    if (!publication.link.trim())
      newErrors.link = "Le lien justificatif est requis";

    if (publication.datePublication) {
      const dateObj = new Date(publication.datePublication);
      if (isNaN(dateObj.getTime())) {
        newErrors.datePublication = "Format de date invalide";
      }
    }

    return newErrors;
  };

  const handleSubmit = async (): Promise<void> => {
    const publicationToProcess = editingPublication || newPublication;
    const validationErrors = validate(publicationToProcess);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      let response;
      if (editingPublication) {
        // For editing, merge the changes into the full object
        const updatedPublicationData = {
          ...editingPublication, // Keep all original fields (id, status, etc.)
          titre: editingPublication.titre.trim(),
          journal: editingPublication.journal.trim(),
          datePublication: editingPublication.datePublication
            ? new Date(editingPublication.datePublication).toISOString()
            : new Date().toISOString(),
          prixIntitule: editingPublication.prixIntitule?.trim() || undefined,
          coAuteursIds: editingPublication.coAuteurs || [],
          link: editingPublication.link.trim(),
        };

        console.log(
          "Sending updated publication data:",
          updatedPublicationData
        );
        response = await putData<Publication>(
          `/publications/${editingPublication.id}`,
          updatedPublicationData
        );
      } else {
        // For adding, create a new object from the form state
        const newPublicationData = {
          titre: newPublication.titre.trim(),
          journal: newPublication.journal.trim(),
          datePublication: newPublication.datePublication
            ? new Date(newPublication.datePublication).toISOString()
            : new Date().toISOString(),
          prixIntitule: newPublication.prixIntitule?.trim() || undefined,
          coAuteursIds: newPublication.coAuteurs || [],
          link: newPublication.link.trim(),
        };

        console.log("Sending new publication data:", newPublicationData);
        response = await postData<Publication>(
          "/publications/",
          newPublicationData
        );
      }

      console.log("Response from backend:", response);

      // This logic for handling the response and refetching is robust and can remain the same
      if (response) {
        if (editingPublication) {
          setPublications((prev) =>
            prev.map((pub) =>
              pub.id === editingPublication.id ? response : pub
            )
          );
          setSuccessMessage("Publication modifiée avec succès!");
        } else {
          setPublications((prev) => [...prev, response]);
          setSuccessMessage("Publication ajoutée avec succès!");
        }
      } else {
        const updatedData = await getData<any>("/publications/");
        console.log("Refetched data after empty response:", updatedData);

        let publicationsArray: Publication[] = [];
        if (updatedData) {
          if (Array.isArray(updatedData)) publicationsArray = updatedData;
          else if (Array.isArray(updatedData?.content))
            publicationsArray = updatedData.content;
          else if (Array.isArray(updatedData?.data))
            publicationsArray = updatedData.data;
          else if (Array.isArray(updatedData?.publications))
            publicationsArray = updatedData.publications;
          else if (updatedData?.results && Array.isArray(updatedData.results))
            publicationsArray = updatedData.results;
        }
        setPublications(publicationsArray);
        setSuccessMessage(
          editingPublication
            ? "Publication modifiée avec succès!"
            : "Publication ajoutée avec succès!"
        );
      }

      resetForm();
      setShowAddForm(false);
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      console.error("Error saving publication:", error);
      let errorMessage = "Une erreur s'est produite lors de l'enregistrement";

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
      journal: "",
      datePublication: "",
      coAuteurs: [],
      link: "",
    });
    setEditingPublication(null);
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

  const startEditingPublication = (publication: Publication): void => {
    setEditingPublication(publication);
    setShowAddForm(true);
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

  const formatDateForInput = (dateString?: string): string => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "";
      }
      return date.toISOString().split("T")[0];
    } catch (error) {
      console.error("Error formatting date for input:", error);
      return "";
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

                {publications.map((publication) => (
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
                        <p className="text-gray-700 mb-1">
                          Journal: {safeDisplayText(publication.journal)}
                        </p>
                        <p className="text-gray-700 mb-2">
                          Date: {formatDate(publication.datePublication)}
                        </p>
                        {hasContent(publication.prixIntitule) && (
                          <p className="text-sm text-gray-600 mb-1">
                            Prix: {safeDisplayText(publication.prixIntitule)}
                          </p>
                        )}
                        {publication.link && (
                          <p className="text-sm text-blue-600 mb-1">
                            <a
                              href={publication.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Lien justificatif
                            </a>
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
                            {safeDisplayText(publication.status, "Non défini")}
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
                          onClick={() => startEditingPublication(publication)}
                          className="text-green-500 hover:text-green-700 p-2 hover:bg-green-50 rounded"
                          aria-label={`Modifier la publication ${publication.titre}`}
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
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
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
                ))}
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
                    {editingPublication
                      ? "Modifier la publication"
                      : "Ajouter une nouvelle publication"}
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
                          Titre de l'article*
                        </label>
                        <input
                          type="text"
                          id="titre"
                          name="titre"
                          value={
                            editingPublication
                              ? editingPublication.titre
                              : newPublication.titre
                          }
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
                          value={
                            editingPublication
                              ? formatDateForInput(
                                  editingPublication.datePublication
                                )
                              : newPublication.datePublication
                          }
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
                          Nom du Journal*
                        </label>
                        <input
                          type="text"
                          id="journal"
                          name="journal"
                          value={
                            editingPublication
                              ? editingPublication.journal
                              : newPublication.journal
                          }
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded p-2"
                          placeholder="Nom du journal de publication"
                        />
                        {errors.journal && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.journal}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="border border-indigo-200 rounded-lg p-4 bg-indigo-50">
                    <h3 className="flex items-center font-medium text-indigo-800 mb-4">
                      <span className="mr-2">👥</span>
                      Auteurs et Co-auteurs
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="coAuteurs"
                          className="block mb-1 font-medium text-gray-700"
                        >
                          Noms des Co-auteurs (séparés par une virgule)
                        </label>
                        <input
                          type="text"
                          id="coAuteurs"
                          name="coAuteurs"
                          value={
                            editingPublication
                              ? (editingPublication.coAuteurs || []).join(", ")
                              : newPublication.coAuteurs.join(", ")
                          }
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded p-2"
                          placeholder="ex: Jean Dupont, Marie Curie, Albert Einstein"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Entrez les noms complets des co-auteurs séparés par
                          des virgules.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                    <h3 className="flex items-center font-medium text-green-800 mb-4">
                      <span className="mr-2">🔗</span>
                      Justificatif
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="link"
                          className="block mb-1 font-medium text-gray-700"
                        >
                          Lien justificatif*
                        </label>
                        <input
                          type="url"
                          id="link"
                          name="link"
                          value={
                            editingPublication
                              ? editingPublication.link
                              : newPublication.link
                          }
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded p-2"
                          placeholder="https://example.com/publication"
                        />
                        {errors.link && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.link}
                          </p>
                        )}
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
                          value={
                            editingPublication
                              ? editingPublication.prixIntitule || ""
                              : newPublication.prixIntitule || ""
                          }
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
                      ) : editingPublication ? (
                        "Modifier"
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
                    <h3 className="font-semibold text-gray-700 mb-.5">
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
                  {selectedPublication.link && (
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-1">
                        Justificatif
                      </h3>
                      <p className="text-blue-600">
                        <a
                          href={selectedPublication.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Lien vers la publication
                        </a>
                      </p>
                    </div>
                  )}
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
