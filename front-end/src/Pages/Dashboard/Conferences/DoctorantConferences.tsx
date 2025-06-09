import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

interface Conference {
  id: number;
  conferenceName: string;
  locationDate: string;
  articleTitle: string;
  fileName: string;
  awards: string;
  awardsProofUrl: string;
  awardsProofFileName: string;
  file?: File | null;
  awardsProofFile?: File | null;
}

interface NewConference {
  conferenceName: string;
  locationDate: string;
  articleTitle: string;
  file: File | null;
  fileName: string;
  awards: string;
  awardsProofUrl: string;
  awardsProofFile: File | null;
  awardsProofFileName: string;
}

interface Errors {
  [key: string]: string | undefined;
  conferenceName?: string;
  locationDate?: string;
  articleTitle?: string;
  file?: string;
  awardsProofFile?: string;
  submit?: string;
}

const DoctorantConferences: React.FC = () => {
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newConference, setNewConference] = useState<NewConference>({
    conferenceName: "",
    locationDate: "",
    articleTitle: "",
    file: null,
    fileName: "",
    awards: "",
    awardsProofUrl: "",
    awardsProofFile: null,
    awardsProofFileName: ""
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Simulate backend API call to fetch existing conferences
  useEffect(() => {
    const fetchConferences = async (): Promise<void> => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Mock data - replace with actual API call
        const mockConferences: Conference[] = [
          {
            id: 1,
            conferenceName: "International AI Conference 2024",
            locationDate: "Paris, France - March 2024",
            articleTitle: "Machine Learning Applications in Healthcare",
            fileName: "ai_conference_certificate.pdf",
            awards: "Best Paper Award",
            awardsProofUrl: "https://example.com/award-proof",
            awardsProofFileName: ""
          },
          {
            id: 2,
            conferenceName: "Morocco Tech Summit",
            locationDate: "Casablanca, Maroc - January 2024",
            articleTitle: "Digital Transformation in North Africa",
            fileName: "tech_summit_presentation.pdf",
            awards: "",
            awardsProofUrl: "",
            awardsProofFileName: ""
          }
        ];
        setConferences(mockConferences);
      } catch (error) {
        console.error('Error fetching conferences:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConferences();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setNewConference(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const isValidPdf = (file: File): boolean => {
    return file.type === "application/pdf" || file.name.toLowerCase().endsWith('.pdf');
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, fileType: 'main' | 'awards' = 'main'): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Clear previous file input value to allow re-uploading the same file
    e.target.value = '';

    if (file.size > MAX_FILE_SIZE) {
      setErrors(prev => ({
        ...prev,
        [fileType === 'awards' ? 'awardsProofFile' : 'file']: "Le fichier est trop volumineux (max 5MB)"
      }));
      return;
    }

    if (!isValidPdf(file)) {
      setErrors(prev => ({
        ...prev,
        [fileType === 'awards' ? 'awardsProofFile' : 'file']: "Seuls les fichiers PDF sont acceptés"
      }));
      return;
    }

    const fileKey = fileType === 'awards' ? 'awardsProofFile' : 'file';
    const fileNameKey = fileType === 'awards' ? 'awardsProofFileName' : 'fileName';

    setNewConference(prev => ({
      ...prev,
      [fileKey]: file,
      [fileNameKey]: file.name
    }));

    setErrors(prev => ({
      ...prev,
      [fileKey]: undefined
    }));
  };

  const validate = (): Errors => {
    const newErrors: Errors = {};
    if (!newConference.conferenceName.trim()) newErrors.conferenceName = "Le nom de la conférence est requis";
    if (!newConference.locationDate.trim()) newErrors.locationDate = "Le lieu et la date sont requis";
    if (!newConference.articleTitle.trim()) newErrors.articleTitle = "Le titre de l'article est requis";
    if (!newConference.file) newErrors.file = "Un justificatif est requis";
    return newErrors;
  };

  const handleSubmit = async (): Promise<void> => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call to backend
      const formData = new FormData();
      formData.append('conferenceName', newConference.conferenceName);
      formData.append('locationDate', newConference.locationDate);
      formData.append('articleTitle', newConference.articleTitle);
      if (newConference.file) {
        formData.append('file', newConference.file);
      }
      formData.append('awards', newConference.awards);
      formData.append('awardsProofUrl', newConference.awardsProofUrl);
      if (newConference.awardsProofFile) {
        formData.append('awardsProofFile', newConference.awardsProofFile);
      }

      // Replace with actual API endpoint
      // const response = await fetch('/api/conferences', {
      //   method: 'POST',
      //   body: formData
      // });

      // Simulate API response delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const conferenceToAdd: Conference = {
        ...newConference,
        id: Date.now()
      };

      setConferences(prev => [...prev, conferenceToAdd]);
      resetForm();
      setShowAddForm(false);
      setSuccessMessage("Conférence ajoutée avec succès!");
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error('Error adding conference:', error);
      setErrors({ submit: "Une erreur s'est produite lors de l'ajout de la conférence" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = (): void => {
    setNewConference({
      conferenceName: "",
      locationDate: "",
      articleTitle: "",
      file: null,
      fileName: "",
      awards: "",
      awardsProofUrl: "",
      awardsProofFile: null,
      awardsProofFileName: ""
    });
    setErrors({});
  };

  const removeConference = async (id: number): Promise<void> => {
    try {
      // Replace with actual API endpoint
      // await fetch(`/api/conferences/${id}`, {
      //   method: 'DELETE'
      // });
      setConferences(prev => prev.filter(conf => conf.id !== id));
    } catch (error) {
      console.error('Error removing conference:', error);
    }
  };

  const removeFile = (fileType: 'main' | 'awards'): void => {
    if (fileType === 'awards') {
      setNewConference(prev => ({
        ...prev,
        awardsProofFile: null,
        awardsProofFileName: ""
      }));
    } else {
      setNewConference(prev => ({
        ...prev,
        file: null,
        fileName: ""
      }));
    }
    setErrors(prev => ({
      ...prev,
      [fileType === 'awards' ? 'awardsProofFile' : 'file']: undefined
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-600">Chargement des conférences...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Mes Conférences</h1>
          <p className="text-gray-600">
            Gérez vos communications faites lors de conférences nationales ou internationales.
          </p>
        </div>

        <div className="p-6">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <span className="text-lg">➕</span>
            {showAddForm ? 'Annuler' : 'Ajouter une conférence'}
          </button>

          {successMessage && (
            <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {successMessage}
            </div>
          )}

          {/* Existing Conferences List */}
          {conferences.length > 0 ? (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Conférences enregistrées ({conferences.length})
              </h2>

              {conferences.map((conference) => (
                <div key={conference.id} className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {conference.conferenceName}
                      </h3>
                      <p className="text-gray-600 mb-1">
                        {conference.locationDate}
                      </p>
                      <p className="text-gray-700 mb-2">
                        {conference.articleTitle}
                      </p>

                      {conference.awards && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-2">
                          <div className="flex items-center mb-1">
                            <span className="mr-2">🏆</span>
                            <span className="font-medium text-yellow-800">Prix et Distinctions</span>
                          </div>
                          <p className="text-yellow-700 mb-2">{conference.awards}</p>
                          {conference.awardsProofUrl && (
                            <a
                              href={conference.awardsProofUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-sm"
                            >
                              Voir le justificatif en ligne
                            </a>
                          )}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => removeConference(conference.id)}
                      className="text-red-500 hover:text-red-700 ml-4 p-2 hover:bg-red-50 rounded"
                      aria-label={`Supprimer la conférence ${conference.conferenceName}`}
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

                  {conference.fileName && (
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="mr-1">📄</span>
                      Justificatif: {conference.fileName}
                    </p>
                  )}
                  {conference.awardsProofFileName && (
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="mr-1">🏆</span>
                      Prix: {conference.awardsProofFileName}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎤</div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                Aucune conférence enregistrée
              </h3>
              <p className="text-gray-600">
                Commencez par ajouter votre première conférence.
              </p>
            </div>
          )}

          {/* Add Conference Form */}
          {showAddForm && (
            <div className="mt-6 border border-gray-200 rounded-lg">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  Ajouter une nouvelle conférence
                </h2>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Section Informations de base */}
                <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="flex items-center font-medium text-blue-800 mb-4">
                    <span className="mr-2">🎤</span>
                    Informations de la Conférence
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="conferenceName" className="block mb-1 font-medium text-gray-700">
                        Nom de la conférence*
                      </label>
                      <input
                        type="text"
                        id="conferenceName"
                        name="conferenceName"
                        value={newConference.conferenceName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                        placeholder="Nom de la conférence"
                      />
                      {errors.conferenceName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.conferenceName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="locationDate" className="block mb-1 font-medium text-gray-700">
                        Lieu & Date*
                      </label>
                      <input
                        type="text"
                        id="locationDate"
                        name="locationDate"
                        value={newConference.locationDate}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                        placeholder="Paris, France - Mars 2024"
                      />
                      {errors.locationDate && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.locationDate}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="articleTitle" className="block mb-1 font-medium text-gray-700">
                        Titre de l'article*
                      </label>
                      <input
                        type="text"
                        id="articleTitle"
                        name="articleTitle"
                        value={newConference.articleTitle}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                        placeholder="Titre de votre présentation/article"
                      />
                      {errors.articleTitle && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.articleTitle}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700 mb-2">
                        Justificatif (PDF)*
                      </label>
                      <div className="flex items-center">
                        <label
                          htmlFor="fileUpload"
                          className="cursor-pointer bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded border border-blue-300 text-blue-700"
                        >
                          {newConference.fileName || "Choisir un fichier"}
                          <input
                            id="fileUpload"
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => handleFileChange(e, 'main')}
                            className="hidden"
                          />
                        </label>
                        {newConference.fileName && (
                          <button
                            type="button"
                            onClick={() => removeFile('main')}
                            className="ml-2 text-red-500 hover:text-red-700"
                            aria-label="Supprimer le fichier"
                          >
                            Supprimer
                          </button>
                        )}
                      </div>
                      {errors.file && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.file}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        Taille maximale : 5MB (PDF uniquement)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section Prix et Distinctions */}
                <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                  <h3 className="flex items-center font-medium text-yellow-800 mb-4">
                    <span className="mr-2">🏆</span>
                    Prix et Distinctions
                  </h3>

                  <div>
                    <label htmlFor="awards" className="block mb-1 font-medium text-gray-700">
                      Description des Prix et Distinctions
                    </label>
                    <textarea
                      id="awards"
                      name="awards"
                      value={newConference.awards}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded p-2"
                      rows={3}
                      placeholder="Décrivez les prix ou distinctions reçus (optionnel)"
                    />
                  </div>

                  <div className="mt-4">
                    <label htmlFor="awardsProofUrl" className="block mb-1 font-medium text-gray-700">
                      Lien de Justification (URL)
                    </label>
                    <input
                      type="url"
                      id="awardsProofUrl"
                      name="awardsProofUrl"
                      value={newConference.awardsProofUrl}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded p-2"
                      placeholder="https://example.com/award-link"
                    />
                  </div>

                  <div className="mt-4">
                    <label htmlFor="awardsFileUpload" className="block text-sm font-medium text-gray-700 mb-2">
                      Ou télécharger un justificatif PDF
                    </label>
                    <div className="relative">
                      <div className="flex items-center">
                        <label
                          htmlFor="awardsFileUpload"
                          className="cursor-pointer bg-yellow-50 hover:bg-yellow-100 px-4 py-2 rounded border border-yellow-300 text-yellow-700"
                        >
                          <span>{newConference.awardsProofFileName || "Choisir un fichier"}</span>
                          <input
                            id="awardsFileUpload"
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => handleFileChange(e, 'awards')}
                            className="hidden"
                          />
                        </label>
                        {newConference.awardsProofFileName && (
                          <button
                            type="button"
                            onClick={() => removeFile('awards')}
                            className="ml-2 text-red-500 hover:text-red-700"
                            aria-label="Supprimer le fichier de prix"
                          >
                            Supprimer
                          </button>
                        )}
                      </div>
                      {newConference.awardsProofFileName && (
                        <p className="mt-2 text-sm text-green-600">
                          <span className="mr-1">✅</span>
                          Fichier sélectionné: {newConference.awardsProofFileName}
                        </p>
                      )}
                      {errors.awardsProofFile && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.awardsProofFile}
                        </p>
                      )}
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
                      isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
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
                      "Ajouter la conférence"
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