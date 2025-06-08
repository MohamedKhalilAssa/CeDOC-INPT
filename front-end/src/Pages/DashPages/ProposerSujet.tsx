import PageBreadcrumb from "@/Components/DashComps/common/PageBreadCrumb";
import PageMeta from "@/Components/DashComps/common/PageMeta";
import Button from "@/Components/DashComps/ui/button/Button";
import InputField from "@/Components/Form/InputField";
import TextArea from "@/Components/Form/TextArea";
import { postData } from "@/Helpers/CRUDFunctions";
import { useAlert } from "@/Hooks/UseAlert";
import { useAuth } from "@/Hooks/UseAuth";
import appConfig from "@/public/config";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface SujetFormData {
  intitule: string;
  description: string;
}

const ProposerSujet = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const swal = useAlert();
  const auth = useAuth();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SujetFormData>();
  const onSubmit = async (data: SujetFormData) => {
    setIsSubmitting(true);

    try {
      console.log("Submitting subject data:", data);

      // Use the correct API endpoint from config
      const response = await postData(
        appConfig.API_PATHS.SUJET.createSujet.path,
        {
          intitule: data.intitule,
          description: data.description,
        }
      );

      if (response) {
        swal.toast(
          "Sujet proposé avec succès! Il sera visible après validation.",
          "success"
        );
        reset();
        // Optionally redirect to dashboard or subjects list
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      }
    } catch (error: any) {
      console.error("Error submitting subject:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Erreur lors de la proposition du sujet";
      swal.toast(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <PageMeta
        title="Proposer un Sujet - CeDoc INPT"
        description="Proposer un nouveau sujet de thèse"
      />

      <PageBreadcrumb pageTitle="Proposer un Sujet" />

      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-lightbulb text-blue-600 text-xl"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Proposer un Nouveau Sujet
              </h1>
              <p className="text-gray-600">
                Soumettez votre proposition de sujet de thèse. Après validation
                par l'équipe académique, votre sujet sera disponible pour les
                candidats.
              </p>
            </div>
          </div>
        </div>

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

            {/* Guidelines */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                <i className="fas fa-info-circle mr-2"></i>
                Conseils pour une bonne proposition
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Soyez précis et clair dans votre intitulé</li>
                <li>• Décrivez le contexte et la problématique</li>
                <li>• Mentionnez les objectifs principaux</li>
                <li>• Indiquez la méthodologie envisagée</li>
                <li>• Précisez les compétences requises</li>
                <li>• Estimez la durée et les ressources nécessaires</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
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
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane mr-2"></i>
                    Proposer le Sujet
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

              <Button
                variant="outline"
                size="md"
                disabled={isSubmitting}
                className="flex-1 sm:flex-none"
                onClick={() => navigate(-1)}
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Retour
              </Button>
            </div>

            {/* Status Information */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">
                Processus de validation
              </h4>
              <div className="text-sm text-gray-600 space-y-2">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold text-xs">
                      1
                    </span>
                  </div>
                  <span>Soumission de votre proposition</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-gray-600 font-semibold text-xs">
                      2
                    </span>
                  </div>
                  <span>Révision par l'équipe académique</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-gray-600 font-semibold text-xs">
                      3
                    </span>
                  </div>
                  <span>Validation et publication</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProposerSujet;
