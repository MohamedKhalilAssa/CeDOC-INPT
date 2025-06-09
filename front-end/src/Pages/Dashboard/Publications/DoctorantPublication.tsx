import PageBreadcrumb from "@/Components/DashComps/common/PageBreadCrumb";
import PageMeta from "@/Components/DashComps/common/PageMeta";
import Button from "@/Components/DashComps/ui/button/Button";
import { HeaderCard } from "@/Components/Form/HeaderCard";
import InputField from "@/Components/Form/InputField";
import ProfesseurSearch from "@/Components/Form/ProfesseurSearch";
import TextArea from "@/Components/Form/TextArea";
import { postData } from "@/Helpers/CRUDFunctions";
import { useAlert } from "@/Hooks/UseAlert";
import appConfig from "@/public/config";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface ArticleFormData {
  title: string;
  abstract: string;
  contentFile: File | null; // PDF file for publication content
  keywords: string;
  coAuthors: number[];
  // Journal indexation fields
  isIndexedJournal: boolean;
  journalName: string;
  publicationDate: string;
  indexingProof: string; // URL or file path
  indexingProofFile: File | null;
  // Awards and distinctions
  awards: string;
  awardsProof: string; // URL or file path
  awardsProofFile: File | null;
}

const PublierPublication = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contentFile, setContentFile] = useState<File | null>(null);
  const [indexingProofFile, setIndexingProofFile] = useState<File | null>(null);
  const [awardsProofFile, setAwardsProofFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const swal = useAlert();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ArticleFormData>({
    defaultValues: {
      title: "",
      abstract: "",
      contentFile: null,
      keywords: "",
      coAuthors: [],
      isIndexedJournal: false,
      journalName: "",
      publicationDate: "",
      indexingProof: "",
      indexingProofFile: null,
      awards: "",
      awardsProof: "",
      awardsProofFile: null,
    },
  });

  const isIndexedJournal = watch("isIndexedJournal");

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'content' | 'indexing' | 'awards'
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (type === 'content') {
        setContentFile(file);
        setValue("contentFile", file);
      } else if (type === 'indexing') {
        setIndexingProofFile(file);
        setValue("indexingProofFile", file);
      } else {
        setAwardsProofFile(file);
        setValue("awardsProofFile", file);
      }
    }
  };

  const onSubmit = async (data: ArticleFormData) => {
    setIsSubmitting(true);

    try {
      console.log("Submitting article data:", data);

      // Create FormData for file uploads
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("abstract", data.abstract);
      formData.append("keywords", JSON.stringify(data.keywords.split(',').map(k => k.trim())));
      formData.append("coAuthorsIds", JSON.stringify(data.coAuthors || []));
      formData.append("isIndexedJournal", data.isIndexedJournal.toString());
      
      // Add content PDF file
      if (contentFile) {
        formData.append("contentFile", contentFile);
      }
      
      if (data.isIndexedJournal) {
        formData.append("journalName", data.journalName);
        formData.append("publicationDate", data.publicationDate);
        formData.append("indexingProof", data.indexingProof);
        if (indexingProofFile) {
          formData.append("indexingProofFile", indexingProofFile);
        }
      }

      if (data.awards) {
        formData.append("awards", data.awards);
        formData.append("awardsProof", data.awardsProof);
        if (awardsProofFile) {
          formData.append("awardsProofFile", awardsProofFile);
        }
      }

      const response = await postData(
        appConfig.API_PATHS.PUBLICATIONS.publierPublication.path,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response) {
        swal.toast(
          "Article publié avec succès! Il est maintenant visible dans la bibliothèque.",
          "success"
        );
        reset();
        setContentFile(null);
        setIndexingProofFile(null);
        setAwardsProofFile(null);
        setTimeout(() => {
          navigate("/publications");
        }, 1500);
      }
    } catch (error: any) {
      console.error("Error submitting article:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        error?.errors ||
        "Erreur lors de la publication de l'article";
      swal.toast(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <PageMeta
        title="Publier un Article - CeDoc INPT"
        description="Publier un nouvel article scientifique"
      />

      <PageBreadcrumb pageTitle="publier un Article" />

      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <HeaderCard
          title="Publier un Nouvel Article"
          description="Partagez vos recherches et découvertes avec la communauté académique. Votre article sera disponible dans la bibliothèque après soumission."
          icon="fa-file-alt"
        />
        
        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Article Title */}
            <div>
              <InputField
                label="Titre de l'Article"
                name="title"
                type="text"
                placeholder="Saisissez le titre de votre article"
                required={true}
                control={control}
                errors={errors}
                validation={{
                  required: "Le titre de l'article est requis",
                  minLength: {
                    value: 10,
                    message: "Le titre doit contenir au moins 10 caractères",
                  },
                  maxLength: {
                    value: 200,
                    message: "Le titre ne peut pas dépasser 200 caractères",
                  },
                }}
              />
            </div>

            {/* Keywords */}
            <div>
              <InputField
                label="Mots-clés (séparés par des virgules)"
                name="keywords"
                type="text"
                placeholder="Ex: intelligence artificielle, apprentissage automatique, réseaux de neurones"
                required={true}
                control={control}
                errors={errors}
                validation={{
                  required: "Les mots-clés sont requis",
                }}
              />
            </div>

            {/* Abstract */}
            <div>
              <TextArea
                label="Résumé"
                name="abstract"
                placeholder="Fournissez un résumé concis de votre article (150-250 mots)..."
                required={true}
                control={control}
                errors={errors}
                rows={4}
                validation={{
                  required: "Le résumé est requis",
                  minLength: {
                    value: 150,
                    message: "Le résumé doit contenir au moins 150 caractères",
                  },
                  maxLength: {
                    value: 500,
                    message: "Le résumé ne peut pas dépasser 500 caractères",
                  },
                }}
              />
            </div>

            {/* Content PDF Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contenu de l'Article (PDF) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf"
                  required
                  onChange={(e) => handleFileUpload(e, 'content')}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100 border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-green-400 transition-colors"
                />
                {contentFile ? (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm text-green-700 flex items-center">
                      <i className="fas fa-file-pdf mr-2"></i>
                      <span className="font-medium">Fichier sélectionné:</span>
                      <span className="ml-1">{contentFile.name}</span>
                      <span className="ml-2 text-xs text-green-600">
                        ({(contentFile.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </p>
                  </div>
                ) : (
                  <div className="mt-2 text-center">
                    <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-2"></i>
                    <p className="text-sm text-gray-500">
                      Glissez votre fichier PDF ici ou cliquez pour parcourir
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Taille maximale: 10MB
                    </p>
                  </div>
                )}
              </div>
              {!contentFile && (
                <p className="mt-2 text-sm text-red-600">
                  <i className="fas fa-exclamation-circle mr-1"></i>
                  Le fichier PDF du contenu est obligatoire
                </p>
              )}
            </div>

            {/* Co-authors Search */}
            <div>
              <ProfesseurSearch
                control={control}
                errors={errors}
                name="coAuthors"
                label="Co-auteurs"
                placeholder="Rechercher des co-auteurs par nom ou email..."
              />
            </div>

            {/* Journal Indexation Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <i className="fas fa-journal-whills mr-2 text-blue-600"></i>
                Publication dans un Journal Indexé
              </h3>
              
              {/* Checkbox for indexed journal */}
              <div className="mb-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    {...control.register("isIndexedJournal")}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Cette publication est réalisée dans un journal indexé (référencé)
                  </span>
                </label>
              </div>

              {isIndexedJournal && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-4">
                  {/* Journal Name */}
                  <div>
                    <InputField
                      label="Nom du Journal"
                      name="journalName"
                      type="text"
                      placeholder="Ex: Nature, Science, IEEE Transactions..."
                      required={isIndexedJournal}
                      control={control}
                      errors={errors}
                      validation={{
                        required: isIndexedJournal ? "Le nom du journal est requis" : false,
                      }}
                    />
                  </div>

                  {/* Publication Date */}
                  <div>
                    <InputField
                      label="Date de Publication"
                      name="publicationDate"
                      type="date"
                      required={isIndexedJournal}
                      control={control}
                      errors={errors}
                      validation={{
                        required: isIndexedJournal ? "La date de publication est requise" : false,
                      }}
                    />
                  </div>

                  {/* Indexing Proof URL */}
                  <div>
                    <InputField
                      label="Lien de Justification (URL)"
                      name="indexingProof"
                      type="url"
                      placeholder="https://example.com/article-link"
                      control={control}
                      errors={errors}
                    />
                  </div>

                  {/* Indexing Proof File Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ou télécharger un justificatif PDF
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileUpload(e, 'indexing')}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-gray-300 rounded-md"
                      />
                      {indexingProofFile && (
                        <p className="mt-2 text-sm text-green-600">
                          <i className="fas fa-check-circle mr-1"></i>
                          Fichier sélectionné: {indexingProofFile.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Awards and Distinctions Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <i className="fas fa-trophy mr-2 text-yellow-600"></i>
                Prix et Distinctions
              </h3>
              
              {/* Awards Description */}
              <div>
                <TextArea
                  label="Description des Prix et Distinctions"
                  name="awards"
                  placeholder="Décrivez les prix, distinctions ou reconnaissances reçues en relation avec cette publication..."
                  control={control}
                  errors={errors}
                  rows={3}
                />
              </div>

              {/* Awards Proof URL */}
              <div className="mt-4">
                <InputField
                  label="Lien de Justification (URL)"
                  name="awardsProof"
                  type="url"
                  placeholder="https://example.com/award-link"
                  control={control}
                  errors={errors}
                />
              </div>

              {/* Awards Proof File Upload */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ou télécharger un justificatif PDF
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(e, 'awards')}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100 border border-gray-300 rounded-md"
                  />
                  {awardsProofFile && (
                    <p className="mt-2 text-sm text-green-600">
                      <i className="fas fa-check-circle mr-1"></i>
                      Fichier sélectionné: {awardsProofFile.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Guidelines */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                <i className="fas fa-info-circle mr-2"></i>
                Conseils pour une bonne publication
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Assurez-vous que votre PDF est de haute qualité et lisible</li>
                <li>• Structurez votre article clairement (introduction, méthode, résultats, discussion)</li>
                <li>• Utilisez un langage académique précis</li>
                <li>• Citez vos sources correctement</li>
                <li>• Vérifiez l'orthographe et la grammaire</li>
                <li>• Incluez des figures et tableaux si nécessaire</li>
                <li>• Obtenez l'accord de tous les co-auteurs</li>
                <li>• Respectez les directives éthiques de publication</li>
                <li>• Pour les journaux indexés, vérifiez le facteur d'impact et l'indexation</li>
                <li>• Conservez tous les justificatifs de publication et prix</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <Button
                variant="primary"
                size="md"
                disabled={isSubmitting || !contentFile}
                className="flex-1 sm:flex-none"
                onClick={handleSubmit(onSubmit)}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Publication en cours...
                  </>
                ) : (
                  <>
                    <i className="fas fa-upload mr-2"></i>
                    Publier l'Article
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                size="md"
                disabled={isSubmitting}
                className="flex-1 sm:flex-none"
                onClick={() => {
                  reset();
                  setContentFile(null);
                  setIndexingProofFile(null);
                  setAwardsProofFile(null);
                  swal.toast("Formulaire réinitialisé", "info");
                }}
              >
                <i className="fas fa-undo mr-2"></i>
                Réinitialiser
              </Button>
            </div>

            {/* Status Information */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">
                Processus de publication
              </h4>
              <div className="text-sm text-gray-600 space-y-2">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold text-xs">1</span>
                  </div>
                  <span>Soumission de votre article avec justificatifs</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold text-xs">2</span>
                  </div>
                  <span>Vérification automatique du format et des justificatifs</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 font-semibold text-xs">3</span>
                  </div>
                  <span>Publication avec badges de qualité (journal indexé, prix)</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PublierPublication;