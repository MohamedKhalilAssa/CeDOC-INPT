import { EquipeResponseDTO } from "@/Types/UtilisateursTypes";
import {
  Calendar,
  Crown,
  GraduationCap,
  Mail,
  Phone,
  User,
  Users,
  X,
} from "lucide-react";
import React from "react";

interface ViewEquipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  equipe: EquipeResponseDTO | null;
}

const ViewEquipeModal: React.FC<ViewEquipeModalProps> = ({
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
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {equipe.nomDeLequipe}
              </h2>
              <p className="text-gray-600 mt-1">
                Équipe de recherche #{equipe.id}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Team Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-gray-900">Membres</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">
                {equipe.nombreMembres}
              </p>
              <p className="text-sm text-gray-600">Professeurs membres</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="h-5 w-5 text-green-600" />
                <span className="font-medium text-gray-900">Doctorants</span>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {equipe.nombreDoctorants}
              </p>
              <p className="text-sm text-gray-600">Doctorants rattachés</p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-gray-900">Créée le</span>
              </div>
              <p className="text-lg font-bold text-purple-600">
                {formatDate(equipe.createdAt)}
              </p>
              <p className="text-sm text-gray-600">Date de création</p>
            </div>
          </div>

          {/* Chef d'équipe */}
          {equipe.nomCompletChef && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Crown className="h-6 w-6 text-amber-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Chef d'équipe
                </h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-100 rounded-full">
                  <User className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-lg">
                    {equipe.nomCompletChef}
                  </p>
                  <p className="text-amber-700 text-sm font-medium">
                    Chef d'équipe
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Team Members */}
          {equipe.membres && equipe.membres.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Users className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Membres de l'équipe ({equipe.membres.length})
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {equipe.membres.map((membre) => (
                  <div
                    key={membre.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {membre.prenom} {membre.nom}
                        </p>
                        {membre.grade && (
                          <p className="text-sm text-blue-600 font-medium mb-2">
                            {membre.grade}
                          </p>
                        )}
                        {membre.email && (
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                            <Mail className="h-4 w-4" />
                            <span className="truncate">{membre.email}</span>
                          </div>
                        )}
                        {membre.telephone && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="h-4 w-4" />
                            <span>{membre.telephone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Doctorants */}
          {equipe.doctorants && equipe.doctorants.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Doctorants rattachés ({equipe.doctorants.length})
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {equipe.doctorants.map((doctorant) => (
                  <div
                    key={doctorant.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-100 rounded-full">
                        <GraduationCap className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {doctorant.prenom} {doctorant.nom}
                        </p>
                        {doctorant.statutDoctorant && (
                          <p className="text-sm text-green-600 font-medium mb-2">
                            {doctorant.statutDoctorant}
                          </p>
                        )}
                        {doctorant.email && (
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                            <Mail className="h-4 w-4" />
                            <span className="truncate">{doctorant.email}</span>
                          </div>
                        )}
                        {doctorant.telephone && (
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                            <Phone className="h-4 w-4" />
                            <span>{doctorant.telephone}</span>
                          </div>
                        )}
                        {doctorant.dateInscription && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
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
            </div>
          )}

          {/* Empty states */}
          {(!equipe.membres || equipe.membres.length === 0) && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">Aucun membre dans cette équipe</p>
            </div>
          )}

          {(!equipe.doctorants || equipe.doctorants.length === 0) && (
            <div className="text-center py-8">
              <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">
                Aucun doctorant rattaché à cette équipe
              </p>
            </div>
          )}

          {/* Metadata */}
          <div className="bg-gray-50 rounded-lg p-4 mt-8">
            <h4 className="font-medium text-gray-900 mb-3">Informations</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">ID de l'équipe:</span>
                <span className="ml-2 font-medium">#{equipe.id}</span>
              </div>
              <div>
                <span className="text-gray-600">Créée le:</span>
                <span className="ml-2 font-medium">
                  {formatDate(equipe.createdAt)}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Dernière modification:</span>
                <span className="ml-2 font-medium">
                  {formatDate(equipe.updatedAt)}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Total des membres:</span>
                <span className="ml-2 font-medium">
                  {equipe.nombreMembres + equipe.nombreDoctorants}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewEquipeModal;
