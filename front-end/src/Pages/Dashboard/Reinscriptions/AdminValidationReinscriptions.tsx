import React, { useState } from 'react';
import { User, FileText, CheckCircle, XCircle, Clock, Eye, Download, Upload } from 'lucide-react';

const AdminValidationReinscriptions = () => {
  const [userRole, setUserRole] = useState('directeur-these'); // directeur-these, co-directeur, chef-equipe, directeur-cedoc
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [validationData, setValidationData] = useState({
    etatAvancement: '',
    observations: '',
    avis: '',
    motivationRefus: ''
  });

  // Exemple de demandes en attente
  const [demandes] = useState([
    {
      id: 1,
      doctorant: {
        nom: 'ALAMI Sara',
        anneeActuelle: 3,
        anneeSouhaitee: 4,
        equipe: 'Réseaux et Télécommunications',
        directeur: 'Dr. BENALI Ahmed',
        coDirecteur: 'Dr. IDRISSI Fatima'
      },
      demande: {
        sujetThese: 'Optimisation des réseaux 5G par intelligence artificielle',
        rapportAvancement: 'Développement d\'algorithmes d\'optimisation pour les réseaux 5G...',
        planAction: 'Implémentation et tests des algorithmes développés...',
        statutProfessionnel: 'non-salarie',
        residence: 'beneficiaire',
        dateSubmission: '2025-05-15'
      },
      publications: [
        {
          journal: 'IEEE Transactions on Communications',
          date: '2025-03-10',
          auteurs: 'S. Alami, A. Benali, F. Idrissi',
          titre: 'AI-based Network Optimization for 5G Systems'
        }
      ],
      communications: [
        {
          conference: 'ICCS 2025',
          date: '2025-02-20',
          lieu: 'Casablanca',
          auteurs: 'S. Alami, A. Benali',
          titre: 'Machine Learning Approaches for 5G Optimization'
        }
      ],
      vacations: [
        {
          cours: 'Réseaux de Télécommunications',
          date: '2024-11-01',
          etablissement: 'INPT',
          duree: '24h',
          niveau: 'ingenieur'
        }
      ],
      validations: {
        directeurThese: null,
        coDirecteur: null,
        chefEquipe: null,
        directeurCedoc: null
      },
      status: 'en-attente'
    },
    {
      id: 2,
      doctorant: {
        nom: 'BENJELLOUN Omar',
        anneeActuelle: 4,
        anneeSouhaitee: 5,
        equipe: 'Systèmes Intelligents',
        directeur: 'Dr. TAZI Laila',
        coDirecteur: null
      },
      demande: {
        sujetThese: 'Apprentissage automatique pour la cybersécurité',
        rapportAvancement: 'Développement de modèles de détection d\'intrusions...',
        planAction: 'Validation expérimentale et rédaction de la thèse...',
        statutProfessionnel: 'salarie',
        residence: 'non-beneficiaire',
        dateSubmission: '2025-05-20',
        demandeDerogation: 'Demande de dérogation pour 5ème année due à des complications dans l\'accès aux données...'
      },
      publications: [
        {
          journal: 'Computer Security Journal',
          date: '2024-12-15',
          auteurs: 'O. Benjelloun, L. Tazi',
          titre: 'ML-based Intrusion Detection Systems'
        },
        {
          journal: 'Cybersecurity Review',
          date: '2025-01-10',
          auteurs: 'O. Benjelloun, L. Tazi',
          titre: 'Advanced Threat Detection using Deep Learning'
        }
      ],
      communications: [],
      vacations: [],
      validations: {
        directeurThese: { avis: 'favorable', date: '2025-05-22' },
        coDirecteur: null,
        chefEquipe: null,
        directeurCedoc: null
      },
      status: 'partiellement-validee'
    }
  ]);

  const handleValidationChange = (field, value) => {
    setValidationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const submitValidation = (demandeId, avisType) => {
    console.log('Validation soumise:', {
      demandeId,
      role: userRole,
      avis: avisType,
      data: validationData
    });
    
    if (avisType === 'favorable') {
      alert('Avis favorable enregistré avec succès !');
    } else {
      alert('Avis défavorable enregistré. Le compte du doctorant pourra être gelé selon les règles.');
    }
    
    setSelectedDemande(null);
    setValidationData({
      etatAvancement: '',
      observations: '',
      avis: '',
      motivationRefus: ''
    });
  };

  const getRoleTitle = (role) => {
    const titles = {
      'directeur-these': 'Directeur de Thèse',
      'co-directeur': 'Co-Directeur de Thèse',
      'chef-equipe': 'Chef d\'Équipe',
      'directeur-cedoc': 'Directeur du CEDoc'
    };
    return titles[role];
  };

  const getDemandesForRole = (role) => {
    return demandes.filter(demande => {
      switch (role) {
        case 'directeur-these':
          return !demande.validations.directeurThese;
        case 'co-directeur':
          return demande.doctorant.coDirecteur && !demande.validations.coDirecteur && demande.validations.directeurThese;
        case 'chef-equipe':
          return demande.validations.directeurThese && 
                 (demande.validations.coDirecteur || !demande.doctorant.coDirecteur) && 
                 !demande.validations.chefEquipe;
        case 'directeur-cedoc':
          return demande.validations.directeurThese && 
                 (demande.validations.coDirecteur || !demande.doctorant.coDirecteur) && 
                 demande.validations.chefEquipe && 
                 !demande.validations.directeurCedoc;
        default:
          return false;
      }
    });
  };

  const canValidate = (role, demande) => {
    // Logique pour déterminer si l'utilisateur peut valider cette demande
    return getDemandesForRole(role).includes(demande);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Validation des Demandes de Réinscription
        </h1>
        <p className="text-gray-600">
          Interface d'administration - Validation par les encadrants et responsables
        </p>
      </div>

      {/* Sélection du rôle */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Votre rôle :
        </label>
        <select
          value={userRole}
          onChange={(e) => setUserRole(e.target.value)}
          className="w-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="directeur-these">Directeur de Thèse</option>
          <option value="co-directeur">Co-Directeur de Thèse</option>
          <option value="chef-equipe">Chef d'Équipe</option>
          <option value="directeur-cedoc">Directeur du CEDoc</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des demandes */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">
            Demandes en attente ({getRoleTitle(userRole)})
          </h2>
          
          <div className="space-y-3">
            {getDemandesForRole(userRole).map(demande => (
              <div
                key={demande.id}
                onClick={() => setSelectedDemande(demande)}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedDemande?.id === demande.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">{demande.doctorant.nom}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    demande.doctorant.anneeSouhaitee >= 5 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {demande.doctorant.anneeSouhaitee}ème année
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{demande.doctorant.equipe}</p>
                <p className="text-xs text-gray-500">
                  Soumis le {new Date(demande.demande.dateSubmission).toLocaleDateString('fr-FR')}
                </p>
                
                {demande.doctorant.anneeSouhaitee >= 5 && (
                  <div className="mt-2 flex items-center gap-1 text-orange-600">
                    <Clock size={12} />
                    <span className="text-xs">Dérogation requise</span>
                  </div>
                )}
              </div>
            ))}
            
            {getDemandesForRole(userRole).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Clock size={48} className="mx-auto mb-2 text-gray-300" />
                <p>Aucune demande en attente pour votre rôle</p>
              </div>
            )}
          </div>
        </div>

        {/* Détails de la demande sélectionnée */}
        <div className="lg:col-span-2">
          {selectedDemande ? (
            <div className="space-y-6">
              {/* Informations du doctorant */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <User size={20} />
                  Informations du doctorant
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nom</label>
                    <p className="text-gray-900">{selectedDemande.doctorant.nom}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Année souhaitée</label>
                    <p className="text-gray-900">{selectedDemande.doctorant.anneeSouhaitee}ème année</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Équipe</label>
                    <p className="text-gray-900">{selectedDemande.doctorant.equipe}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Directeur de thèse</label>
                    <p className="text-gray-900">{selectedDemande.doctorant.directeur}</p>
                  </div>
                  {selectedDemande.doctorant.coDirecteur && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Co-Directeur</label>
                      <p className="text-gray-900">{selectedDemande.doctorant.coDirecteur}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Contenu de la demande */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FileText size={20} />
                  Contenu de la demande
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sujet de thèse</label>
                    <p className="text-gray-900 bg-white p-3 rounded border">{selectedDemande.demande.sujetThese}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rapport d'avancement</label>
                    <div className="bg-white p-3 rounded border max-h-32 overflow-y-auto">
                      <p className="text-gray-900">{selectedDemande.demande.rapportAvancement}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Plan d'action prévisionnel</label>
                    <div className="bg-white p-3 rounded border max-h-32 overflow-y-auto">
                      <p className="text-gray-900">{selectedDemande.demande.planAction}</p>
                    </div>
                  </div>

                  {selectedDemande.demande.demandeDerogation && (
                    <div>
                      <label className="block text-sm font-medium text-red-700 mb-1">Demande de dérogation</label>
                      <div className="bg-red-50 p-3 rounded border border-red-200">
                        <p className="text-red-900">{selectedDemande.demande.demandeDerogation}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Activités académiques */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Activités académiques</h2>
                
                {/* Publications */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-800 mb-3">Publications ({selectedDemande.publications.length})</h3>
                  {selectedDemande.publications.length > 0 ? (
                    <div className="space-y-2">
                      {selectedDemande.publications.map((pub, index) => (
                        <div key={index} className="bg-white p-3 rounded border">
                          <p className="font-medium text-sm">{pub.titre}</p>
                          <p className="text-sm text-gray-600">{pub.auteurs}</p>
                          <p className="text-xs text-gray-500">{pub.journal} - {new Date(pub.date).toLocaleDateString('fr-FR')}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">Aucune publication</p>
                  )}
                </div>

                {/* Communications */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-800 mb-3">Communications ({selectedDemande.communications.length})</h3>
                  {selectedDemande.communications.length > 0 ? (
                    <div className="space-y-2">
                      {selectedDemande.communications.map((comm, index) => (
                        <div key={index} className="bg-white p-3 rounded border">
                          <p className="font-medium text-sm">{comm.titre}</p>
                          <p className="text-sm text-gray-600">{comm.auteurs}</p>
                          <p className="text-xs text-gray-500">{comm.conference} - {comm.lieu} - {new Date(comm.date).toLocaleDateString('fr-FR')}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">Aucune communication</p>
                  )}
                </div>

                {/* Vacations */}
                <div>
                  <h3 className="font-medium text-gray-800 mb-3">Vacations assurées ({selectedDemande.vacations.length})</h3>
                  {selectedDemande.vacations.length > 0 ? (
                    <div className="space-y-2">
                      {selectedDemande.vacations.map((vac, index) => (
                        <div key={index} className="bg-white p-3 rounded border">
                          <p className="font-medium text-sm">{vac.cours}</p>
                          <p className="text-xs text-gray-500">
                            {vac.etablissement} - {vac.duree} - Niveau {vac.niveau} - {new Date(vac.date).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">Aucune vacation</p>
                  )}
                </div>
              </div>

              {/* Formulaire de validation */}
              {canValidate(userRole, selectedDemande) && (
                <div className="bg-white border-2 border-blue-200 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4 text-blue-800">
                    Validation ({getRoleTitle(userRole)})
                  </h2>
                  
                  <div className="space-y-4">
                    {(userRole === 'directeur-these' || userRole === 'co-directeur') && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            État d'avancement *
                          </label>
                          <select
                            value={validationData.etatAvancement}
                            onChange={(e) => handleValidationChange('etatAvancement', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                          >
                            <option value="">Sélectionner...</option>
                            <option value="bien">Bien</option>
                            <option value="moyen">Moyen</option>
                            <option value="insuffisant">Insuffisant</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Observations
                          </label>
                          <textarea
                            value={validationData.observations}
                            onChange={(e) => handleValidationChange('observations', e.target.value)}
                            rows={3}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Vos observations sur le travail du doctorant..."
                          />
                        </div>
                      </>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Avis *
                      </label>
                      <select
                        value={validationData.avis}
                        onChange={(e) => handleValidationChange('avis', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="">Sélectionner votre avis...</option>
                        <option value="favorable">Favorable</option>
                        <option value="non-favorable">Non Favorable</option>
                      </select>
                    </div>

                    {validationData.avis === 'non-favorable' && (
                      <div>
                        <label className="block text-sm font-medium text-red-700 mb-2">
                          Motivation du refus *
                        </label>
                        <textarea
                          value={validationData.motivationRefus}
                          onChange={(e) => handleValidationChange('motivationRefus', e.target.value)}
                          rows={3}
                          className="w-full p-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          placeholder="Expliquez les raisons de votre avis défavorable..."
                          required
                        />
                      </div>
                    )}

                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={() => submitValidation(selectedDemande.id, 'favorable')}
                        disabled={!validationData.avis || (userRole === 'directeur-these' && !validationData.etatAvancement)}
                        className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        <CheckCircle size={16} />
                        Donner avis favorable
                      </button>
                      
                      <button
                        onClick={() => submitValidation(selectedDemande.id, 'defavorable')}
                        disabled={!validationData.avis || (validationData.avis === 'non-favorable' && !validationData.motivationRefus)}
                        className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        <XCircle size={16} />
                        Donner avis défavorable
                      </button>
                    </div>

                    {validationData.avis === 'non-favorable' && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-800 text-sm">
                          ⚠️ <strong>Attention :</strong> Un avis défavorable ou un dépassement de délai de 12 mois 
                          peut entraîner le gel du compte du doctorant, qui pourra être archivé par le directeur du CEDoc.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Status de validation */}
              {!canValidate(userRole, selectedDemande) && (
                <div className="bg-gray-100 p-6 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">Statut de validation</h3>
                  <p className="text-gray-600 text-sm">
                    Cette demande n'est pas encore prête pour votre validation ou a déjà été traitée.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              <div className="text-center">
                <Eye size={48} className="mx-auto mb-2 text-gray-300" />
                <p>Sélectionnez une demande pour voir les détails</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminValidationReinscriptions;