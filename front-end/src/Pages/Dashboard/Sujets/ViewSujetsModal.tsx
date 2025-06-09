import { SujetResponseDTO } from "@/Types/CandidatureTypes";
import { CheckCircle, Eye, Globe, Lock, X, XCircle } from "lucide-react";
import React, { useEffect } from "react";

interface ViewSujetModalProps {
  sujet: SujetResponseDTO | null;
  isOpen: boolean;
  onClose: () => void;
}

const ViewSujetModal: React.FC<ViewSujetModalProps> = ({
  sujet,
  isOpen,
  onClose,
}) => {
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
                Détails du Sujet
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Informations complètes du sujet de thèse
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6 cursor-pointer" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="space-y-6">
              {/* Intitulé */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Intitulé du Sujet
                </label>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                  <p className="text-gray-900">
                    {sujet.intitule || "Non défini"}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-md min-h-[100px]">
                  {sujet.description ? (
                    <p className="text-gray-900 whitespace-pre-wrap">
                      {sujet.description}
                    </p>
                  ) : (
                    <p className="text-gray-500 italic">
                      Aucune description fournie
                    </p>
                  )}
                </div>
                {sujet.description && (
                  <div className="flex justify-end mt-1">
                    <p className="text-sm text-gray-500">
                      {sujet.description.length} caractères
                    </p>
                  </div>
                )}
              </div>

              {/* Status Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Validation Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Statut de Validation
                  </label>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 border border-gray-200 rounded-md">
                    {sujet.valide ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="text-sm font-medium text-green-800">
                            Sujet Validé
                          </p>
                          <p className="text-xs text-green-600">
                            Ce sujet a été approuvé
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            Non Validé
                          </p>
                          <p className="text-xs text-gray-500">
                            Ce sujet n'est pas encore validé
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Public Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Visibilité
                  </label>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 border border-gray-200 rounded-md">
                    {sujet.estPublic ? (
                      <>
                        <Globe className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-blue-800">
                            Sujet Public
                          </p>
                          <p className="text-xs text-blue-600">
                            Visible publiquement
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            Sujet Privé
                          </p>
                          <p className="text-xs text-gray-500">
                            Accès restreint
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Director Info */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Directeur de Thèse
                </label>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
                  {sujet.directeurDeThese ? (
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium text-sm">
                          {sujet.directeurDeThese.prenom?.[0]?.toUpperCase()}
                          {sujet.directeurDeThese.nom?.[0]?.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {sujet.directeurDeThese.prenom}{" "}
                          {sujet.directeurDeThese.nom}
                        </p>
                        <p className="text-sm text-gray-600">
                          {sujet.directeurDeThese.email}
                        </p>
                        {sujet.directeurDeThese.telephone && (
                          <p className="text-sm text-gray-500">
                            {sujet.directeurDeThese.telephone}
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-400 text-lg">?</span>
                      </div>
                      <p className="text-sm text-gray-500 italic">
                        Aucun directeur de thèse assigné
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ID du Sujet
                  </label>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                    <p className="text-gray-900 font-mono text-sm">
                      #{sujet.id}
                    </p>
                  </div>
                </div>

                {/* Status Summary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Résumé du Statut
                  </label>
                  <div className="flex space-x-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        sujet.valide
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {sujet.valide ? "Validé" : "Non validé"}
                    </span>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        sujet.estPublic
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {sujet.estPublic ? "Public" : "Privé"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors inline-flex items-center"
              >
                <Eye className="w-4 h-4 mr-2" />
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSujetModal;
