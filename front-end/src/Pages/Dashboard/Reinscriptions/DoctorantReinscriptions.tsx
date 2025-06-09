import React, { useState, useEffect } from "react";

const DoctorantReinscriptions = () => {
  // Form states
  const [formData, setFormData] = useState({
    thesisSubject: "",
    team: "",
    director: "",
    coDirector: "",
    progressReport: "",
    workPlan: "",
    professionalStatus: "",
    residenceStatus: "",
    cotutelleInstitution: "",
    cotutelleProfessor: "",
    derogationRequest: "",
    year: "",
    attestationFile: null,
    employmentCertificate: null,
    otherFiles: []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [submissions, setSubmissions] = useState([]);
  const [currentYear, setCurrentYear] = useState("");
  const [showDerogationField, setShowDerogationField] = useState(false);
  const [showCotutelleFields, setShowCotutelleFields] = useState(false);
  const [showPublicationWarning, setShowPublicationWarning] = useState(false);

  // Fetch current academic year and user data (simulated)
  useEffect(() => {
    // Simulate API call
    setCurrentYear("2023-2024");
    // Set default values from user profile
    setFormData(prev => ({
      ...prev,
      director: "Pr. Ahmed Benali",
      coDirector: "Pr. Fatima Zahraoui",
      team: "Equipe de Recherche en Intelligence Artificielle"
    }));
  }, []);

  // Handle year selection changes
  useEffect(() => {
    const yearNum = parseInt(formData.year);
    setShowDerogationField(yearNum >= 5);
    setShowPublicationWarning(yearNum === 4);
  }, [formData.year]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          [name]: "Fichier trop volumineux (max 5MB)"
        }));
        return;
      }
      if (file.type !== "application/pdf") {
        setErrors(prev => ({
          ...prev,
          [name]: "Seuls les fichiers PDF sont acceptés"
        }));
        return;
      }
      setFormData(prev => ({
        ...prev,
        [name]: file
      }));
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleMultipleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => 
      file.size <= 5 * 1024 * 1024 && 
      file.type === "application/pdf"
    );
    
    setFormData(prev => ({
      ...prev,
      otherFiles: [...prev.otherFiles, ...validFiles]
    }));
  };

  const removeFile = (fileName, fieldName) => {
    if (fieldName === "otherFiles") {
      setFormData(prev => ({
        ...prev,
        otherFiles: prev.otherFiles.filter(file => file.name !== fileName)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [fieldName]: null
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.thesisSubject.trim()) newErrors.thesisSubject = "Le sujet de thèse est requis";
    if (!formData.team.trim()) newErrors.team = "L'équipe est requise";
    if (!formData.director.trim()) newErrors.director = "Le directeur de thèse est requis";
    if (!formData.progressReport.trim()) newErrors.progressReport = "Le rapport d'avancement est requis";
    if (!formData.workPlan.trim()) newErrors.workPlan = "Le plan prévisionnel est requis";
    if (!formData.professionalStatus) newErrors.professionalStatus = "Le statut professionnel est requis";
    if (!formData.residenceStatus) newErrors.residenceStatus = "Le statut de résidence est requis";
    if (!formData.year) newErrors.year = "L'année de réinscription est requise";
    
    // Additional validations based on conditions
    if (formData.professionalStatus === "Non salarié" && formData.residenceStatus === "Bénéficiaire") {
      if (!formData.attestationFile) newErrors.attestationFile = "L'attestation sur l'honneur est requise";
      if (!formData.employmentCertificate) newErrors.employmentCertificate = "Le certificat de non-travail est requis";
    }
    
    if (showDerogationField && !formData.derogationRequest.trim()) {
      newErrors.derogationRequest = "La demande de dérogation est requise";
    }
    
    if (showCotutelleFields) {
      if (!formData.cotutelleInstitution.trim()) newErrors.cotutelleInstitution = "L'établissement de cotutelle est requis";
      if (!formData.cotutelleProfessor.trim()) newErrors.cotutelleProfessor = "Le professeur de cotutelle est requis";
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
    
    // Simulate API call
    setTimeout(() => {
      const submissionToAdd = {
        ...formData,
        id: Date.now(),
        submittedAt: new Date().toISOString(),
        status: "En attente de validation"
      };
      
      setSubmissions(prev => [...prev, submissionToAdd]);
      setSuccessMessage("Demande de réinscription soumise avec succès!");
      setIsSubmitting(false);
      
      setTimeout(() => setSuccessMessage(""), 5000);
    }, 1500);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Demande de Réinscription {currentYear}</h1>
      <p className="mb-6 text-gray-600">
        Veuillez remplir ce formulaire pour votre réinscription en doctorat pour l'année universitaire suivante.
      </p>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        {/* Academic Information Section */}
        <div className="border-b pb-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Informations Académiques</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="year" className="block mb-1 font-medium text-gray-700">
                Année de réinscription*
              </label>
              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className={`w-full border rounded p-2 ${errors.year ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="">Sélectionnez une année</option>
                <option value="2">2ème année</option>
                <option value="3">3ème année</option>
                <option value="4">4ème année</option>
                <option value="5">5ème année</option>
                <option value="6">6ème année</option>
              </select>
              {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
              {showPublicationWarning && (
                <p className="text-yellow-600 text-sm mt-1">
                  ⚠️ Pour s'inscrire en 4ème année, vous devez avoir au minimum une publication.
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="team" className="block mb-1 font-medium text-gray-700">
                Équipe de recherche*
              </label>
              <input
                type="text"
                id="team"
                name="team"
                value={formData.team}
                onChange={handleChange}
                className={`w-full border rounded p-2 ${errors.team ? "border-red-500" : "border-gray-300"}`}
                placeholder="Votre équipe de recherche"
              />
              {errors.team && <p className="text-red-500 text-sm mt-1">{errors.team}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="director" className="block mb-1 font-medium text-gray-700">
                Directeur de thèse*
              </label>
              <input
                type="text"
                id="director"
                name="director"
                value={formData.director}
                onChange={handleChange}
                className={`w-full border rounded p-2 ${errors.director ? "border-red-500" : "border-gray-300"}`}
                placeholder="Directeur de thèse"
              />
              {errors.director && <p className="text-red-500 text-sm mt-1">{errors.director}</p>}
            </div>
            
            <div>
              <label htmlFor="coDirector" className="block mb-1 font-medium text-gray-700">
                Co-Directeur de thèse
              </label>
              <input
                type="text"
                id="coDirector"
                name="coDirector"
                value={formData.coDirector}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Co-Directeur de thèse"
              />
            </div>
          </div>

          <div className="mt-4">
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
              placeholder="Décrivez votre sujet de thèse (vous pouvez le modifier)"
            />
            {errors.thesisSubject && <p className="text-red-500 text-sm mt-1">{errors.thesisSubject}</p>}
          </div>
        </div>

        {/* Progress Report Section */}
        <div className="border-b pb-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Rapport d'Avancement*</h2>
          <div>
            <label htmlFor="progressReport" className="block mb-1 font-medium text-gray-700">
              Résumé de la thèse (incluant la problématique) et travaux réalisés*
            </label>
            <textarea
              id="progressReport"
              name="progressReport"
              value={formData.progressReport}
              onChange={handleChange}
              className={`w-full border rounded p-2 ${errors.progressReport ? "border-red-500" : "border-gray-300"}`}
              rows={6}
              placeholder="Décrivez l'avancement de vos travaux, incluant la problématique et les résultats obtenus..."
            />
            {errors.progressReport && <p className="text-red-500 text-sm mt-1">{errors.progressReport}</p>}
          </div>

          <div className="mt-4">
            <label htmlFor="workPlan" className="block mb-1 font-medium text-gray-700">
              Plan d'action prévisionnel des travaux de recherche*
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
        </div>

        {/* Personal Status Section */}
        <div className="border-b pb-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Statut Personnel</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Statut Professionnel*</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="professionalStatus"
                    value="Salarié"
                    checked={formData.professionalStatus === "Salarié"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Salarié
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="professionalStatus"
                    value="Non salarié"
                    checked={formData.professionalStatus === "Non salarié"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Non salarié
                </label>
              </div>
              {errors.professionalStatus && <p className="text-red-500 text-sm mt-1">{errors.professionalStatus}</p>}
            </div>
            
            <div>
              <label className="block mb-1 font-medium text-gray-700">Résidence*</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="residenceStatus"
                    value="Bénéficiaire"
                    checked={formData.residenceStatus === "Bénéficiaire"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Bénéficiaire
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="residenceStatus"
                    value="Non"
                    checked={formData.residenceStatus === "Non"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Non bénéficiaire
                </label>
              </div>
              {errors.residenceStatus && <p className="text-red-500 text-sm mt-1">{errors.residenceStatus}</p>}
            </div>
          </div>

          {formData.professionalStatus === "Non salarié" && formData.residenceStatus === "Bénéficiaire" && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Attestation sur l'honneur (PDF)*
                </label>
                <div className="flex items-center">
                  <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded border border-gray-300">
                    <span>{formData.attestationFile ? formData.attestationFile.name : "Choisir un fichier"}</span>
                    <input
                      type="file"
                      name="attestationFile"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  {formData.attestationFile && (
                    <button
                      type="button"
                      onClick={() => removeFile(formData.attestationFile.name, "attestationFile")}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      Supprimer
                    </button>
                  )}
                </div>
                {errors.attestationFile && <p className="text-red-500 text-sm mt-1">{errors.attestationFile}</p>}
              </div>
              
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Certificat de non-travail (PDF)*
                </label>
                <div className="flex items-center">
                  <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded border border-gray-300">
                    <span>{formData.employmentCertificate ? formData.employmentCertificate.name : "Choisir un fichier"}</span>
                    <input
                      type="file"
                      name="employmentCertificate"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  {formData.employmentCertificate && (
                    <button
                      type="button"
                      onClick={() => removeFile(formData.employmentCertificate.name, "employmentCertificate")}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      Supprimer
                    </button>
                  )}
                </div>
                {errors.employmentCertificate && <p className="text-red-500 text-sm mt-1">{errors.employmentCertificate}</p>}
              </div>
            </div>
          )}
        </div>

        {/* Cotutelle Section */}
        <div className="border-b pb-4">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="hasCotutelle"
              checked={showCotutelleFields}
              onChange={() => setShowCotutelleFields(!showCotutelleFields)}
              className="mr-2"
            />
            <label htmlFor="hasCotutelle" className="font-medium text-gray-700">
              Je suis en cotutelle avec un établissement partenaire
            </label>
          </div>

          {showCotutelleFields && (
            <div className="space-y-4">
              <div>
                <label htmlFor="cotutelleInstitution" className="block mb-1 font-medium text-gray-700">
                  Nom et lieu de l'établissement de cotutelle*
                </label>
                <input
                  type="text"
                  id="cotutelleInstitution"
                  name="cotutelleInstitution"
                  value={formData.cotutelleInstitution}
                  onChange={handleChange}
                  className={`w-full border rounded p-2 ${errors.cotutelleInstitution ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Ex: Université Paris-Saclay, France"
                />
                {errors.cotutelleInstitution && <p className="text-red-500 text-sm mt-1">{errors.cotutelleInstitution}</p>}
              </div>
              
              <div>
                <label htmlFor="cotutelleProfessor" className="block mb-1 font-medium text-gray-700">
                  Nom du professeur assurant la cotutelle*
                </label>
                <input
                  type="text"
                  id="cotutelleProfessor"
                  name="cotutelleProfessor"
                  value={formData.cotutelleProfessor}
                  onChange={handleChange}
                  className={`w-full border rounded p-2 ${errors.cotutelleProfessor ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Ex: Pr. Jean Dupont"
                />
                {errors.cotutelleProfessor && <p className="text-red-500 text-sm mt-1">{errors.cotutelleProfessor}</p>}
              </div>
            </div>
          )}
        </div>

        {/* Derogation Section */}
        {showDerogationField && (
          <div className="border-b pb-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Demande de Dérogation*</h2>
            <div>
              <label htmlFor="derogationRequest" className="block mb-1 font-medium text-gray-700">
                Motivation pour la réinscription en {formData.year}ème année
              </label>
              <textarea
                id="derogationRequest"
                name="derogationRequest"
                value={formData.derogationRequest}
                onChange={handleChange}
                className={`w-full border rounded p-2 ${errors.derogationRequest ? "border-red-500" : "border-gray-300"}`}
                rows={4}
                placeholder="Veuillez justifier votre demande de réinscription..."
              />
              {errors.derogationRequest && <p className="text-red-500 text-sm mt-1">{errors.derogationRequest}</p>}
            </div>
          </div>
        )}

        {/* Additional Files Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Documents Complémentaires</h2>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Autres fichiers justificatifs (PDF)
            </label>
            <div className="space-y-2">
              <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded border border-gray-300 inline-block">
                <span>Ajouter des fichiers</span>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleMultipleFilesChange}
                  multiple
                  className="hidden"
                />
              </label>
              <p className="text-sm text-gray-500">Taille maximale par fichier : 5MB (PDF uniquement)</p>
              
              {formData.otherFiles.length > 0 && (
                <div className="mt-2 border rounded divide-y">
                  {formData.otherFiles.map((file, index) => (
                    <div key={index} className="p-2 flex justify-between items-center">
                      <span className="text-sm truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(file.name, "otherFiles")}
                        className="text-red-500 hover:text-red-700 ml-2"
                        aria-label={`Supprimer ${file.name}`}
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
        </div>

        {/* Submission Section */}
        <div className="flex justify-between items-center pt-6">
          <p className="text-sm text-gray-500">
            * Champs obligatoires
          </p>
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
                Soumission en cours...
              </span>
            ) : "Soumettre la demande"}
          </button>
        </div>
      </form>

      {/* Previous Submissions Section */}
      {submissions.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Mes Demandes Précédentes</h2>
          <div className="space-y-4">
            {submissions.map((submission) => (
              <div key={submission.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">
                      Demande pour la {submission.year}ème année - {formatDate(submission.submittedAt)}
                    </h3>
                    <div className="mt-2 text-sm text-gray-600">
                      <p><span className="font-medium">Statut:</span> {submission.status}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {/* View details or cancel */}}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Voir détails
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Information Box */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Processus de validation</h3>
        <p className="text-sm text-blue-700">
          Après soumission, votre demande sera examinée par votre directeur de thèse, puis par le chef d'équipe,
          et enfin par le directeur du CEDoc. Vous serez notifié à chaque étape du processus.
        </p>
      </div>
    </div>
  );
};

export default DoctorantReinscriptions;