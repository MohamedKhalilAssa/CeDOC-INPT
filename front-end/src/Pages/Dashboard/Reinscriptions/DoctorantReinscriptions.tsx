import React, { useState } from "react";

const DoctorantReinscriptions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [formData, setFormData] = useState({
    thesisSubject: "",
    progressReport: "",
    workPlan: "",
    files: [],
    fileNames: []
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
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
    const selectedFiles = Array.from(e.target.files);
    const validFiles = [];
    const invalidFiles = [];
    
    selectedFiles.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        invalidFiles.push({name: file.name, error: "Taille > 5MB"});
      } else if (file.type !== "application/pdf") {
        invalidFiles.push({name: file.name, error: "Format non PDF"});
      } else {
        validFiles.push(file);
      }
    });

    if (invalidFiles.length > 0) {
      setErrors(prev => ({
        ...prev,
        files: `Certains fichiers sont invalides: ${invalidFiles.map(f => `${f.name} (${f.error})`).join(', ')}`
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        files: null
      }));
    }

    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...validFiles],
      fileNames: [...prev.fileNames, ...validFiles.map(f => f.name)]
    }));
  };

  const removeFile = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, index) => index !== indexToRemove),
      fileNames: prev.fileNames.filter((_, index) => index !== indexToRemove)
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.thesisSubject.trim()) newErrors.thesisSubject = "Le sujet de thèse est requis";
    if (!formData.progressReport.trim()) newErrors.progressReport = "Le rapport d'avancement est requis";
    if (!formData.workPlan.trim()) newErrors.workPlan = "Le plan prévisionnel est requis";
    if (formData.files.length === 0) newErrors.files = "Au moins un fichier justificatif est requis";
    
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
      const submissionToAdd = {
        ...formData,
        id: Date.now(),
        submittedAt: new Date().toISOString()
      };
      
      setSubmissions(prev => [...prev, submissionToAdd]);
      resetForm();
      setSuccessMessage("Demande de réinscription soumise avec succès!");
      setIsSubmitting(false);
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(""), 5000);
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      thesisSubject: "",
      progressReport: "",
      workPlan: "",
      files: [],
      fileNames: []
    });
    setErrors({});
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const removeSubmission = (id) => {
    setSubmissions(prev => prev.filter(sub => sub.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Mes Réinscriptions</h1>
      <p className="mb-6 text-gray-600">
        Formulaire de demande de réinscription pour l'année universitaire suivante.
      </p>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label htmlFor="thesisSubject" className="block mb-1 font-medium text-gray-700">
            Sujet de thèse*
          </label>
          <textarea
            id="thesisSubject"
            name="thesisSubject"
            value={formData.thesisSubject}
            onChange={handleChange}
            className={`w-full border rounded p-2 ${errors.thesisSubject ? "border-red-500" : "border-gray-300"}`}
            rows={3}
            placeholder="Décrivez votre sujet de thèse en cours..."
          />
          {errors.thesisSubject && <p className="text-red-500 text-sm mt-1">{errors.thesisSubject}</p>}
        </div>

        <div>
          <label htmlFor="progressReport" className="block mb-1 font-medium text-gray-700">
            Rapport d'avancement*
          </label>
          <textarea
            id="progressReport"
            name="progressReport"
            value={formData.progressReport}
            onChange={handleChange}
            className={`w-full border rounded p-2 ${errors.progressReport ? "border-red-500" : "border-gray-300"}`}
            rows={5}
            placeholder="Détaillez l'avancement de vos travaux..."
          />
          {errors.progressReport && <p className="text-red-500 text-sm mt-1">{errors.progressReport}</p>}
        </div>

        <div>
          <label htmlFor="workPlan" className="block mb-1 font-medium text-gray-700">
            Plan prévisionnel*
          </label>
          <textarea
            id="workPlan"
            name="workPlan"
            value={formData.workPlan}
            onChange={handleChange}
            className={`w-full border rounded p-2 ${errors.workPlan ? "border-red-500" : "border-gray-300"}`}
            rows={4}
            placeholder="Présentez votre plan de travail pour l'année à venir..."
          />
          {errors.workPlan && <p className="text-red-500 text-sm mt-1">{errors.workPlan}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Fichiers justificatifs (PDF)*
          </label>
          <div className="space-y-2">
            <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded border border-gray-300 inline-block">
              <span>Sélectionner des fichiers</span>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                multiple
                className="hidden"
              />
            </label>
            <p className="text-sm text-gray-500">Taille maximale par fichier : 5MB (PDF uniquement)</p>
            
            {errors.files && <p className="text-red-500 text-sm mt-1">{errors.files}</p>}
            
            {formData.fileNames.length > 0 && (
              <div className="mt-2 border rounded divide-y">
                {formData.fileNames.map((fileName, index) => (
                  <div key={index} className="p-2 flex justify-between items-center">
                    <span className="text-sm truncate">{fileName}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700 ml-2"
                      aria-label={`Supprimer ${fileName}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 rounded text-white ${isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Envoi en cours...
              </span>
            ) : "Soumettre la demande"}
          </button>
        </div>
      </form>

      {submissions.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Demandes précédentes</h2>
          <div className="space-y-4">
            {submissions.map((submission) => (
              <div key={submission.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">Demande du {formatDate(submission.submittedAt)}</h3>
                    <div className="mt-2 space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Sujet de thèse:</h4>
                        <p className="text-sm text-gray-600 whitespace-pre-line">{submission.thesisSubject}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Avancement:</h4>
                        <p className="text-sm text-gray-600 whitespace-pre-line">{submission.progressReport}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Plan prévisionnel:</h4>
                        <p className="text-sm text-gray-600 whitespace-pre-line">{submission.workPlan}</p>
                      </div>
                    </div>
                    {submission.fileNames.length > 0 && (
                      <div className="mt-3">
                        <h4 className="text-sm font-medium text-gray-700">Fichiers joints:</h4>
                        <ul className="text-sm text-gray-500">
                          {submission.fileNames.map((fileName, index) => (
                            <li key={index} className="truncate">{fileName}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => removeSubmission(submission.id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Supprimer cette demande"
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

export default DoctorantReinscriptions;