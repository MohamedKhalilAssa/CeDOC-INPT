import { Label } from "@/Components/DashComps";
import Button from "@/Components/DashComps/ui/button/Button";
import { Modal } from "@/Components/DashComps/ui/modal/index";
import { putData } from "@/Helpers/CRUDFunctions";
import { useModal } from "@/Hooks/DashHooks/useModal";
import { useAlert } from "@/Hooks/UseAlert";
import appConfig from "@/public/config";
import { UtilisateurResponseDTO } from "@/Types/UtilisateursTypes";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface UserLocationFormData {
  pays: string;
  ville: string;
  nationaliteIntitule: string;
  statutProfessionnel: string;
}

interface UserAddressCardProps {
  user: UtilisateurResponseDTO | null;
  loading: boolean;
  onUserUpdate: () => Promise<void>;
}

export default function UserAddressCard({
  user,
  loading,
  onUserUpdate,
}: UserAddressCardProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [saving, setSaving] = useState(false);
  const alert = useAlert();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserLocationFormData>();

  // Reset form when user data changes
  useEffect(() => {
    if (user) {
      reset({
        pays: user.lieuDeNaissance?.pays || "",
        ville: user.lieuDeNaissance?.ville || "",
        nationaliteIntitule: user.nationalite?.intitule || "",
        statutProfessionnel: user.statutProfessionnel || "",
      });
    }
  }, [user, reset]);

  const handleSave = async (data: UserLocationFormData) => {
    try {
      setSaving(true);

      // Note: We're only updating the professional status here
      // Location info would typically require separate endpoints
      await putData(appConfig.API_PATHS.AUTH.updateCurrentUser.path, {
        statutProfessionnel: data.statutProfessionnel,
      });

      // Refresh user data
      await onUserUpdate();

      alert.success("Succès", "Informations mises à jour avec succès");
      closeModal();
    } catch (error) {
      console.error("Error updating user data:", error);
      alert.error("Erreur", "Impossible de mettre à jour les informations");
    } finally {
      setSaving(false);
    }
  };
  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Localisation
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Pays
                </p>
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                ) : (
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {user?.lieuDeNaissance?.pays || "Non spécifié"}
                  </p>
                )}
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Ville
                </p>
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-40"></div>
                  </div>
                ) : (
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {user?.lieuDeNaissance?.ville || "Non spécifié"}
                  </p>
                )}
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Nationalité
                </p>
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-28"></div>
                  </div>
                ) : (
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {user?.nationalite?.intitule || "Non spécifiée"}
                  </p>
                )}
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Statut Professionnel
                </p>
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-36"></div>
                  </div>
                ) : (
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {user?.statutProfessionnel
                      ?.split("_")
                      .join(" ")
                      .toUpperCase() || "Non spécifié"}
                  </p>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={openModal}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                fill=""
              />
            </svg>
            Modifier
          </button>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Modifier les informations de localisation
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Mettez à jour vos informations de localisation et statut
              professionnel.
            </p>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Informations de localisation
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Pays</Label>
                    <input
                      type="text"
                      {...register("pays", { required: "Le pays est requis" })}
                      className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800 dark:bg-gray-900"
                    />
                    {errors.pays && (
                      <p className="mt-1.5 text-xs text-error-500">
                        {errors.pays.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Ville</Label>
                    <input
                      type="text"
                      {...register("ville", {
                        required: "La ville est requise",
                      })}
                      className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800 dark:bg-gray-900"
                    />
                    {errors.ville && (
                      <p className="mt-1.5 text-xs text-error-500">
                        {errors.ville.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Nationalité</Label>
                    <input
                      type="text"
                      value={user?.nationalite?.intitule || ""}
                      disabled
                      className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Statut Professionnel</Label>
                    <input
                      type="text"
                      {...register("statutProfessionnel", {
                        required: "Le statut professionnel est requis",
                      })}
                      className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800 dark:bg-gray-900"
                    />
                    {errors.statutProfessionnel && (
                      <p className="mt-1.5 text-xs text-error-500">
                        {errors.statutProfessionnel.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Annuler
              </Button>
              <Button
                size="sm"
                disabled={saving}
                onClick={handleSubmit(handleSave)}
              >
                {saving ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
