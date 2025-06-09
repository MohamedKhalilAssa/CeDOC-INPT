// filepath: d:\Programming\CeDOC - INPT\front-end\src\Components\Modals\EditSujetModal.tsx
import CheckboxField from "@/Components/Form/CheckboxField";
import InputField from "@/Components/Form/InputField";
import TextArea from "@/Components/Form/TextArea";
import { putData } from "@/Helpers/CRUDFunctions";
import appConfig from "@/public/config";
import { SujetResponseDTO } from "@/Types/CandidatureTypes";
import { Loader2, Save, X } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

interface EditSujetModalProps {
  sujet: SujetResponseDTO | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  onError: (error: string) => void;
  onSuccess: (message: string) => void;
}

interface EditSujetFormData {
  intitule: string;
  description: string;
  valide: boolean;
  estPublic: boolean;
}

const EditSujetModal: React.FC<EditSujetModalProps> = ({
  sujet,
  isOpen,
  onClose,
  onSave,
  onError,
  onSuccess,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<EditSujetFormData>({
    defaultValues: {
      intitule: "",
      description: "",
      valide: false,
      estPublic: false,
    },
  });

  // Watch the description field to count characters
  const watchedDescription = watch("description") || "";

  // Initialize form data when sujet changes
  useEffect(() => {
    if (sujet) {
      reset({
        intitule: sujet.intitule || "",
        description: sujet.description || "",
        valide: sujet.valide || false,
        estPublic: sujet.estPublic || false,
      });
    }
  }, [sujet, reset]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const onSubmit = async (data: EditSujetFormData) => {
    if (!sujet) return;

    try {
      const updateData = {
        intitule: data.intitule.trim(),
        description: data.description.trim(),
        valide: data.valide,
        estPublic: data.estPublic,
      };

      await putData(
        `${appConfig.API_PATHS.SUJET.updateSujet.path}${sujet.id}`,
        updateData
      );

      onSuccess("Sujet modifié avec succès");
      onSave();
      onClose();
    } catch (error) {
      console.error("Update error:", error);
      onError("Erreur lors de la modification du sujet");
    }
  };

  if (!isOpen || !sujet) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black opacity-50 bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Modifier le Sujet
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Modifiez les informations du sujet de thèse
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isSubmitting}
            >
              <X className="w-6 h-6 cursor-pointer" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            <div className="space-y-6">
              {/* Intitulé */}
              <InputField
                label="Intitulé du Sujet"
                name="intitule"
                type="text"
                placeholder="Entrez l'intitulé du sujet"
                control={control}
                errors={errors}
                required={true}
                disabled={isSubmitting}
                validation={{
                  minLength: {
                    value: 5,
                    message: "L'intitulé doit contenir au moins 5 caractères",
                  },
                }}
              />

              {/* Description */}
              <div>
                <TextArea
                  label="Description"
                  name="description"
                  placeholder="Entrez une description détaillée du sujet (optionnel)"
                  control={control}
                  errors={errors}
                  rows={4}
                  validation={{
                    maxLength: {
                      value: 1000,
                      message:
                        "La description ne peut pas dépasser 1000 caractères",
                    },
                  }}
                />
                <div className="flex justify-end mt-1">
                  <p className="text-sm text-gray-500">
                    {watchedDescription.length}/1000 caractères
                  </p>
                </div>
              </div>

              {/* Status Toggles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Validation Status */}
                <CheckboxField
                  label="Sujet Validé"
                  name="valide"
                  control={control}
                  errors={errors}
                  description="Marquer ce sujet comme validé et approuvé"
                  disabled={isSubmitting}
                />

                {/* Public Status */}
                <CheckboxField
                  label="Sujet Public"
                  name="estPublic"
                  control={control}
                  errors={errors}
                  description="Rendre ce sujet visible publiquement"
                  disabled={isSubmitting}
                />
              </div>

              {/* Director Info (Read-only) */}
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Directeur de Thèse
                </h4>
                {sujet.directeurDeThese ? (
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">
                      {sujet.directeurDeThese.prenom}{" "}
                      {sujet.directeurDeThese.nom}
                    </p>
                    <p className="text-gray-500">
                      {sujet.directeurDeThese.email}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    Aucun directeur de thèse assigné
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                disabled={isSubmitting}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Enregistrer
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSujetModal;
