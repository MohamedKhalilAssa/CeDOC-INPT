import { EquipeResponseDTO } from "@/Types/UtilisateursTypes";
import {
  Calendar,
  GraduationCap,
  Mail,
  Phone,
  User,
  Users,
  X,
} from "lucide-react";
import React from "react";

interface EquipeViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  equipe: EquipeResponseDTO | null;
}

const EquipeViewModal: React.FC<EquipeViewModalProps> = ({
  isOpen,
  onClose,
  equipe,
}) => {
  if (!isOpen || !equipe) return null;
  const formatDate = (dateString: string | Date) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("fr-FR");
  };
  return (
    <div className="fixed inset-0 bg-black/50 top-0 left-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto ">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {equipe.nomDeLequipe}
              </h2>
              <p className="text-blue-100 mt-1">
                Détails de l'équipe de recherche
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-200 transition-colors p-2 rounded-lg hover:bg-blue-600"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Basic Information */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="mr-2 text-blue-600" size={20} />
              Informations générales
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Chef d'équipe
                </span>
                <p className="text-lg text-gray-900">
                  {equipe.nomCompletChef || "Non assigné"}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Date de création
                </span>
                <p className="text-lg text-gray-900">
                  {formatDate(equipe.createdAt)}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Nombre total de membres
                </span>
                <p className="text-lg text-gray-900">{equipe.nombreMembres}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Nombre de doctorants
                </span>
                <p className="text-lg text-gray-900">
                  {equipe.nombreDoctorants}
                </p>
              </div>
            </div>
          </div>

          {/* Professors Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="mr-2 text-green-600" size={20} />
              Professeurs ({equipe.membres?.length || 0})
            </h3>
            {equipe.membres && equipe.membres.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {equipe.membres.map((professeur, index) => (
                  <div
                    key={professeur.id || index}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="text-green-600" size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-medium text-gray-900 truncate">
                          {professeur.prenom} {professeur.nom}
                        </h4>
                        <p className="text-sm text-gray-500 mb-2">
                          Grade: {professeur.grade || "Non spécifié"}
                        </p>
                        {professeur.email && (
                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <Mail size={14} className="mr-1" />
                            <span className="truncate">{professeur.email}</span>
                          </div>
                        )}
                        {professeur.telephone && (
                          <div className="flex items-center text-sm text-gray-500">
                            <Phone size={14} className="mr-1" />
                            <span>{professeur.telephone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <User size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Aucun professeur assigné à cette équipe</p>
              </div>
            )}
          </div>

          {/* Doctorants Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <GraduationCap className="mr-2 text-purple-600" size={20} />
              Doctorants ({equipe.nombreDoctorants})
            </h3>
            {equipe.doctorants && equipe.doctorants.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {equipe.doctorants.map((doctorant, index) => (
                  <div
                    key={doctorant.id || index}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <GraduationCap className="text-purple-600" size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-medium text-gray-900 truncate">
                          {doctorant.prenom} {doctorant.nom}
                        </h4>
                        <p className="text-sm text-gray-500 mb-2">
                          Statut: {doctorant.statutDoctorant || "En cours"}
                        </p>
                        {doctorant.email && (
                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <Mail size={14} className="mr-1" />
                            <span className="truncate">{doctorant.email}</span>
                          </div>
                        )}
                        {doctorant.telephone && (
                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <Phone size={14} className="mr-1" />
                            <span>{doctorant.telephone}</span>
                          </div>
                        )}
                        {doctorant.dateInscription && (
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar size={14} className="mr-1" />
                            <span>
                              Inscrit le {formatDate(doctorant.dateInscription)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <GraduationCap
                  size={48}
                  className="mx-auto mb-4 text-gray-300"
                />
                <p>Aucun doctorant assigné à cette équipe</p>
                <p className="text-sm">
                  ({equipe.nombreDoctorants} doctorant
                  {equipe.nombreDoctorants !== 1 ? "s" : ""} référencé
                  {equipe.nombreDoctorants !== 1 ? "s" : ""})
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-xl">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipeViewModal;
