import React, { useState, useEffect } from 'react';
import { Upload, Calendar, User, FileText, AlertCircle, X, Check, Clock, XCircle } from 'lucide-react';

const DoctorantReinscriptions = () => {
  const [formData, setFormData] = useState({
    sujetThese: '',
    equipe: '',
    directeurThese: '',
    coDirecteurThese: '',
    rapportAvancement: '',
    planAction: '',
    statutProfessionnel: '',
    residence: '',
    etablissementCotutelle: '',
    lieuCotutelle: '',
    professeurCotutelle: '',
    anneeInscription: '',
    demandeDerogation: ''
  });

  const [files, setFiles] = useState({
    attestationHonneur: null,
    certificatNonTravail: null
  });

  const [currentYear, setCurrentYear] = useState(3);
  const [showDeadlineWarning, setShowDeadlineWarning] = useState(true);
  const [status, setStatus] = useState('non_soumise'); // non_soumise, en_attente, validee_directeur, validee_chef, validee_cedoc, refusee
  const [avisDirecteur, setAvisDirecteur] = useState('');
  const [avisChefEquipe, setAvisChefEquipe] = useState('');
  const [avisCedoc, setAvisCedoc] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (fileType, file) => {
    setFiles(prev => ({
      ...prev,
      [fileType]: file
    }));
  };

  const validateForm = () => {
    const required = ['sujetThese', 'equipe', 'directeurThese', 'rapportAvancement', 'planAction', 'statutProfessionnel', 'residence'];
    const missing = required.filter(field => !formData[field]);
    
    // Check for required files for non-salaried residence beneficiaries
    if (formData.statutProfessionnel === 'non-salarie' && formData.residence === 'beneficiaire') {
      if (!files.attestationHonneur) missing.push('attestation sur l\'honneur');
      if (!files.certificatNonTravail) missing.push('certificat de non-travail');
    }

    // Check for derogation request for 5th/6th year
    if (currentYear >= 5 && !formData.demandeDerogation) {
      missing.push('demande de dérogation');
    }

    return missing;
  };

  const isFormValid = validateForm().length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log('Formulaire soumis:', formData, files);
      setStatus('en_attente');
      alert('Demande de réinscription soumise avec succès ! Elle sera maintenant examinée par votre directeur de thèse.');
    }
  };

  const renderStatusBadge = () => {
    switch (status) {
      case 'non_soumise':
        return null;
      case 'en_attente':
        return (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
            <Clock className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
            <div className="flex-1">
              <h3 className="font-semibold text-blue-800">Demande en attente</h3>
              <p className="text-blue-700 text-sm">
                Votre demande est en cours d'examen par votre directeur de thèse.
              </p>
            </div>
          </div>
        );
      case 'validee_directeur':
        return (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <Check className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
            <div className="flex-1">
              <h3 className="font-semibold text-green-800">Validée par le directeur de thèse</h3>
              <p className="text-green-700 text-sm">
                Votre demande a été approuvée par votre directeur de thèse et est maintenant en attente de validation par le chef d'équipe.
              </p>
              {avisDirecteur && (
                <p className="mt-2 text-green-700 text-sm">
                  <span className="font-medium">Commentaire :</span> {avisDirecteur}
                </p>
              )}
            </div>
          </div>
        );
      case 'validee_chef':
        return (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <Check className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
            <div className="flex-1">
              <h3 className="font-semibold text-green-800">Validée par le chef d'équipe</h3>
              <p className="text-green-700 text-sm">
                Votre demande a été approuvée par le chef d'équipe et est maintenant en attente de validation finale par le CEDoc.
              </p>
              {avisChefEquipe && (
                <p className="mt-2 text-green-700 text-sm">
                  <span className="font-medium">Commentaire :</span> {avisChefEquipe}
                </p>
              )}
            </div>
          </div>
        );
      case 'validee_cedoc':
        return (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <Check className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
            <div className="flex-1">
              <h3 className="font-semibold text-green-800">Demande finalement validée</h3>
              <p className="text-green-700 text-sm">
                Félicitations ! Votre demande de réinscription a été validée par le CEDoc.
              </p>
              {avisCedoc && (
                <p className="mt-2 text-green-700 text-sm">
                  <span className="font-medium">Commentaire :</span> {avisCedoc}
                </p>
              )}
            </div>
          </div>
        );
      case 'refusee':
        return (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <XCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
            <div className="flex-1">
              <h3 className="font-semibold text-red-800">Demande refusée</h3>
              <p className="text-red-700 text-sm">
                Votre demande de réinscription a été refusée.
              </p>
              {(avisDirecteur || avisChefEquipe || avisCedoc) && (
                <p className="mt-2 text-red-700 text-sm">
                  <span className="font-medium">Motif du refus :</span> {avisDirecteur || avisChefEquipe || avisCedoc}
                </p>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Simulate the validation process (in a real app, this would be API calls)
  const handleDirecteurValidation = (approve, comment = '') => {
    if (approve) {
      setStatus('validee_directeur');
      setAvisDirecteur(comment);
    } else {
      setStatus('refusee');
      setAvisDirecteur(comment);
    }
  };

  const handleChefEquipeValidation = (approve, comment = '') => {
    if (approve) {
      setStatus('validee_chef');
      setAvisChefEquipe(comment);
    } else {
      setStatus('refusee');
      setAvisChefEquipe(comment);
    }
  };

  const handleCedocValidation = (approve, comment = '') => {
    if (approve) {
      setStatus('validee_cedoc');
      setAvisCedoc(comment);
    } else {
      setStatus('refusee');
      setAvisCedoc(comment);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Demande de Réinscription en Doctorat
        </h1>
        <p className="text-gray-600">
          Formulaire à remplir par le doctorant - Année universitaire {new Date().getFullYear()}/{new Date().getFullYear()+1}
        </p>
      </div>

      {showDeadlineWarning && status === 'non_soumise' && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
          <div className="flex-1">
            <h3 className="font-semibold text-amber-800">Date limite importante</h3>
            <p className="text-amber-700 text-sm">
              Cette demande doit être complétée avant la date précisée par le directeur du CEDoc.
            </p>
          </div>
          <button
            onClick={() => setShowDeadlineWarning(false)}
            className="text-amber-600 hover:text-amber-800"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {renderStatusBadge()}

      {status === 'non_soumise' ? (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informations de base */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <User size={20} />
              Informations de base
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Année d'inscription souhaitée *
                </label>
                <select
                  value={currentYear}
                  onChange={(e) => setCurrentYear(parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value={2}>2ème année</option>
                  <option value={3}>3ème année</option>
                  <option value={4}>4ème année</option>
                  <option value={5}>5ème année</option>
                  <option value={6}>6ème année</option>
                </select>
                {currentYear >= 4 && (
                  <p className="text-sm text-orange-600 mt-1">
                    Pour la 4ème année, vous devez obligatoirement avoir au minimum une publication.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sujet de thèse *
                </label>
                <input
                  type="text"
                  value={formData.sujetThese}
                  onChange={(e) => handleInputChange('sujetThese', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Vous pouvez modifier le sujet si nécessaire"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Équipe *
                </label>
                <input
                  type="text"
                  value={formData.equipe}
                  onChange={(e) => handleInputChange('equipe', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Changement d'équipe possible (demande au directeur CEDoc)"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Directeur de thèse *
                </label>
                <input
                  type="text"
                  value={formData.directeurThese}
                  onChange={(e) => handleInputChange('directeurThese', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Possible de switcher avec le co-directeur"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Co-Directeur de thèse
                </label>
                <input
                  type="text"
                  value={formData.coDirecteurThese}
                  onChange={(e) => handleInputChange('coDirecteurThese', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Possible de switcher avec le directeur"
                />
              </div>
            </div>
          </div>

          {/* Rapport d'avancement */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText size={20} />
              Rapport d'avancement *
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Résumé de la thèse (incluant la problématique) + Travaux réalisés *
                </label>
                <textarea
                  value={formData.rapportAvancement}
                  onChange={(e) => handleInputChange('rapportAvancement', e.target.value)}
                  rows={8}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Décrivez votre problématique, les travaux réalisés jusqu'à présent, et l'état d'avancement de votre thèse..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plan d'action prévisionnel des travaux de recherche *
                </label>
                <textarea
                  value={formData.planAction}
                  onChange={(e) => handleInputChange('planAction', e.target.value)}
                  rows={6}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Décrivez votre plan de travail prévu pour la prochaine année universitaire..."
                  required
                />
              </div>
            </div>
          </div>

          {/* Statut professionnel */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Statut professionnel et résidence</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Statut Professionnel actuel *
                </label>
                <select
                  value={formData.statutProfessionnel}
                  onChange={(e) => handleInputChange('statutProfessionnel', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Sélectionner...</option>
                  <option value="salarie">Salarié</option>
                  <option value="non-salarie">Non salarié</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Résidence *
                </label>
                <select
                  value={formData.residence}
                  onChange={(e) => handleInputChange('residence', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Sélectionner...</option>
                  <option value="beneficiaire">Bénéficiaire</option>
                  <option value="non-beneficiaire">Non bénéficiaire</option>
                </select>
              </div>
            </div>

            {formData.statutProfessionnel === 'non-salarie' && formData.residence === 'beneficiaire' && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-3">Documents requis pour non-salariés bénéficiaires de la résidence</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Attestation sur l'honneur (PDF) *
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileUpload('attestationHonneur', e.target.files[0])}
                        className="hidden"
                        id="attestation"
                      />
                      <label
                        htmlFor="attestation"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                      >
                        <Upload size={16} />
                        Choisir fichier
                      </label>
                      {files.attestationHonneur && (
                        <span className="text-sm text-green-600">
                          ✓ {files.attestationHonneur.name}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Certificat de non-travail (PDF) *
                    </label>
                    <p className="text-xs text-gray-600 mb-2">Délivré par les autorités compétentes</p>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileUpload('certificatNonTravail', e.target.files[0])}
                        className="hidden"
                        id="certificat"
                      />
                      <label
                        htmlFor="certificat"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                      >
                        <Upload size={16} />
                        Choisir fichier
                      </label>
                      {files.certificatNonTravail && (
                        <span className="text-sm text-green-600">
                          ✓ {files.certificatNonTravail.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cotutelle */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Cotutelle avec un établissement partenaire (si applicable)</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de l'établissement de cotutelle
                </label>
                <input
                  type="text"
                  value={formData.etablissementCotutelle}
                  onChange={(e) => handleInputChange('etablissementCotutelle', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lieu de l'établissement
                </label>
                <input
                  type="text"
                  value={formData.lieuCotutelle}
                  onChange={(e) => handleInputChange('lieuCotutelle', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du professeur assurant la cotutelle
                </label>
                <input
                  type="text"
                  value={formData.professeurCotutelle}
                  onChange={(e) => handleInputChange('professeurCotutelle', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Dérogation pour 5ème/6ème année */}
          {(currentYear >= 5) && (
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h2 className="text-xl font-semibold mb-4 text-red-800">
                Demande de dérogation exceptionnelle ({currentYear}ème année)
              </h2>
              <p className="text-red-700 text-sm mb-4">
                {currentYear === 5 
                  ? "Demande de dérogation adressée au directeur du CEDOC"
                  : "Demande de dérogation adressée au directeur de l'INPT"
                }
              </p>
              <textarea
                value={formData.demandeDerogation}
                onChange={(e) => handleInputChange('demandeDerogation', e.target.value)}
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Justifiez de manière détaillée votre demande de dérogation pour cette année supplémentaire..."
                required
              />
            </div>
          )}

          {/* Validation et soumission */}
          <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Validation du formulaire</h2>
            
            {!isFormValid && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="font-medium text-red-800 mb-2">Champs obligatoires manquants :</h3>
                <ul className="text-red-700 text-sm space-y-1">
                  {validateForm().map((field, index) => (
                    <li key={index}>• {field}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">Prochaines étapes :</h3>
              <ol className="text-blue-700 text-sm space-y-1">
                <li>1. Votre directeur de thèse donnera son avis (Favorable/Non favorable)</li>
                <li>2. Votre co-directeur de thèse (si applicable) donnera son avis</li>
                <li>3. Le chef de l'équipe approuvera la demande</li>
                <li>4. Le directeur du CEDoc validera finalement votre réinscription</li>
              </ol>
            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                isFormValid
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isFormValid ? 'Soumettre la demande de réinscription' : 'Veuillez compléter tous les champs obligatoires'}
            </button>

            {isFormValid && (
              <p className="text-center text-sm text-gray-600 mt-2">
                Une fois soumise, votre demande sera transmise à votre directeur de thèse pour avis.
              </p>
            )}
          </div>
        </form>
      ) : (
        <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">État de votre demande</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className={`rounded-full p-2 ${status === 'en_attente' ? 'bg-blue-100 text-blue-600' : 
                                status === 'validee_directeur' || status === 'validee_chef' || status === 'validee_cedoc' ? 
                                'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {status === 'en_attente' ? <Clock size={20} /> : 
                 status === 'validee_directeur' || status === 'validee_chef' || status === 'validee_cedoc' ? 
                 <Check size={20} /> : <XCircle size={20} />}
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Étape 1 : Validation par le directeur de thèse</h3>
                <p className="text-gray-600 text-sm">
                  {status === 'en_attente' ? 'En attente de validation...' : 
                   status === 'validee_directeur' || status === 'validee_chef' || status === 'validee_cedoc' ? 
                   'Validé' : 'Refusé'}
                </p>
                {avisDirecteur && (
                  <p className="text-gray-600 text-sm mt-1">
                    <span className="font-medium">Commentaire :</span> {avisDirecteur}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className={`rounded-full p-2 ${status === 'en_attente' || status === 'validee_directeur' ? 
                                'bg-gray-100 text-gray-400' : 
                                status === 'validee_chef' || status === 'validee_cedoc' ? 
                                'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {status === 'en_attente' || status === 'validee_directeur' ? <Clock size={20} /> : 
                 status === 'validee_chef' || status === 'validee_cedoc' ? <Check size={20} /> : <XCircle size={20} />}
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Étape 2 : Validation par le chef d'équipe</h3>
                <p className="text-gray-600 text-sm">
                  {status === 'en_attente' || status === 'validee_directeur' ? 'Pas encore traité' : 
                   status === 'validee_chef' || status === 'validee_cedoc' ? 'Validé' : 'Refusé'}
                </p>
                {avisChefEquipe && (
                  <p className="text-gray-600 text-sm mt-1">
                    <span className="font-medium">Commentaire :</span> {avisChefEquipe}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className={`rounded-full p-2 ${status === 'en_attente' || status === 'validee_directeur' || status === 'validee_chef' ? 
                                'bg-gray-100 text-gray-400' : 
                                status === 'validee_cedoc' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {status === 'en_attente' || status === 'validee_directeur' || status === 'validee_chef' ? <Clock size={20} /> : 
                 status === 'validee_cedoc' ? <Check size={20} /> : <XCircle size={20} />}
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Étape 3 : Validation finale par le CEDoc</h3>
                <p className="text-gray-600 text-sm">
                  {status === 'en_attente' || status === 'validee_directeur' || status === 'validee_chef' ? 'Pas encore traité' : 
                   status === 'validee_cedoc' ? 'Validé' : 'Refusé'}
                </p>
                {avisCedoc && (
                  <p className="text-gray-600 text-sm mt-1">
                    <span className="font-medium">Commentaire :</span> {avisCedoc}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorantReinscriptions;