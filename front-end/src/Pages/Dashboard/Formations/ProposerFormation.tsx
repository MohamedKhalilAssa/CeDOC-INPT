import React, { useState } from 'react';
import { Upload, X, Calendar, MapPin, User, BookOpen, Clock, FileText, Users } from 'lucide-react';
import { FormationRequestDTO } from '@/Types/FormationTypes/FormationRequestDTO';
import { ModuleEnum } from '@/Types/FormationTypes/FormationEnum';
import { API, postData } from '@/Helpers/CRUDFunctions';
import appConfig from '@/public/config';
import PageBreadcrumb from '@/Components/DashComps/common/PageBreadCrumb';
import { PageMeta } from '@/Components/DashComps';

// Types and Enums
const moduleOptions = [
  { value: "IA", label: "Intelligence Artificielle" },
  { value: "DEV", label: "Développement" },
  { value: "TELECOM", label: "Réseaux & Télécoms" },
  { value: "CYBERSECURITE", label: "Cybersécurité" },
  { value: "DATA", label: "Data Science" },
  { value: "CLOUD", label: "Cloud Computing" },
  { value: "BLOCKCHAIN", label: "Blockchain" },
  { value: "ROBOTIQUE", label: "Robotique & IoT" },
];

interface FormationFieldsProps {
  formData: FormationRequestDTO;
  onChange: (field: keyof FormationRequestDTO, value: any) => void;
  errors: Record<string, string>;
}

const FormationFields: React.FC<FormationFieldsProps> = ({ formData, onChange, errors }) => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      {/* Formation Name and Module Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <BookOpen className="inline w-4 h-4 mr-2" />
            Nom de la formation
          </label>
          <input
            type="text"
            value={formData.formationName}
            onChange={(e) => onChange('formationName', e.target.value)}
            placeholder="Nom de la formation"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.formationName ? 'border-red-500' : 'border-gray-300'
            }`}
            maxLength={255}
          />
          {errors.formationName && <p className="text-red-500 text-sm mt-1">{errors.formationName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Module de la formation
          </label>
          <select
            value={formData.module}
            onChange={(e) => onChange('module', e.target.value as ModuleEnum)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.module ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Choisir une catégorie</option>
            {moduleOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {errors.module && <p className="text-red-500 text-sm mt-1">{errors.module}</p>}
        </div>
      </div>

      {/* Intitule */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <FileText className="inline w-4 h-4 mr-2" />
          Intitulé
        </label>
        <textarea
          value={formData.intitule}
          onChange={(e) => onChange('intitule', e.target.value)}
          placeholder="Décrivez l'intitulé de la formation"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
            errors.intitule ? 'border-red-500' : 'border-gray-300'
          }`}
          rows={3}
          maxLength={500}
        />
        {errors.intitule && <p className="text-red-500 text-sm mt-1">{errors.intitule}</p>}
      </div>

      {/* Formateur and Lieu Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="inline w-4 h-4 mr-2" />
            Nom du formateur
          </label>
          <input
            type="text"
            value={formData.nomFormateur}
            onChange={(e) => onChange('nomFormateur', e.target.value)}
            placeholder="Nom du formateur"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.nomFormateur ? 'border-red-500' : 'border-gray-300'
            }`}
            maxLength={255}
          />
          {errors.nomFormateur && <p className="text-red-500 text-sm mt-1">{errors.nomFormateur}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline w-4 h-4 mr-2" />
            Lieu de la formation
          </label>
          <select
            value={formData.lieu}
            onChange={(e) => onChange('lieu', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.lieu ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Sélectionner le lieu</option>
            <option value="INPT-Rabat">INPT-Rabat</option>
          </select>
          {errors.lieu && <p className="text-red-500 text-sm mt-1">{errors.lieu}</p>}
        </div>
      </div>

      {/* Date and Duration Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="inline w-4 h-4 mr-2" />
            Date de début de la Formation
          </label>
          <input
            type="date"
            value={formData.dateDebut}
            onChange={(e) => onChange('dateDebut', e.target.value)}
            min={today}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.dateDebut ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.dateDebut && <p className="text-red-500 text-sm mt-1">{errors.dateDebut}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Clock className="inline w-4 h-4 mr-2" />
            Durée (heures)
          </label>
          <input
            type="number"
            value={formData.duree}
            onChange={(e) => onChange('duree', e.target.value === "" ? "" : parseInt(e.target.value))}
            placeholder="0"
            min="1"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.duree ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.duree && <p className="text-red-500 text-sm mt-1">{errors.duree}</p>}
        </div>
      </div>

      {/* Details */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Détails supplémentaires (optionnel)
        </label>
        <textarea
          value={formData.details}
          onChange={(e) => onChange('details', e.target.value)}
          placeholder="Ajoutez des détails supplémentaires sur la formation"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={4}
          maxLength={1000}
        />
        <p className="text-sm text-gray-500 mt-1">{formData.details?.length}/1000 caractères</p>
      </div>
    </div>
  );
};

interface ImageUploaderProps {
  onImageUpload: (imagePath: string) => void;
  currentImage: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, currentImage }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner un fichier image');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('Le fichier ne doit pas dépasser 5MB');
      return;
    }

    setUploading(true);
    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);

      // Upload file
      const imagePath = await uploadImage(file);
      onImageUpload(imagePath);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Échec du téléchargement de l\'image');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onImageUpload('');
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Image de la formation (optionnel)
      </label>
      
      {(preview || currentImage) ? (
        <div className="relative">
          <img
            src={preview || currentImage}
            alt="Aperçu"
            className="w-full h-48 object-cover rounded-lg border border-gray-300"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="image-upload"
            disabled={uploading}
          />
          <label
            htmlFor="image-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <Upload className="w-12 h-12 text-gray-400 mb-4" />
            <span className="text-sm font-medium text-gray-700 mb-2">
              {uploading ? 'Téléchargement...' : 'Cliquez pour télécharger une image'}
            </span>
            <span className="text-xs text-gray-500">
              PNG, JPG, GIF jusqu'à 5MB
            </span>
          </label>
        </div>
      )}
    </div>
  );
};

// Remove DoctorantMultiSelect and replace with a simple input
interface DoctorantEmailsFieldProps {
  value: string;
  onChange: (emails: string) => void;
}

const DoctorantEmailsField: React.FC<DoctorantEmailsFieldProps> = ({ value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      <Users className="inline w-4 h-4 mr-2" />
      Emails des doctorants ciblés (séparés par des virgules, optionnel)
    </label>
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="exemple1@email.com, exemple2@email.com"
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      inputMode="text"
      autoComplete="off"
    />
    <p className="text-xs text-gray-500 mt-1">Entrez une liste d'emails séparés par des virgules.</p>
  </div>
);

interface SubmitButtonProps {
  onSubmit: () => void;
  onReset: () => void;
  isSubmitting: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onSubmit, onReset, isSubmitting }) => (
  <div className="flex justify-end space-x-4 pt-6">
    <button
      type="button"
      onClick={onReset}
      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
      disabled={isSubmitting}
    >
      Réinitialiser
    </button>
    <button
      type="button"
      onClick={onSubmit}
      disabled={isSubmitting}
      className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSubmitting ? 'Déclaration...' : 'Déclarer'}
    </button>
  </div>
);

// const uploadImage = async (file: File): Promise<string> => {
//   const formData = new FormData();
//   formData.append("file", file);

//   const response = await fetch(`${appConfig.API_PATHS.FORMATION.image.path}`, {
//     method: "POST",
//     body: formData,
//   });

//   if (!response.ok) throw new Error("Failed to upload image");

//   const data = await response.json();
//   return data.path; // assuming backend returns `{ path: "/uploads/..." }`
// };

const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await API.post<{ path: string }>(
    appConfig.API_PATHS.FORMATION.image.path, // or `/uploads/formations/images` if you added subfolder logic
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return response.data.path;
};


// Main Component
const ProposerFormation: React.FC = () => {
  const [formData, setFormData] = useState<FormationRequestDTO>({
    formationName: '',
    module: '',
    intitule: '',
    nomFormateur: '',
    dateDebut: '',
    duree: '',
    lieu: '',
    doctorantsCiblesEmails: [],
    details: '',
    image: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);


  const handleFieldChange = (field: keyof FormationRequestDTO, value: any) => {
    if (field === 'doctorantsCiblesEmails') {
      const emails = value
        .split(',')
        .map((email: string) => email.trim())
        .filter((email: string) => email.length > 0);
      setFormData(prev => ({ ...prev, [field]: emails }));
      if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
      return;
    }
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.formationName.trim()) {
      newErrors.formationName = 'Le nom de la formation est obligatoire';
    } else if (formData.formationName.length > 255) {
      newErrors.formationName = 'Le nom ne doit pas dépasser 255 caractères';
    }

    if (!formData.module) {
      newErrors.module = 'Le module est obligatoire';
    }

    if (!formData.intitule.trim()) {
      newErrors.intitule = 'L\'intitulé est obligatoire';
    } else if (formData.intitule.length > 500) {
      newErrors.intitule = 'L\'intitulé ne doit pas dépasser 500 caractères';
    }

    if (!formData.nomFormateur.trim()) {
      newErrors.nomFormateur = 'Le nom du formateur est obligatoire';
    } else if (formData.nomFormateur.length > 255) {
      newErrors.nomFormateur = 'Le nom ne doit pas dépasser 255 caractères';
    }

    if (!formData.dateDebut) {
      newErrors.dateDebut = 'La date de début est obligatoire';
    } else {
      const today = new Date().toISOString().split('T')[0];
      if (formData.dateDebut < today) {
        newErrors.dateDebut = 'La date doit être aujourd\'hui ou dans le futur';
      }
    }

    if (!formData.duree || formData.duree <= 0) {
      newErrors.duree = 'La durée doit être un nombre positif';
    }

    if (!formData.lieu.trim()) {
      newErrors.lieu = 'Le lieu est obligatoire';
    } else if (formData.lieu.length > 255) {
      newErrors.lieu = 'Le lieu ne doit pas dépasser 255 caractères';
    }

    if ((formData.details ?? '').length > 1000) {
      newErrors.details = 'Les détails ne doivent pas dépasser 1000 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setNotification(null);
    try {
      await postData(
        appConfig.API_PATHS.FORMATION.postFormation.path,
        formData
      );
      setNotification({ type: 'success', message: 'Formation déclarée avec succès!' });
      setTimeout(() => {
        handleReset();
      }, 1200);
    } catch (error) {
      console.error('Submission failed:', error);
      setNotification({ type: 'error', message: 'Erreur lors de la déclaration de la formation' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      formationName: '',
      module: '',
      intitule: '',
      nomFormateur: '',
      dateDebut: '',
      duree: '',
      lieu: '',
      doctorantsCiblesEmails: [],
      details: '',
      image: '',
    });
    setErrors({});
  };

  return (
    <>
      <PageMeta title="Déclarer une formation" description="Proposer une nouvelle formation" />
      <PageBreadcrumb pageTitle="Déclarer une formation" />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Notification */}
          {notification && (
            <div className={`mb-4 px-4 py-3 rounded ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {notification.message}
            </div>
          )}

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <FormationFields
                formData={formData}
                onChange={handleFieldChange}
                errors={errors}
              />

              <ImageUploader
                onImageUpload={(imagePath) => handleFieldChange('image', imagePath)}
                currentImage={formData.image ?? ""}
              />

              <DoctorantEmailsField
                value={formData.doctorantsCiblesEmails?.join(', ') || ""}
                onChange={emails => handleFieldChange('doctorantsCiblesEmails', emails)}
              />

              <SubmitButton
                onSubmit={handleSubmit}
                onReset={handleReset}
                isSubmitting={isSubmitting}
              />

              {/* Loading Spinner */}
              {isSubmitting && (
                <div className="flex justify-center pt-4">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProposerFormation;