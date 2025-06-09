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
    if (newVacation.awards.trim() && !newVacation.justificationLink.trim() && !newVacation.file) {
      newErrors.justificationFile = "Un justificatif (lien ou fichier) est requis si vous avez des prix/distinctions";
    }
    if (!newVacation.file) newErrors.file = "Un justificatif est requis";
    
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
        id: Date.now()
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
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
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
                className={`w-full border rounded p-2 ${errors.courseTitle ? "border-red-500" : "border-gray-300"}`}
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
                className={`w-full border rounded p-2 ${errors.date ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
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
                className={`w-full border rounded p-2 ${errors.awards ? "border-red-500" : "border-gray-300"}`}
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
                  className={`w-full border rounded p-2 ${errors.justificationLink ? "border-red-500" : "border-gray-300"}`}
                  placeholder="https://example.com/justificatif"
                />
                {errors.justificationLink && <p className="text-red-500 text-sm mt-1">{errors.justificationLink}</p>}
                <p className="text-xs text-gray-500 mt-1">
                  Vous pouvez fournir un lien ou uploader un fichier PDF ci-dessous comme justificatif
                </p>
              </div>
            )}
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
                className={`w-full border rounded p-2 ${errors.institution ? "border-red-500" : "border-gray-300"}`}
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
                className={`w-full border rounded p-2 ${errors.duration ? "border-red-500" : "border-gray-300"}`}
                placeholder="Ex: 30 heures"
              />
              {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                className={`w-full border rounded p-2 ${errors.level ? "border-red-500" : "border-gray-300"}`}
                placeholder="Ex: Master 2, Licence 3..."
              />
              {errors.level && <p className="text-red-500 text-sm mt-1">{errors.level}</p>}
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Justificatif (PDF)*
              </label>
              <div className="flex items-center">
                <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded border border-gray-300">
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
                    className="ml-2 text-red-500 hover:text-red-700"
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
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-4 py-2 rounded text-white flex items-center ${
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

      {vacations.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Vacations enregistrées</h2>
          <div className="space-y-4">
            {vacations.map((vacation) => (
              <div key={vacation.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{vacation.courseTitle}</h3>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Date:</span> {vacation.date}
                      </div>
                      <div>
                        <span className="font-medium">Durée:</span> {vacation.duration}
                      </div>
                      <div>
                        <span className="font-medium">Niveau:</span> {vacation.level}
                      </div>
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      <span className="font-medium">Établissement:</span> {vacation.institution}
                    </div>
                    {vacation.awards && (
                      <div className="mt-2 p-2 bg-yellow-50 rounded border-l-4 border-yellow-400">
                        <div className="text-sm">
                          <span className="font-medium text-yellow-800">Prix et distinctions:</span>
                          <p className="text-yellow-700 mt-1">{vacation.awards}</p>
                          {vacation.justificationLink && (
                            <a 
                              href={vacation.justificationLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 underline text-xs mt-1 block"
                            >
                              Voir le justificatif →
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                    {vacation.fileName && (
                      <div className="mt-2">
                        <span className="text-sm text-gray-500">Fichier joint: {vacation.fileName}</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => removeVacation(vacation.id)}
                    className="text-red-500 hover:text-red-700 ml-4"
                    aria-label="Supprimer cette vacation"
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
      )}
    </div>
  );
};

export default DoctorantVacations;