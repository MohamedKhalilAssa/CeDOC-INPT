import React, { useState } from "react";

const DoctorantHonors = () => {
  const [honors, setHonors] = useState([]);
  const [newHonor, setNewHonor] = useState({
    title: "",
    file: null,
    date: "",
    description: "",
    fileName: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewHonor(prev => ({
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
      setNewHonor(prev => ({
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
    if (!newHonor.title.trim()) newErrors.title = "Le titre est requis";
    if (!newHonor.date) newErrors.date = "La date est requise";
    if (!newHonor.file) newErrors.file = "Un justificatif est requis";
    
    // Validate date format and not in future
    if (newHonor.date) {
      const selectedDate = new Date(newHonor.date);
      const today = new Date();
      if (selectedDate > today) {
        newErrors.date = "La date ne peut pas être dans le futur";
      }
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const honorToAdd = {
        ...newHonor,
        id: Date.now(),
        date: formatDate(newHonor.date)
      };
      
      setHonors(prev => [...prev, honorToAdd]);
      resetForm();
      setSuccessMessage("Distinction ajoutée avec succès!");
      setIsSubmitting(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    }, 1000);
  };

  const resetForm = () => {
    setNewHonor({
      title: "",
      file: null,
      date: "",
      description: "",
      fileName: ""
    });
    setErrors({});
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const removeHonor = (id) => {
    setHonors(prev => prev.filter(honor => honor.id !== id));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Mes Distinctions & Prix</h1>
      <p className="mb-6 text-gray-600">
        Déclarez ici vos distinctions ou prix obtenus pendant votre parcours doctoral.
      </p>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label htmlFor="title" className="block mb-1 font-medium text-gray-700">
            Titre de la distinction*
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newHonor.title}
            onChange={handleChange}
            className={`w-full border rounded p-2 ${errors.title ? "border-red-500" : "border-gray-300"}`}
            placeholder="Ex: Prix d'excellence scientifique"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="date" className="block mb-1 font-medium text-gray-700">
            Date d'obtention*
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={newHonor.date}
            onChange={handleChange}
            max={new Date().toISOString().split('T')[0]}
            className={`w-full border rounded p-2 ${errors.date ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block mb-1 font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={newHonor.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            rows="3"
            placeholder="Description de la distinction..."
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Justificatif (PDF)*
          </label>
          <div className="flex items-center">
            <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded border border-gray-300">
              <span>{newHonor.fileName || "Choisir un fichier"}</span>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            {newHonor.fileName && (
              <button
                type="button"
                onClick={() => setNewHonor(prev => ({ ...prev, file: null, fileName: "" }))}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                Supprimer
              </button>
            )}
          </div>
          {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file}</p>}
          <p className="text-sm text-gray-500 mt-1">Taille maximale : 5MB (PDF uniquement)</p>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 rounded text-white ${isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                En cours...
              </span>
            ) : "Ajouter la distinction"}
          </button>
        </div>
      </form>

      {honors.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Distinctions enregistrées</h2>
          <div className="space-y-4">
            {honors.map((honor) => (
              <div key={honor.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">{honor.title}</h3>
                    <p className="text-sm text-gray-500">{honor.date}</p>
                    {honor.description && (
                      <p className="mt-2 text-gray-600">{honor.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => removeHonor(honor.id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Supprimer cette distinction"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                {honor.fileName && (
                  <div className="mt-2">
                    <span className="text-sm text-gray-500">Fichier joint: {honor.fileName}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorantHonors;