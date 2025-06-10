import DatePicker from "@/Components/Form/DatePicker";
import SelectField from "@/Components/Form/SelectField";
import TextArea from "@/Components/Form/TextArea";
import { putData } from "@/Helpers/CRUDFunctions";
import { useAlert } from "@/Hooks/UseAlert";
import appConfig from "@/public/config";
import {
  CandidatureResponseDTO,
  ChangeStatutCandidatureRequest,
} from "@/Types/CandidatureTypes";
import { CandidatureEnum } from "@/Types/UtilisateursEnums";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Loader2,
  Save,
  X,
  XCircle,
} from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface ChangeStatusModalProps {
  candidature: CandidatureResponseDTO | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updatedCandidature: CandidatureResponseDTO) => void;
  onError?: (error: string) => void;
}

interface ChangeStatusFormData {
  nouveauStatut: string; // Form handles string values
  motif?: string;
  dateEntretien?: string;
}

const ChangeStatusModal: React.FC<ChangeStatusModalProps> = ({
  candidature,
  isOpen,
  onClose,
  onSuccess,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const swal = useAlert();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<ChangeStatusFormData>();

  const watchedStatus = watch("nouveauStatut");

  // Status options based on current status and user permissions
  const getStatusOptions = () => {
    const currentStatus = candidature?.statutCandidature;

    const allStatuses = [
      { value: CandidatureEnum.SOUMISE, label: "Soumise", icon: Clock },
      {
        value: CandidatureEnum.EN_COURS_DE_TRAITEMENT,
        label: "En Cours de Traitement",
        icon: AlertTriangle,
      },
      { value: CandidatureEnum.ACCEPTER, label: "Acceptée", icon: CheckCircle },
      { value: CandidatureEnum.REFUSER, label: "Refusée", icon: XCircle },
    ];

    // Filter out current status
    return allStatuses.filter(
      (status) => status.value.toString() !== currentStatus
    );
  };

  const handleFormSubmit = async (data: ChangeStatusFormData) => {
    if (!candidature) return;

    setIsLoading(true);
    try {
      console.log("Form data before processing:", data);

      const requestData: ChangeStatutCandidatureRequest = {
        nouveauStatut: data.nouveauStatut.toString(),
        motif: data.motif || undefined,
        dateEntretien: data.dateEntretien || undefined,
      };

      console.log("Request data being sent:", requestData);

      const url = appConfig.API_PATHS.CANDIDATURE.changeStatus.path.replace(
        "{id}",
        candidature.id.toString()
      );

      const response = await putData<CandidatureResponseDTO>(url, requestData);

      if (response) {
        swal.success("Statut de la candidature modifié avec succès");
        onSuccess(response);
        onClose();
        reset();
      }
    } catch (error) {
      console.error("Error changing candidature status:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erreur lors de la modification du statut";
      swal.error("Erreur", errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentStatusDisplay = () => {
    if (!candidature) return "";

    const statusConfig = {
      SOUMISE: {
        label: "Soumise",
        color: "text-blue-600",
        bgColor: "bg-blue-100",
        icon: Clock,
      },
      EN_COURS_DE_TRAITEMENT: {
        label: "En Cours",
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
        icon: AlertTriangle,
      },
      ACCEPTER: {
        label: "Acceptée",
        color: "text-green-600",
        bgColor: "bg-green-100",
        icon: CheckCircle,
      },
      REFUSER: {
        label: "Refusée",
        color: "text-red-600",
        bgColor: "bg-red-100",
        icon: XCircle,
      },
    };

    const config =
      statusConfig[candidature.statutCandidature as keyof typeof statusConfig];
    if (!config) return candidature.statutCandidature;

    const Icon = config.icon;
    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color} ${config.bgColor}`}
      >
        <Icon className="w-4 h-4 mr-1" />
        {config.label}
      </span>
    );
  };

  if (!isOpen || !candidature) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Changer le statut de la candidature
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Candidat: {candidature.candidatPrenom} {candidature.candidatNom}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isLoading}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Current Status */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Statut actuel:
              </span>
              {getCurrentStatusDisplay()}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Status Selection */}
            <SelectField
              label="Nouveau statut"
              name="nouveauStatut"
              register={register}
              control={control}
              errors={errors}
              options={getStatusOptions().map((status) => ({
                value: status.value.toString(),
                label: status.label,
              }))}
              required={true}
            />

            {/* Date d'entretien for ACCEPTER status */}
            {watchedStatus === "2" && (
              <DatePicker
                label="Date d'entretien"
                name="dateEntretien"
                register={register}
                control={control}
                errors={errors}
                required={true}
              />
            )}

            {/* Motif field only for REFUSER status */}
            {watchedStatus === "3" && (
              <TextArea
                label="Motif de refus"
                name="motif"
                register={register}
                control={control}
                errors={errors}
                placeholder="Expliquez la raison du refus..."
                required={true}
                rows={3}
              />
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Modification...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Modifier le statut
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

export default ChangeStatusModal;
