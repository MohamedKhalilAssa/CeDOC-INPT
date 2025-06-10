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

interface SujetFormData {
  intitule: string;
  description: string;
  professeurs: number[];
}

const CreateSujetsChefEquipe = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const swal = useAlert();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SujetFormData>({
    defaultValues: {
      intitule: "",
      description: "",
      professeurs: [],
    },
  });

  const onSubmit = async (data: SujetFormData) => {
    setIsSubmitting(true);

    try {
      console.log("Creating subject data:", data);

      // Use the createSujet API endpoint from config
      const response = await postData(
        appConfig.API_PATHS.CHEFS_EQUIPES.createSujet.path,
        {
          intitule: data.intitule,
          description: data.description,
          professeursIds: data.professeurs || [],
        }
      );

      if (response) {
        swal.toast(
          "Sujet créé avec succès! Il est maintenant disponible pour les candidats.",
          "success"
        );
        reset();
        // Redirect to sujets des membres d'équipe
        setTimeout(() => {
          navigate("/dashboard/sujets/membres-equipe");
        }, 1500);
      }
    } catch (error: any) {
      console.error("Error creating subject:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        error?.errors ||
        "Erreur lors de la création du sujet";
      swal.toast(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <PageMeta
        title="Créer un Sujet - CeDoc INPT"
        description="Créer un nouveau sujet de thèse directement validé"
      />

      <PageBreadcrumb pageTitle="Créer un Sujet" />

      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <HeaderCard
          title="Créer un Nouveau Sujet"
          description="En tant que Chef d'Équipe, créez directement un sujet de thèse validé qui sera immédiatement disponible pour les candidats."
          icon="fa-plus-circle"
        />

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Subject Title */}
            <div>
              <InputField
                label="Intitulé du Sujet"
                name="intitule"
                type="text"
                placeholder="Saisissez l'intitulé de votre sujet de thèse"
                required={true}
                control={control}
                errors={errors}
                validation={{
                  required: "L'intitulé du sujet est requis",
                  minLength: {
                    value: 10,
                    message: "L'intitulé doit contenir au moins 10 caractères",
                  },
                  maxLength: {
                    value: 200,
                    message: "L'intitulé ne peut pas dépasser 200 caractères",
                  },
                }}
              />
            </div>

            {/* Subject Description */}
            <div>
              <TextArea
                label="Description du Sujet"
                name="description"
                placeholder="Décrivez en détail votre sujet de thèse: contexte, objectifs, méthodologie, résultats attendus..."
                required={true}
                control={control}
                errors={errors}
                rows={8}
                validation={{
                  required: "La description du sujet est requise",
                  minLength: {
                    value: 100,
                    message:
                      "La description doit contenir au moins 100 caractères",
                  },
                  maxLength: {
                    value: 2000,
                    message:
                      "La description ne peut pas dépasser 2000 caractères",
                  },
                }}
              />
            </div>

            {/* Professor Search */}
            <div>
              <ProfesseurSearch
                control={control}
                errors={errors}
                name="professeurs"
                label="Professeurs Participants"
                placeholder="Rechercher des professeurs par nom ou email..."
              />
            </div>

            {/* Chef d'Équipe Privileges Information */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <h3 className="font-semibold text-emerald-900 mb-2 flex items-center">
                <i className="fas fa-crown mr-2"></i>
                Privilèges de Chef d'Équipe
              </h3>
              <ul className="text-sm text-emerald-800 space-y-1">
                <li>• Votre sujet sera automatiquement validé et publié</li>
                <li>• Aucune validation supplémentaire requise</li>
                <li>
                  • Le sujet sera immédiatement visible pour les candidats
                </li>
                <li>
                  • Vous pouvez modifier ou supprimer le sujet à tout moment
                </li>
              </ul>
            </div>

            {/* Guidelines */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                <i className="fas fa-lightbulb mr-2"></i>
                Conseils pour un sujet de qualité
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Rédigez un intitulé clair et précis</li>
                <li>• Présentez le contexte scientifique</li>
                <li>• Définissez les objectifs principaux</li>
                <li>• Décrivez la méthodologie envisagée</li>
                <li>• Précisez les compétences et prérequis</li>
                <li>• Mentionnez les ressources disponibles</li>
                <li>• Sélectionnez les professeurs collaborateurs</li>
              </ul>
            </div>

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
                    Création en cours...
                  </>
                ) : (
                  <>
                    <i className="fas fa-plus-circle mr-2"></i>
                    Créer le Sujet
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

            {/* Status Information for Chef d'Équipe */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">
                Processus de création directe
              </h4>
              <div className="text-sm text-gray-600 space-y-2">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-emerald-600 font-semibold text-xs">
                      1
                    </span>
                  </div>
                  <span>Création et validation automatique</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-emerald-600 font-semibold text-xs">
                      2
                    </span>
                  </div>
                  <span>Publication immédiate pour les candidats</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-emerald-600 font-semibold text-xs">
                      3
                    </span>
                  </div>
                  <span>Gestion complète dans vos sujets d'équipe</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateSujetsChefEquipe;
