import Label from "@/Components/DashComps/form/Label";
import Button from "@/Components/DashComps/ui/button/Button";
import { Modal } from "@/Components/DashComps/ui/modal";
import { putData } from "@/Helpers/CRUDFunctions";
import { useModal } from "@/Hooks/DashHooks/useModal";
import { useAlert } from "@/Hooks/UseAlert";
import appConfig from "@/public/config";
import { UtilisateurResponseDTO } from "@/Types/UtilisateursTypes";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface UserMetaFormData {
  nom: string;
  prenom: string;
}

interface UserMetaCardProps {
  user: UtilisateurResponseDTO | null;
  loading: boolean;
  onUserUpdate: () => Promise<void>;
}

export default function UserMetaCard({
  user,
  loading,
  onUserUpdate,
}: UserMetaCardProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [saving, setSaving] = useState(false);
  const alert = useAlert();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserMetaFormData>();

  // Reset form when user data changes
  useEffect(() => {
    if (user) {
      reset({
        nom: user.nom || "",
        prenom: user.prenom || "",
      });
    }
  }, [user, reset]);

  const handleSave = async (data: UserMetaFormData) => {
    try {
      setSaving(true);

      // Update user data
      await putData(appConfig.API_PATHS.AUTH.updateCurrentUser.path, data);

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
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              {user?.prenom && user?.nom ? (
                <span className="text-2xl font-semibold text-gray-600 dark:text-gray-300">
                  {user.prenom.charAt(0)}
                  {user.nom.charAt(0)}
                </span>
              ) : (
                <span className="text-2xl font-semibold text-gray-400">?</span>
              )}
            </div>
            <div className="order-3 xl:order-2">
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
              ) : (
                <>
                  <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                    {user?.prenom && user?.nom
                      ? `${user.prenom} ${user.nom}`
                      : "Nom non spécifié"}
                  </h4>
                  <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user?.etatCivilEnum || "Statut non spécifié"}
                    </p>
                    {user?.nationalite && (
                      <>
                        <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {user.nationalite.intitule}
                        </p>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end">
              <button
                onClick={openModal}
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Modifier les informations de base
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Mettez à jour votre nom et prénom.
            </p>
          </div>
          <form onSubmit={handleSubmit(handleSave)} className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Informations de base
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Prénom</Label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      {...register("prenom", {
                        required: "Le prénom est requis",
                      })}
                    />
                    {errors.prenom && (
                      <span className="text-sm text-red-500">
                        {errors.prenom.message}
                      </span>
                    )}
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Nom</Label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      {...register("nom", { required: "Le nom est requis" })}
                    />
                    {errors.nom && (
                      <span className="text-sm text-red-500">
                        {errors.nom.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Annuler
              </Button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Enregistrement..." : "Enregistrer"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
