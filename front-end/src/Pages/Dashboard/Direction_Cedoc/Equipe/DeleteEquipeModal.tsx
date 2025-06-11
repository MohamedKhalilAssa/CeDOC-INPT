import { deleteData } from "@/Helpers/CRUDFunctions";
import { useAlert } from "@/Hooks/UseAlert";
import appConfig from "@/public/config";
import { EquipeResponseDTO } from "@/Types/UtilisateursTypes";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { useState } from "react";

interface DeleteEquipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  equipe: EquipeResponseDTO | null;
}

const DeleteEquipeModal: React.FC<DeleteEquipeModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  equipe,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");

  const swal = useAlert();

  const handleDelete = async () => {
    if (!equipe?.id) {
      swal.error("Erreur", "ID de l'équipe manquant");
      return;
    }

    if (confirmationText !== equipe.nomDeLequipe) {
      swal.error(
        "Erreur de confirmation",
        "Le nom de l'équipe saisi ne correspond pas"
      );
      return;
    }

    setIsDeleting(true);

    try {
      await deleteData(
        `${appConfig.API_PATHS.EQUIPE.delete.path}/${equipe.id}`
      );

      swal.toast(
        "L'équipe de recherche a été supprimée avec succès",
        "success"
      );

      handleClose();
      onSuccess();
    } catch (error: any) {
      console.error("Error deleting equipe:", error);

      let errorMessage =
        "Une erreur s'est produite lors de la suppression de l'équipe";

      // Handle specific error cases
      if (error.response?.status === 400) {
        errorMessage =
          error.response?.data?.message ||
          "Impossible de supprimer cette équipe car elle a encore des membres ou des doctorants rattachés.";
      } else if (error.response?.status === 404) {
        errorMessage = "L'équipe n'existe pas ou a déjà été supprimée";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      swal.error("Erreur", errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    setConfirmationText("");
    onClose();
  };

  if (!isOpen || !equipe) return null;

  const hasMembers = equipe.nombreMembres > 0;
  const hasDoctorants = equipe.nombreDoctorants > 0;
  const canDelete = !hasMembers && !hasDoctorants;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-red-600 flex items-center gap-3">
            <Trash2 className="h-7 w-7" />
            Supprimer l'équipe de recherche
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-red-100 rounded-full">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Attention : Cette action est irréversible
              </h3>
              <p className="text-gray-600 mb-4">
                Vous êtes sur le point de supprimer définitivement l'équipe de
                recherche{" "}
                <span className="font-semibold text-gray-900">
                  "{equipe.nomDeLequipe}"
                </span>
                .
              </p>
            </div>
          </div>

          {/* Team information */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-gray-900 mb-3">
              Informations de l'équipe
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Nom:</span>
                <span className="ml-2 font-medium">{equipe.nomDeLequipe}</span>
              </div>
              <div>
                <span className="text-gray-600">ID:</span>
                <span className="ml-2 font-medium">#{equipe.id}</span>
              </div>
              <div>
                <span className="text-gray-600">Chef d'équipe:</span>
                <span className="ml-2 font-medium">
                  {equipe.nomCompletChef || "Non défini"}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Créée le:</span>
                <span className="ml-2 font-medium">
                  {new Date(equipe.createdAt).toLocaleDateString("fr-FR")}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Membres:</span>
                <span className="ml-2 font-medium">{equipe.nombreMembres}</span>
              </div>
              <div>
                <span className="text-gray-600">Doctorants:</span>
                <span className="ml-2 font-medium">
                  {equipe.nombreDoctorants}
                </span>
              </div>
            </div>
          </div>

          {/* Warning if team has members */}
          {!canDelete && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <p className="text-red-800 font-medium mb-2">
                    Impossible de supprimer cette équipe
                  </p>
                  <p className="text-red-700 text-sm mb-2">
                    Cette équipe ne peut pas être supprimée car elle contient
                    encore :
                  </p>
                  <ul className="text-red-700 text-sm list-disc list-inside space-y-1">
                    {hasMembers && (
                      <li>{equipe.nombreMembres} membre(s) professeur(s)</li>
                    )}
                    {hasDoctorants && (
                      <li>
                        {equipe.nombreDoctorants} doctorant(s) rattaché(s)
                      </li>
                    )}
                  </ul>
                  <p className="text-red-700 text-sm mt-3">
                    Veuillez d'abord retirer tous les membres et doctorants de
                    l'équipe avant de pouvoir la supprimer.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Confirmation input */}
          {canDelete && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pour confirmer la suppression, tapez le nom exact de l'équipe :
              </label>
              <input
                type="text"
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder={equipe.nomDeLequipe}
              />
              <p className="text-sm text-gray-500 mt-2">
                Tapez :{" "}
                <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                  {equipe.nomDeLequipe}
                </span>
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-4">
            <button
              onClick={handleClose}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>

            {canDelete ? (
              <button
                onClick={handleDelete}
                disabled={
                  isDeleting || confirmationText !== equipe.nomDeLequipe
                }
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Suppression...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Supprimer définitivement
                  </>
                )}
              </button>
            ) : (
              <button
                disabled
                className="px-6 py-3 bg-gray-400 text-white rounded-lg cursor-not-allowed flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Suppression impossible
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteEquipeModal;
