import { getData } from "@/Helpers/CRUDFunctions";
import appConfig from "@/public/config";
import { ProfesseurResponseDTO } from "@/Types/CandidatureTypes";
import React, { useEffect, useRef, useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";

interface ProfesseurSearchProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
}

const ProfesseurSearch: React.FC<ProfesseurSearchProps> = ({
  control,
  errors,
  name,
  label,
  required = false,
  placeholder = "Rechercher un professeur par nom ou email...",
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ProfesseurResponseDTO[]>(
    []
  );
  const [selectedProfessors, setSelectedProfessors] = useState<
    ProfesseurResponseDTO[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle search with debouncing
  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (searchQuery.trim().length >= 2) {
      searchTimeout.current = setTimeout(async () => {
        setIsLoading(true);
        try {
          const response = (await getData(
            `${
              appConfig.API_PATHS.PROFESSEUR.search.path
            }?query=${encodeURIComponent(searchQuery.trim())}`
          )) as any;
          if (response && Array.isArray(response)) {
            setSearchResults(response);
            setShowDropdown(true);
          } else if (response?.data && Array.isArray(response.data)) {
            setSearchResults(response.data);
            setShowDropdown(true);
          } else {
            setSearchResults([]);
          }
        } catch (error) {
          console.error("Error searching professors:", error);
          setSearchResults([]);
        } finally {
          setIsLoading(false);
        }
      }, 300);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [searchQuery]);

  // Close dropdown when clicking outside
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <Controller
        name={name}
        control={control}
        rules={required ? { required: `${label} est requis` } : {}}
        render={({ field }) => {
          // Load professor details when field value changes
          useEffect(() => {
            if (
              field.value &&
              Array.isArray(field.value) &&
              field.value.length > 0
            ) {
              // Find professors in current search results or keep existing selectedProfessors
              const foundProfessors = field.value
                .map((id: number) => {
                  // First check in current search results
                  const foundInSearch = searchResults.find((p) => p.id === id);
                  if (foundInSearch) return foundInSearch;

                  // Then check in already selected professors
                  return selectedProfessors.find((p) => p.id === id);
                })
                .filter(
                  (prof): prof is ProfesseurResponseDTO => prof !== undefined
                );

              setSelectedProfessors(foundProfessors);
            } else {
              setSelectedProfessors([]);
            }
          }, [field.value, searchResults]);

          return (
            <div className="relative" ref={dropdownRef}>
              {/* Search Input */}
              <div className="relative">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                {isLoading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <i className="fas fa-spinner fa-spin text-gray-400"></i>
                  </div>
                )}
              </div>

              {/* Search Results Dropdown - Positioned right after input */}
              {showDropdown && searchResults.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {searchResults.map((professor) => {
                    const isSelected = field.value?.includes(professor.id);
                    return (
                      <div
                        key={professor.id}
                        onClick={() => {
                          const currentValue = field.value || [];
                          let newValue;
                          let newSelectedProfessors = [...selectedProfessors];

                          if (isSelected) {
                            // Remove if already selected
                            newValue = currentValue.filter(
                              (id: number) => id !== professor.id
                            );
                            newSelectedProfessors =
                              newSelectedProfessors.filter(
                                (p) => p.id !== professor.id
                              );
                          } else {
                            // Add if not selected
                            newValue = [...currentValue, professor.id];
                            newSelectedProfessors.push(professor);
                          }

                          field.onChange(newValue);
                          setSelectedProfessors(newSelectedProfessors);
                          setSearchQuery(""); // Clear search after selection
                          setShowDropdown(false);
                        }}
                        className={`px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-gray-50 ${
                          isSelected ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">
                              {professor.prenom} {professor.nom}
                            </div>
                            <div className="text-sm text-gray-600">
                              {professor.email}
                            </div>
                            <div className="text-xs text-gray-500">
                              Grade: {professor.grade}
                            </div>
                          </div>
                          {isSelected && (
                            <div className="text-blue-600">
                              <i className="fas fa-check"></i>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
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

              {/* Selected Professors Display - Positioned below the dropdown */}
              {selectedProfessors.length > 0 && (
                <div className="mt-3 space-y-2">
                  <div className="text-sm font-medium text-gray-700">
                    Professeurs sélectionnés ({selectedProfessors.length}):
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProfessors.map((professor) => (
                      <div
                        key={professor.id}
                        className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        <span>
                          {professor.prenom} {professor.nom}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const newValue = field.value.filter(
                              (id: number) => id !== professor.id
                            );
                            const newSelectedProfessors =
                              selectedProfessors.filter(
                                (p) => p.id !== professor.id
                              );
                            field.onChange(newValue);
                            setSelectedProfessors(newSelectedProfessors);
                          }}
                          className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                        >
                          <i className="fas fa-times text-xs cursor-pointer"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        }}
      />

      {/* Error Message */}
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[name]?.message as string}
        </p>
      )}

      {/* Help Text */}
      <p className="text-sm text-gray-500">
        Tapez au moins 2 caractères pour rechercher des professeurs. Vous pouvez
        sélectionner plusieurs professeurs.
      </p>
    </div>
  );
};

export default ProfesseurSearch;
