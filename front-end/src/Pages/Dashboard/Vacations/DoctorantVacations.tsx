import React, { useState } from "react";

const DoctorantVacations = () => {
  const [vacations, setVacations] = useState([]);
  const [newVacation, setNewVacation] = useState({
    courseTitle: "",
    date: "",
    institution: "",
    duration: "",
    level: "",
    awards: "",
    justificationLink: "",
    file: null,
    fileName: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVacation(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({
          ...prev,
          file: "Le fichier est trop volumineux (max 5MB)"
        }));
        return;
      }
      if (file.type !== "application/pdf") {
        setErrors(prev => ({
          ...prev,
          file: "Seuls les fichiers PDF sont acceptés"
        }));
        return;
      }
      setNewVacation(prev => ({
        ...prev,
        file,
        fileName: file.name
      }));
      setErrors(prev => ({
        ...prev,
        file: null
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!newVacation.courseTitle.trim()) newErrors.courseTitle = "Le titre du cours est requis";
    if (!newVacation.date.trim()) newErrors.date = "La date est requise";
    if (!newVacation.institution.trim()) newErrors.institution = "L'établissement est requis";
    if (!newVacation.duration.trim()) newErrors.duration = "La durée est requise";
    if (!newVacation.level.trim()) newErrors.level = "Le niveau est requis";
    
    // Fixed validation logic for awards justification
    if (newVacation.awards.trim() && !newVacation.justificationLink.trim() && !newVacation.file) {
      newErrors.justificationFile = "Un justificatif (lien ou fichier) est requis si vous avez des prix/distinctions";
    }
    
    // Only require file if no awards or if awards without link
    if (!newVacation.file && (!newVacation.awards.trim() || (newVacation.awards.trim() && !newVacation.justificationLink.trim()))) {
      newErrors.file = "Un justificatif est requis";
    }
    
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const vacationToAdd = {
        ...newVacation,
        id: Date.now(),
        dateAdded: new Date().toLocaleDateString('fr-FR')
      };
      
      setVacations(prev => [...prev, vacationToAdd]);
      resetForm();
      setSuccessMessage("Vacation ajoutée avec succès!");
      setIsSubmitting(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    }, 1000);
  };

  const resetForm = () => {
    setNewVacation({
      courseTitle: "",
      date: "",
      institution: "",
      duration: "",
      level: "",
      awards: "",
      justificationLink: "",
      file: null,
      fileName: ""
    });
    setErrors({});
  };

  const removeVacation = (id) => {
    setVacations(prev => prev.filter(vacation => vacation.id !== id));
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold mb-4 flex items-center text-gray-800">
          <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Mes Vacations
        </h1>
        <p className="mb-6 text-gray-600">
          Déclarez ici vos vacations assurées pendant votre parcours doctoral.
          Toutes les déclarations doivent être accompagnées d'un justificatif.
        </p>

        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {successMessage}
          </div>
        )}

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="courseTitle" className="block mb-1 font-medium text-gray-700">
                Titre du cours*
              </label>
              <input
                type="text"
                id="courseTitle"
                name="courseTitle"
                value={newVacation.courseTitle}
                onChange={handleChange}
                className={`w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.courseTitle ? "border-red-500" : "border-gray-300"}`}
                placeholder="Ex: Algorithmique avancée"
              />
              {errors.courseTitle && <p className="text-red-500 text-sm mt-1">{errors.courseTitle}</p>}
            </div>

            <div>
              <label htmlFor="date" className="block mb-1 font-medium text-gray-700">
                Date*
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={newVacation.date}
                onChange={handleChange}
                className={`w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.date ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="institution" className="block mb-1 font-medium text-gray-700">
                Établissement*
              </label>
              <input
                type="text"
                id="institution"
                name="institution"
                value={newVacation.institution}
                onChange={handleChange}
                className={`w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.institution ? "border-red-500" : "border-gray-300"}`}
                placeholder="Nom de l'université/école"
              />
              {errors.institution && <p className="text-red-500 text-sm mt-1">{errors.institution}</p>}
            </div>

            <div>
              <label htmlFor="duration" className="block mb-1 font-medium text-gray-700">
                Durée*
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={newVacation.duration}
                onChange={handleChange}
                className={`w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.duration ? "border-red-500" : "border-gray-300"}`}
                placeholder="Ex: 30 heures"
              />
              {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="level" className="block mb-1 font-medium text-gray-700">
              Niveau*
            </label>
            <input
              type="text"
              id="level"
              name="level"
              value={newVacation.level}
              onChange={handleChange}
              className={`w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.level ? "border-red-500" : "border-gray-300"}`}
              placeholder="Ex: Master 2, Licence 3..."
            />
            {errors.level && <p className="text-red-500 text-sm mt-1">{errors.level}</p>}
          </div>

          <div>
            <label htmlFor="awards" className="block mb-1 font-medium text-gray-700">
              Prix et distinctions
            </label>
            <textarea
              id="awards"
              name="awards"
              value={newVacation.awards}
              onChange={handleChange}
              rows="3"
              className={`w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.awards ? "border-red-500" : "border-gray-300"}`}
              placeholder="Décrivez vos prix et distinctions liés à cette vacation (optionnel)"
            />
            {errors.awards && <p className="text-red-500 text-sm mt-1">{errors.awards}</p>}
          </div>

          {newVacation.awards.trim() && (
            <div>
              <label htmlFor="justificationLink" className="block mb-1 font-medium text-gray-700">
                Lien justificatif
              </label>
              <input
                type="url"
                id="justificationLink"
                name="justificationLink"
                value={newVacation.justificationLink}
                onChange={handleChange}
                className={`w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.justificationLink ? "border-red-500" : "border-gray-300"}`}
                placeholder="https://example.com/justificatif"
              />
              {errors.justificationLink && <p className="text-red-500 text-sm mt-1">{errors.justificationLink}</p>}
              <p className="text-xs text-gray-500 mt-1">
                Vous pouvez fournir un lien ou uploader un fichier PDF ci-dessous comme justificatif
              </p>
            </div>
          )}

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Justificatif (PDF)*
            </label>
            <div className="flex items-center">
              <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded border border-gray-300 transition-colors">
                <span>{newVacation.fileName || "Choisir un fichier"}</span>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {newVacation.fileName && (
                <button
                  type="button"
                  onClick={() => setNewVacation(prev => ({ ...prev, file: null, fileName: "" }))}
                  className="ml-2 text-red-500 hover:text-red-700 transition-colors"
                >
                  Supprimer
                </button>
              )}
            </div>
            {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file}</p>}
            {errors.justificationFile && <p className="text-red-500 text-sm mt-1">{errors.justificationFile}</p>}
            <p className="text-xs text-gray-500 mt-1">
              Taille max: 5MB. Formats acceptés: PDF
              {newVacation.awards.trim() && " (optionnel si lien fourni ci-dessus)"}
            </p>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <button
              onClick={resetForm}
              className="mr-3 px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Réinitialiser
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-4 py-2 rounded text-white flex items-center transition-colors ${
                isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  En cours...
                </span>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Ajouter cette vacation
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* List of added vacations */}
      {vacations.length > 0 && (
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Vacations enregistrées ({vacations.length})
            </h2>
            <div className="space-y-4">
              {vacations.map((vacation, index) => (
                <div key={vacation.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
                          #{index + 1}
                        </span>
                        <h3 className="font-semibold text-gray-800 text-lg">{vacation.courseTitle}</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-6 4v6m6-6v6M3 7h18M4 7l1 14h14l1-14" />
                          </svg>
                          <span className="font-medium">Date:</span>
                          <span className="ml-1">{formatDate(vacation.date)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-medium">Durée:</span>
                          <span className="ml-1">{vacation.duration}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span className="font-medium">Niveau:</span>
                          <span className="ml-1">{vacation.level}</span>
                        </div>
                      </div>
                      
                      <div className="mb-2 text-sm text-gray-600">
                        <span className="font-medium">Établissement:</span>
                        <span className="ml-1">{vacation.institution}</span>
                      </div>
                      
                      {vacation.awards && (
                        <div className="mt-3 p-3 bg-yellow-50 rounded border-l-4 border-yellow-400">
                          <div className="text-sm">
                            <span className="font-medium text-yellow-800 flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                              </svg>
                              Prix et distinctions:
                            </span>
                            <p className="text-yellow-700 mt-1">{vacation.awards}</p>
                            {vacation.justificationLink && (
                              <a 
                                href={vacation.justificationLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 underline text-xs mt-2 inline-flex items-center"
                              >
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                Voir le justificatif
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {vacation.fileName && (
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Fichier joint: {vacation.fileName}
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={() => removeVacation(vacation.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors ml-4 flex-shrink-0"
                      aria-label="Supprimer cette vacation"
                      title="Supprimer cette vacation"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorantVacations;