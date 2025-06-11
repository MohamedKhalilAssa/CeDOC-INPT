import StandaloneProfesseurSearch from "@/Components/Form/StandaloneProfesseurSearch";
import { getData, putData } from "@/Helpers/CRUDFunctions";
import { useAlert } from "@/Hooks/UseAlert";
import appConfig from "@/public/config";
import {
  EquipeRequestDTO,
  EquipeResponseDTO,
  ProfesseurResponseDTO,
} from "@/Types/UtilisateursTypes";
import { Edit, GraduationCap, Search, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface EditEquipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  equipe: EquipeResponseDTO | null;
}

interface DoctorantSearch {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  statutDoctorant?: string;
}

const EditEquipeModal: React.FC<EditEquipeModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  equipe,
}) => {
  const [formData, setFormData] = useState<EquipeRequestDTO>({
    nomDeLequipe: "",
    chefEquipeId: undefined,
    membreIds: [],
    doctorantIds: [],
  });

  const [selectedChef, setSelectedChef] =
    useState<ProfesseurResponseDTO | null>(null);
  const [selectedMembres, setSelectedMembres] = useState<
    ProfesseurResponseDTO[]
  >([]);
  const [selectedDoctorants, setSelectedDoctorants] = useState<
    DoctorantSearch[]
  >([]);
  const [doctorantSearchQuery, setDoctorantSearchQuery] = useState("");
  const [doctorantSearchResults, setDoctorantSearchResults] = useState<
    DoctorantSearch[]
  >([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const swal = useAlert();

  // Initialize form data when equipe changes
  useEffect(() => {
    if (equipe && isOpen) {
      setFormData({
        nomDeLequipe: equipe.nomDeLequipe,
        chefEquipeId: equipe.chefEquipeId,
        membreIds: equipe.membres?.map((m) => m.id) || [],
        doctorantIds: equipe.doctorants?.map((d) => d.id) || [],
      });

      // Set selected chef if exists
      if (equipe.chefEquipeId && equipe.nomCompletChef) {
        // We need to create a ProfesseurResponseDTO-like object for the chef
        // Since we only have the name and ID, we'll create a minimal object
        setSelectedChef({
          id: equipe.chefEquipeId,
          nom: equipe.nomCompletChef.split(" ").slice(-1)[0] || "",
          prenom: equipe.nomCompletChef.split(" ").slice(0, -1).join(" ") || "",
          email: "",
          telephone: "",
          grade: "",
          emailValider: false,
          roles: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      // Set selected membres
      setSelectedMembres(equipe.membres || []);

      // Convert doctorants to DoctorantSearch format
      if (equipe.doctorants) {
        const doctorantsForSearch: DoctorantSearch[] = equipe.doctorants.map(
          (d) => ({
            id: d.id,
            nom: d.nom || "",
            prenom: d.prenom || "",
            email: d.email,
            statutDoctorant: d.statutDoctorant,
          })
        );
        setSelectedDoctorants(doctorantsForSearch);
      }
    }
  }, [equipe, isOpen]);

  // Search for doctorants
  const searchDoctorants = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setDoctorantSearchResults([]);
        return;
      }

      try {
        const response = await getData<DoctorantSearch[]>(
          `${
            appConfig.API_PATHS.DOCTORANT.search.path
          }?query=${encodeURIComponent(query)}`
        );
        if (response) {
          // Filter out already selected doctorants
          const filtered = response.filter(
            (doctorant) =>
              !selectedDoctorants.some(
                (selected) => selected.id === doctorant.id
              )
          );
          setDoctorantSearchResults(filtered);
        }
      } catch (error) {
        console.error("Error searching doctorants:", error);
        setDoctorantSearchResults([]);
      } finally {
        // Search completed
      }
    },
    [selectedDoctorants]
  );

  const handleChefSelect = (chef: ProfesseurResponseDTO) => {
    setSelectedChef(chef);
    setFormData((prev) => ({ ...prev, chefEquipeId: chef.id }));
  };

  const handleMembreSelect = (membres: ProfesseurResponseDTO[]) => {
    setSelectedMembres(membres);
    setFormData((prev) => ({ ...prev, membreIds: membres.map((m) => m.id) }));
  };

  const handleDoctorantAdd = (doctorant: DoctorantSearch) => {
    if (!selectedDoctorants.some((selected) => selected.id === doctorant.id)) {
      const newSelectedDoctorants = [...selectedDoctorants, doctorant];
      setSelectedDoctorants(newSelectedDoctorants);
      setFormData((prev) => ({
        ...prev,
        doctorantIds: newSelectedDoctorants.map((d) => d.id),
      }));
      setDoctorantSearchQuery("");
      setDoctorantSearchResults([]);
    }
  };

  const handleDoctorantRemove = (doctorantId: number) => {
    const newSelectedDoctorants = selectedDoctorants.filter(
      (d) => d.id !== doctorantId
    );
    setSelectedDoctorants(newSelectedDoctorants);
    setFormData((prev) => ({
      ...prev,
      doctorantIds: newSelectedDoctorants.map((d) => d.id),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nomDeLequipe.trim()) {
      swal.error("Erreur", "Le nom de l'équipe est obligatoire");
      return;
    }

    if (!equipe?.id) {
      swal.error("Erreur", "ID de l'équipe manquant");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await putData<EquipeRequestDTO>(
        `${appConfig.API_PATHS.EQUIPE.update.path}/${equipe.id}`,
        formData
      );

      if (response) {
        swal.success(
          "Succès",
          "L'équipe de recherche a été mise à jour avec succès"
        );
        handleClose();
        onSuccess();
      }
    } catch (error: any) {
      console.error("Error updating equipe:", error);
      swal.error(
        "Erreur",
        error.response?.data?.message ||
          "Une erreur s'est produite lors de la mise à jour de l'équipe"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      nomDeLequipe: "",
      chefEquipeId: undefined,
      membreIds: [],
      doctorantIds: [],
    });
    setSelectedChef(null);
    setSelectedMembres([]);
    setSelectedDoctorants([]);
    setDoctorantSearchQuery("");
    setDoctorantSearchResults([]);
    onClose();
  };

  if (!isOpen || !equipe) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Edit className="h-7 w-7 text-blue-600" />
            Modifier l'équipe de recherche
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Team Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom de l'équipe *
            </label>
            <input
              type="text"
              value={formData.nomDeLequipe}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  nomDeLequipe: e.target.value,
                }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Entrez le nom de l'équipe de recherche"
              required
            />
          </div>

          {/* Chef d'équipe Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chef d'équipe
            </label>
            <StandaloneProfesseurSearch
              onSelect={(chef) =>
                handleChefSelect(chef as ProfesseurResponseDTO)
              }
              placeholder="Rechercher et sélectionner un chef d'équipe"
              selectedProfesseur={selectedChef}
              multiple={false}
            />
          </div>

          {/* Team Members Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Membres de l'équipe (Professeurs)
            </label>
            <StandaloneProfesseurSearch
              onSelect={(membres) =>
                handleMembreSelect(membres as ProfesseurResponseDTO[])
              }
              placeholder="Rechercher et sélectionner les membres de l'équipe"
              selectedProfesseur={selectedMembres}
              multiple={true}
            />
          </div>

          {/* Doctorants Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Doctorants rattachés
            </label>

            {/* Search input for doctorants */}
            <div className="relative mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={doctorantSearchQuery}
                  onChange={(e) => {
                    setDoctorantSearchQuery(e.target.value);
                    searchDoctorants(e.target.value);
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Rechercher des doctorants par nom ou email"
                />
              </div>

              {/* Search results dropdown */}
              {doctorantSearchResults.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {doctorantSearchResults.map((doctorant) => (
                    <button
                      key={doctorant.id}
                      type="button"
                      onClick={() => handleDoctorantAdd(doctorant)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 last:border-b-0"
                    >
                      <GraduationCap className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-900">
                          {doctorant.prenom} {doctorant.nom}
                        </div>
                        <div className="text-sm text-gray-500">
                          {doctorant.email}
                        </div>
                        {doctorant.statutDoctorant && (
                          <div className="text-xs text-blue-600">
                            {doctorant.statutDoctorant}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selected doctorants */}
            {selectedDoctorants.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  Doctorants sélectionnés:
                </p>
                <div className="space-y-2">
                  {selectedDoctorants.map((doctorant) => (
                    <div
                      key={doctorant.id}
                      className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <GraduationCap className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium text-gray-900">
                            {doctorant.prenom} {doctorant.nom}
                          </div>
                          <div className="text-sm text-gray-500">
                            {doctorant.email}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDoctorantRemove(doctorant.id)}
                        className="p-1 hover:bg-blue-100 rounded-full transition-colors"
                      >
                        <X className="h-4 w-4 text-blue-600" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.nomDeLequipe.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Mise à jour...
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4" />
                  Mettre à jour
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEquipeModal;
