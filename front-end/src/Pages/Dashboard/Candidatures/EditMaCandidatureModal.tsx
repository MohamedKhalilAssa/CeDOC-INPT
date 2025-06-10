import CheckboxField from "@/Components/Form/CheckboxField";
import FileUpload from "@/Components/Form/FileUpload";
import InputField from "@/Components/Form/InputField";
import SelectField from "@/Components/Form/SelectField";
import { getData, putFormData } from "@/Helpers/CRUDFunctions";
import { useAlert } from "@/Hooks/UseAlert";
import appConfig from "@/public/config";
import { CandidatureResponseDTO } from "@/Types/CandidatureTypes";
import {
  DiplomeEnum,
  EtablissementEnum,
  MentionEnum,
} from "@/Types/UtilisateursEnums";
import { CandidatureRequestDTO } from "@/Types/UtilisateursTypes";
import { Loader2, Save, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface EditMaCandidatureModalProps {
  candidature: CandidatureResponseDTO | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (updatedCandidature: CandidatureResponseDTO) => void;
  onError?: (error: string) => void;
}

interface EditCandidatureFormData {
  mentionBac: MentionEnum;
  diplome: DiplomeEnum;
  mentionDiplome: MentionEnum;
  typeEtablissement: EtablissementEnum;
  specialite: string;
  intitulePFE: string;
  selectedSujets: number[];
  dossierCandidature?: File;
  [key: string]: any; // Allow dynamic checkbox fields like sujet_1, sujet_2, etc.
}

interface Sujet {
  id: number;
  intitule: string;
  description: string;
  estPublic: boolean;
  valide: boolean;
  createdAt: string;
  updatedAt: string;
  chefEquipe: number;
  directeurDeThese: number | null;
  professeurs: number[];
}

const EditMaCandidatureModal: React.FC<EditMaCandidatureModalProps> = ({
  candidature,
  isOpen,
  onClose,
  onSuccess,
  onError,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sujets, setSujets] = useState<Sujet[]>([]);
  const [selectedSujets, setSelectedSujets] = useState<number[]>([]);
  const swal = useAlert();

  const {
    control,
    handleSubmit,
    reset,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<EditCandidatureFormData>();

  // Define form options
  const diplomeOptions = Object.entries(DiplomeEnum).map(([key, value]) => ({
    value: key,
    label: value,
  }));

  const mentionOptions = Object.entries(MentionEnum).map(([key, value]) => ({
    value: key,
    label: value,
  }));

  const etablissementOptions = Object.entries(EtablissementEnum).map(
    ([key, value]) => ({
      value: key,
      label: value,
    })
  );

  // Load available sujets
  useEffect(() => {
    const fetchSujets = async () => {
      try {
        const sujetsData: Sujet[] | undefined = await getData(
          appConfig.API_PATHS.SUJET.getAllSimple.path
        );
        if (sujetsData) {
          setSujets(sujetsData);
        }
      } catch (error) {
        console.error("Error fetching sujets:", error);
        swal.error(
          "Erreur lors de la récupération des sujets",
          "Veuillez contacter l'administrateur."
        );
      }
    };

    if (isOpen) {
      fetchSujets();
    }
  }, [isOpen]);

  // Initialize form with candidature data
  useEffect(() => {
    if (candidature && isOpen) {
      reset({
        mentionBac: candidature.mentionBac as MentionEnum,
        diplome: candidature.diplome as DiplomeEnum,
        mentionDiplome: candidature.mentionDiplome as MentionEnum,
        typeEtablissement: candidature.typeEtablissement as EtablissementEnum,
        specialite: candidature.specialite,
        intitulePFE: candidature.intitulePFE,
        selectedSujets: candidature.sujetsIds || [],
      });
      setSelectedSujets(candidature.sujetsIds || []);

      // Set individual checkbox values for each sujet
      candidature.sujetsIds?.forEach((sujetId) => {
        setValue(`sujet_${sujetId}`, true);
      });
    }
  }, [candidature, isOpen, reset, setValue]);

  // Handle sujet selection (max 3)
  const handleSujetChange = (sujetId: number, isChecked: boolean) => {
    let newSelection: number[];

    if (isChecked) {
      if (selectedSujets.length < 3) {
        newSelection = [...selectedSujets, sujetId];
      } else {
        swal.error(
          "Limite atteinte",
          "Vous ne pouvez sélectionner que 3 sujets maximum."
        );
        return;
      }
    } else {
      newSelection = selectedSujets.filter((id) => id !== sujetId);
    }

    // Update state and form values
    setSelectedSujets(newSelection);
    setValue("selectedSujets", newSelection);
    setValue(`sujet_${sujetId}`, isChecked);
  };

  const onSubmit = async (data: EditCandidatureFormData) => {
    if (!candidature) return;

    setIsSubmitting(true);
    try {
      // Transform form data to match backend expectations
      const formData: CandidatureRequestDTO = {
        mentionBac: data.mentionBac,
        diplome: data.diplome,
        mentionDiplome: data.mentionDiplome,
        typeEtablissement: data.typeEtablissement,
        specialite: data.specialite,
        intitulePFE: data.intitulePFE,
        sujetsIds: data.selectedSujets,
        // Include file if uploaded
        ...(data.dossierCandidature && {
          dossierCandidature: data.dossierCandidature,
        }),
      } as any;

      // Remove undefined values
      Object.keys(formData).forEach(
        (key) =>
          (formData as any)[key] === undefined && delete (formData as any)[key]
      );

      const response = await putFormData(
        appConfig.API_PATHS.CANDIDATURE.update.path.replace(
          "{id}",
          candidature.id.toString()
        ),
        formData
      );

      if (response) {
        swal.success(
          "Candidature mise à jour avec succès",
          "Vos modifications ont été enregistrées."
        );
        onSuccess?.(response as CandidatureResponseDTO);
        onClose();
      }
    } catch (error: any) {
      console.error("Error updating candidature:", error);
      const errorMessage =
        error?.message ||
        error?.errors?.[0]?.message ||
        "Une erreur est survenue";
      swal.error("Erreur de mise à jour", errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      // Clear all checkbox values
      sujets.forEach((sujet) => {
        setValue(`sujet_${sujet.id}`, false);
      });

      reset();
      setSelectedSujets([]);
      onClose();
    }
  };

  if (!candidature || !isOpen) {
    return null;
  }

  // Check if candidature can be edited (only if status is SOUMISE)
  const canEdit = candidature.statutCandidature === "SOUMISE";

  if (!canEdit) {
    return (
      <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div className="text-center">
            <X className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Modification impossible
            </h3>
            <p className="text-gray-600 mb-4">
              Vous ne pouvez modifier votre candidature que si elle est en
              statut "Soumise". Le statut actuel est:{" "}
              {candidature.statutCandidature}
            </p>
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Modifier ma Candidature
          </h2>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Education Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Informations de Formation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                label="Type d'établissement"
                name="typeEtablissement"
                options={etablissementOptions}
                register={register}
                errors={errors}
                control={control}
                required={true}
              />
              <SelectField
                label="Type de diplôme"
                name="diplome"
                options={diplomeOptions}
                register={register}
                errors={errors}
                control={control}
                required={true}
              />
              <SelectField
                label="Mention du diplôme"
                name="mentionDiplome"
                options={mentionOptions}
                register={register}
                errors={errors}
                control={control}
                required={true}
              />
              <SelectField
                label="Mention du BAC"
                name="mentionBac"
                options={mentionOptions}
                register={register}
                errors={errors}
                control={control}
                required={true}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <InputField
                label="Domaine d'étude"
                name="specialite"
                type="text"
                placeholder="Ex: Informatique, Mathématiques"
                register={register}
                errors={errors}
                control={control}
                required={true}
              />
              <InputField
                label="Intitulé du PFE"
                name="intitulePFE"
                type="text"
                placeholder="Titre de votre PFE"
                register={register}
                errors={errors}
                control={control}
                required={true}
              />
            </div>
          </div>

          {/* Research Subjects Selection */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Sujets de Recherche (Maximum 3)
            </h3>
            {sujets.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 max-h-60 overflow-y-auto">
                {sujets.map((sujet) => (
                  <CheckboxField
                    key={sujet.id}
                    label={sujet.intitule}
                    name={`sujet_${sujet.id}`}
                    register={register}
                    errors={errors}
                    control={control}
                    disabled={
                      !selectedSujets.includes(sujet.id) &&
                      selectedSujets.length >= 3
                    }
                    onChange={(checked: boolean) =>
                      handleSujetChange(sujet.id, checked)
                    }
                    description={sujet.description}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Chargement des sujets...</p>
            )}

            <div className="mt-2 text-sm text-gray-600">
              {selectedSujets.length}/3 sujets sélectionnés
            </div>

            {errors.selectedSujets && (
              <p className="mt-1 text-sm text-red-600">
                Veuillez sélectionner au moins un sujet (maximum 3)
              </p>
            )}

            {/* Hidden input for form validation */}
            <input
              type="hidden"
              {...register("selectedSujets", {
                required: "Veuillez sélectionner au moins un sujet",
                validate: (value) =>
                  Array.isArray(value) && value.length > 0 && value.length <= 3
                    ? true
                    : "Veuillez sélectionner entre 1 et 3 sujets",
              })}
            />
          </div>

          {/* File Upload */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Dossier de Candidature (Optionnel)
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Laissez vide pour conserver le fichier actuel. Téléchargez un
              nouveau fichier .zip uniquement si vous souhaitez le remplacer.
            </p>
            <FileUpload
              label="Nouveau dossier (optionnel)"
              name="dossierCandidature"
              register={register}
              errors={errors}
              required={false}
              helpText="Fichier .zip contenant : CV - Relevés de notes - Diplômes (BAC + autres diplômes)"
              setValue={setValue}
              getValues={getValues}
              accept=".zip"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Mise à jour...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Enregistrer</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMaCandidatureModal;
