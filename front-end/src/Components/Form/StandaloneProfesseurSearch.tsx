import { getData } from "@/Helpers/CRUDFunctions";
import appConfig from "@/public/config";
import { ProfesseurResponseDTO } from "@/Types/UtilisateursTypes";
import { Search, X } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface StandaloneProfesseurSearchProps {
  onSelect: (selected: ProfesseurResponseDTO | ProfesseurResponseDTO[]) => void;
  placeholder?: string;
  selectedProfesseur?: ProfesseurResponseDTO | ProfesseurResponseDTO[] | null;
  multiple?: boolean;
}

const StandaloneProfesseurSearch: React.FC<StandaloneProfesseurSearchProps> = ({
  onSelect,
  placeholder = "Rechercher un professeur par nom ou email...",
  selectedProfesseur,
  multiple = false,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ProfesseurResponseDTO[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get selected professors as array
  const selectedProfesseurs = React.useMemo(() => {
    if (!selectedProfesseur) return [];
    if (Array.isArray(selectedProfesseur)) return selectedProfesseur;
    return [selectedProfesseur];
  }, [selectedProfesseur]);

  // Handle search with debouncing
  const searchProfesseurs = useCallback(
    async (query: string) => {
      if (!query.trim() || query.trim().length < 2) {
        setSearchResults([]);
        setShowDropdown(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await getData<ProfesseurResponseDTO[]>(
          `${
            appConfig.API_PATHS.PROFESSEUR.search.path
          }?query=${encodeURIComponent(query.trim())}`
        );
        if (response) {
          // Filter out already selected professors
          const filtered = response.filter(
            (prof) =>
              !selectedProfesseurs.some((selected) => selected.id === prof.id)
          );
          setSearchResults(filtered);
          setShowDropdown(true);
        }
      } catch (error) {
        console.error("Error searching professors:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [selectedProfesseurs]
  );

  // Debounced search effect
  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      searchProfesseurs(searchQuery);
    }, 300);

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [searchQuery, searchProfesseurs]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfesseurSelect = (professeur: ProfesseurResponseDTO) => {
    if (multiple) {
      const newSelected = [...selectedProfesseurs, professeur];
      onSelect(newSelected);
    } else {
      onSelect(professeur);
    }
    setSearchQuery("");
    setShowDropdown(false);
  };

  const handleProfesseurRemove = (professeurId: number) => {
    if (multiple) {
      const newSelected = selectedProfesseurs.filter(
        (p) => p.id !== professeurId
      );
      onSelect(newSelected);
    } else {
      onSelect(null as any);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => {
            if (searchResults.length > 0) {
              setShowDropdown(true);
            }
          }}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showDropdown && searchResults.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {searchResults.map((professeur) => (
            <button
              key={professeur.id}
              type="button"
              onClick={() => handleProfesseurSelect(professeur)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex-1">
                <div className="font-medium text-gray-900">
                  {professeur.prenom} {professeur.nom}
                </div>
                <div className="text-sm text-gray-600">{professeur.email}</div>
                <div className="text-xs text-gray-500">
                  Grade: {professeur.grade}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No Results Message */}
      {showDropdown &&
        searchQuery.trim().length >= 2 &&
        searchResults.length === 0 &&
        !isLoading && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-center text-gray-500">
            Aucun professeur trouvé pour "{searchQuery}"
          </div>
        )}

      {/* Selected Professors Display */}
      {selectedProfesseurs.length > 0 && (
        <div className="mt-3 space-y-2">
          <div className="text-sm font-medium text-gray-700">
            {multiple
              ? `Professeurs sélectionnés (${selectedProfesseurs.length}):`
              : "Professeur sélectionné:"}
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedProfesseurs.map((professeur) => (
              <div
                key={professeur.id}
                className="flex items-center bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm"
              >
                <div className="flex-1">
                  <div className="font-medium">
                    {professeur.prenom} {professeur.nom}
                  </div>
                  <div className="text-xs text-blue-600">
                    {professeur.email}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleProfesseurRemove(professeur.id)}
                  className="ml-2 p-1 hover:bg-blue-200 rounded-full transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StandaloneProfesseurSearch;
