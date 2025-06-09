import React, { useState, useEffect, ChangeEvent } from "react";
import {
  getData,
  postData,
  deleteData,
  putData,
} from "@/Helpers/CRUDFunctions";
import { UseAlert } from "@/Hooks/UseAlert";

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
}

interface NewConfParticipation {
  titre: string;
  conference: string;
  date: string;
  lieu: string;
  autresParticipants: string;
}

interface Errors {
  [key: string]: string | undefined;
  titre?: string;
  conference?: string;
  date?: string;
  lieu?: string;
  submit?: string;
}

const DoctorantConferences: React.FC = () => {
  const [conferences, setConferences] = useState<ConfParticipation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newConference, setNewConference] = useState<NewConfParticipation>({
    titre: "",
    conference: "",
    date: "",
    lieu: "",
    autresParticipants: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentEditId, setCurrentEditId] = useState<number | null>(null);

  // Fetch conferences from backend
  useEffect(() => {
    const fetchConferences = async (): Promise<void> => {
      try {
        setLoading(true);
        console.log("🔍 Fetching conferences from /confparticipation/");
        const data = await getData<any>("/confparticipation/");
        console.log("📦 Received data:", data);
        console.log("📦 Data type:", typeof data, "Is array:", Array.isArray(data));
        
        // Handle paginated response
        let conferencesArray: ConfParticipation[] = [];
        if (data && typeof data === 'object') {
          if (Array.isArray(data)) {
            // Direct array response
            conferencesArray = data;
            console.log("✅ Direct array with", data.length, "items");
          } else if (data.content && Array.isArray(data.content)) {
            // Paginated response
            conferencesArray = data.content;
            console.log("✅ Paginated response with", data.content.length, "items from", data.totalElements, "total");
          }
        }
        
        setConferences(conferencesArray);
      } catch (error) {
        console.error("❌ Error fetching conferences:", error);
        setErrors({ submit: "Erreur lors du chargement des conférences" });
        setConferences([]);
      } finally {
        setLoading(false);
      }
    };

    fetchConferences();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setNewConference((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validate = (): Errors => {
    const newErrors: Errors = {};
    if (!newConference.titre.trim())
      newErrors.titre = "Le titre de la participation est requis";
    if (!newConference.conference.trim())
      newErrors.conference = "Le nom de la conférence est requis";
    if (!newConference.date.trim()) newErrors.date = "La date est requise";
    if (!newConference.lieu.trim()) newErrors.lieu = "Le lieu est requis";
    return newErrors;
  };

  const handleSubmit = async (): Promise<void> => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({}); // Clear previous errors

    try {
      // Improved date formatting with error handling
      let formattedDate: string;
      try {
        const dateObj = new Date(newConference.date);
        if (isNaN(dateObj.getTime())) {
          throw new Error("Invalid date");
        }
        formattedDate = dateObj.toISOString();
      } catch (dateError) {
        setErrors({ date: "Format de date invalide" });
        return;
      }

      if (editMode && currentEditId) {
        // Update existing conference
        console.log("🔄 Updating conference:", currentEditId);
        const response = await putData<ConfParticipation>(
          `/confparticipation/${currentEditId}`,
          {
            titre: newConference.titre,
            conference: newConference.conference,
            date: formattedDate,
            lieu: newConference.lieu,
            autresParticipants: newConference.autresParticipants,
          }
        );
        console.log("🔄 Update response:", response);
        
        if (response) {
          setConferences((prev) =>
            prev.map((conf) => (conf.id === currentEditId ? response : conf))
          );
        } else {
          // If no response, refetch the data
          console.log("🔄 No response, refetching data...");
          const updatedData = await getData<any>("/confparticipation/");
          let conferencesArray: ConfParticipation[] = [];
          if (updatedData && typeof updatedData === 'object') {
            if (Array.isArray(updatedData)) {
              conferencesArray = updatedData;
            } else if (updatedData.content && Array.isArray(updatedData.content)) {
              conferencesArray = updatedData.content;
            }
          }
          setConferences(conferencesArray);
        }
        setSuccessMessage("Participation mise à jour avec succès!");
      } else {
        // Create new conference
        console.log("➕ Creating new conference with data:", {
          titre: newConference.titre,
          conference: newConference.conference,
          date: formattedDate,
          lieu: newConference.lieu,
          autresParticipants: newConference.autresParticipants,
        });
        
        const response = await postData<ConfParticipation>(
          "/confparticipation/",
          {
            titre: newConference.titre,
            conference: newConference.conference,
            date: formattedDate,
            lieu: newConference.lieu,
            autresParticipants: newConference.autresParticipants,
          }
        );
        
        console.log("➕ Create response:", response);
        
        if (response) {
          console.log("➕ Adding to conferences list");
          setConferences((prev) => [...prev, response]);
          setSuccessMessage("Participation ajoutée avec succès!");
        } else {
          // If no response, refetch the data to ensure consistency
          console.log("➕ No response, refetching data...");
          const updatedData = await getData<any>("/confparticipation/");
          console.log("➕ Refetched data:", updatedData);
          let conferencesArray: ConfParticipation[] = [];
          if (updatedData && typeof updatedData === 'object') {
            if (Array.isArray(updatedData)) {
              conferencesArray = updatedData;
            } else if (updatedData.content && Array.isArray(updatedData.content)) {
              conferencesArray = updatedData.content;
            }
          }
          if (conferencesArray.length > 0) {
            setConferences(conferencesArray);
            setSuccessMessage("Participation ajoutée avec succès!");
          } else {
            throw new Error("No response from server and refetch failed");
          }
        }
      }

      resetForm();
      setShowAddForm(false);
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      console.error("Error adding/updating conference:", error);
      setErrors({ 
        submit: `Une erreur s'est produite lors de l'opération: ${error instanceof Error ? error.message : 'Erreur inconnue'}` 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = (): void => {
    setNewConference({
      titre: "",
      conference: "",
      date: "",
      lieu: "",
      autresParticipants: "",
    });
    setErrors({});
    setEditMode(false);
    setCurrentEditId(null);
  };

  const handleEdit = (conference: ConfParticipation): void => {
    // Format date for input field (YYYY-MM-DD)
    let formattedDate = "";
    try {
      const dateObj = new Date(conference.date);
      if (!isNaN(dateObj.getTime())) {
        formattedDate = dateObj.toISOString().split('T')[0];
      }
    } catch (error) {
      console.error("Error formatting date for edit:", error);
      formattedDate = conference.date;
    }

    setNewConference({
      titre: conference.titre,
      conference: conference.conference,
      date: formattedDate,
      lieu: conference.lieu,
      autresParticipants: conference.autresParticipants,
    });
    setCurrentEditId(conference.id);
    setEditMode(true);
    setShowAddForm(true);
  };

  const removeConference = async (id: number): Promise<void> => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette participation?")) {
      return;
    }

    try {
      await deleteData(`/confparticipation/${id}`); // Fixed endpoint consistency
      setConferences((prev) => prev.filter((conf) => conf.id !== id));
      setSuccessMessage("Participation supprimée avec succès!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error removing conference:", error);
      setErrors({
        submit: "Erreur lors de la suppression de la participation",
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
        return dateString; // Return original if invalid
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
          <span className="text-gray-600">
            Chargement des participations...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Mes Participations aux Conférences
          </h1>
          <p className="text-gray-600">
            Gérez vos participations aux conférences nationales ou
            internationales.
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
            {showAddForm ? "Annuler" : "Ajouter une participation"}
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

          {/* Existing Conferences List */}
          {conferences.length > 0 ? (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Participations enregistrées ({conferences.length})
              </h2>

              {conferences.map((conference) => (
                <div
                  key={conference.id}
                  className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {conference.titre}
                      </h3>
                      <p className="text-gray-600 mb-1">
                        Conférence: {conference.conference}
                      </p>
                      <p className="text-gray-700 mb-2">
                        Lieu: {conference.lieu} - Date:{" "}
                        {formatDate(conference.date)}
                      </p>
                      {conference.autresParticipants && (
                        <p className="text-gray-600 mb-2">
                          Autres participants: {conference.autresParticipants}
                        </p>
                      )}
                      <p className="text-sm text-gray-500">
                        Statut:{" "}
                        <span
                          className={`font-medium ${
                            conference.status === "VALIDEE"
                              ? "text-green-600"
                              : conference.status === "REFUSEE"
                              ? "text-red-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {conference.status}
                        </span>
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(conference)}
                        className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded"
                        aria-label={`Modifier la participation ${conference.titre}`}
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
                        onClick={() => removeConference(conference.id)}
                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded"
                        aria-label={`Supprimer la participation ${conference.titre}`}
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
              <div className="text-6xl mb-4">🎤</div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                Aucune participation enregistrée
              </h3>
              <p className="text-gray-600">
                Commencez par ajouter votre première participation.
              </p>
            </div>
          )}

          {/* Add/Edit Conference Form */}
          {showAddForm && (
            <div className="mt-6 border border-gray-200 rounded-lg">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  {editMode
                    ? "Modifier la participation"
                    : "Ajouter une nouvelle participation"}
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
                    <span className="mr-2">🎤</span>
                    Informations de la Participation
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="titre"
                        className="block mb-1 font-medium text-gray-700"
                      >
                        Titre de la participation*
                      </label>
                      <input
                        type="text"
                        id="titre"
                        name="titre"
                        value={newConference.titre}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                        placeholder="Titre de votre participation"
                      />
                      {errors.titre && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.titre}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="conference"
                        className="block mb-1 font-medium text-gray-700"
                      >
                        Nom de la conférence*
                      </label>
                      <input
                        type="text"
                        id="conference"
                        name="conference"
                        value={newConference.conference}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                        placeholder="Nom de la conférence"
                      />
                      {errors.conference && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.conference}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="date"
                        className="block mb-1 font-medium text-gray-700"
                      >
                        Date*
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={newConference.date}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                      />
                      {errors.date && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.date}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="lieu"
                        className="block mb-1 font-medium text-gray-700"
                      >
                        Lieu*
                      </label>
                      <input
                        type="text"
                        id="lieu"
                        name="lieu"
                        value={newConference.lieu}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                        placeholder="Lieu de la conférence"
                      />
                      {errors.lieu && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.lieu}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="autresParticipants"
                        className="block mb-1 font-medium text-gray-700"
                      >
                        Autres participants
                      </label>
                      <input
                        type="text"
                        id="autresParticipants"
                        name="autresParticipants"
                        value={newConference.autresParticipants}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                        placeholder="Noms des autres participants (optionnel)"
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
                    ) : editMode ? (
                      "Mettre à jour"
                    ) : (
                      "Ajouter la participation"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorantConferences;