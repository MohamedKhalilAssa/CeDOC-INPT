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
  content: string;
  keywords: string;
  coAuthors: number[];
}

const PublierPublication = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const swal = useAlert();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ArticleFormData>({
    defaultValues: {
      title: "",
      abstract: "",
      content: "",
      keywords: "",
      coAuthors: [],
    },
  });

  const onSubmit = async (data: ArticleFormData) => {
    setIsSubmitting(true);

    try {
      console.log("Submitting article data:", data);

      const response = await postData(
        appConfig.API_PATHS.PUBLICATIONS.publierPublication.path,
        {
          title: data.title,
          abstract: data.abstract,
          content: data.content,
          keywords: data.keywords.split(',').map(k => k.trim()),
          coAuthorsIds: data.coAuthors || [],
        }
      );

      if (response) {
        swal.toast(
          "Article publié avec succès! Il est maintenant visible dans la bibliothèque.",
          "success"
        );
        reset();
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

            {/* Content */}
            <div>
              <TextArea
                label="Contenu de l'Article"
                name="content"
                placeholder="Rédigez votre article complet ici. Vous pouvez utiliser Markdown pour la mise en forme..."
                required={true}
                control={control}
                errors={errors}
                rows={12}
                validation={{
                  required: "Le contenu de l'article est requis",
                  minLength: {
                    value: 1000,
                    message: "L'article doit contenir au moins 1000 caractères",
                  },
                }}
              />
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

            {/* Guidelines */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                <i className="fas fa-info-circle mr-2"></i>
                Conseils pour une bonne publication
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Structurez votre article clairement (introduction, méthode, résultats, discussion)</li>
                <li>• Utilisez un langage académique précis</li>
                <li>• Citez vos sources correctement</li>
                <li>• Vérifiez l'orthographe et la grammaire</li>
                <li>• Incluez des figures et tableaux si nécessaire</li>
                <li>• Obtenez l'accord de tous les co-auteurs</li>
                <li>• Respectez les directives éthiques de publication</li>
              </ul>
            </div>

            {/* File Upload (you might want to add this later) */}
            {/* <div>
              <FileUpload 
                label="Fichier PDF (optionnel)"
                name="pdfFile"
                accept=".pdf"
                control={control}
                errors={errors}
              />
            </div> */}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <Button
                variant="primary"
                size="md"
                disabled={isSubmitting}
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
                    <span className="text-blue-600 font-semibold text-xs">
                      1
                    </span>
                  </div>
                  <span>Soumission de votre article</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold text-xs">
                      2
                    </span>
                  </div>
                  <span>Vérification automatique du format</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 font-semibold text-xs">
                      3
                    </span>
                  </div>
                  <span>Publication immédiate dans la bibliothèque</span>
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