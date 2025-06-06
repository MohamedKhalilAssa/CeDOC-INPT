import CheckboxField from "@/Components/Form/CheckboxField";
import { getData } from "@/Helpers/CRUDFunctions";
import { useAlert } from "@/Hooks/UseAlert";
import appConfig from "@/public/config";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface Sujet {
  id: number;
  intitule: string;
  description: string;
  estPublic: boolean;
  valide: boolean;
  createdAt: string;
  updatedAt: string;
  chefEquipe: number;
  directeurDeThese: number | null;
  professeurs: number[];
}

interface ResearchSubjectsFormProps {
  form: UseFormReturn<any>;
}

const ResearchSubjectsForm = ({ form }: ResearchSubjectsFormProps) => {
  const [sujets, setSujets] = useState<Sujet[]>([]);
  const [selectedSujets, setSelectedSujets] = useState<number[]>([]);
  const {
    register,
    formState: { errors },
    setValue,
    control,
    getValues,
  } = form;

  const swal = useAlert();

  // Sync local state with form state on mount and when form values change
  useEffect(() => {
    const formSelectedSujets = getValues("selectedSujets");
    if (formSelectedSujets && Array.isArray(formSelectedSujets)) {
      setSelectedSujets(formSelectedSujets);

      // Also ensure individual checkbox fields are set
      formSelectedSujets.forEach((sujetId: number) => {
        setValue(`sujet_${sujetId}`, true);
      });
    }
  }, [getValues, setValue]);

  // Fetch sujets from endpoint
  useEffect(() => {
    const fetchData = async () => {
      const sujets: Sujet[] | undefined = await getData(
        appConfig.API_PATHS.SUJET.getAllSimple.path
      );
      return { sujets };
    };

    fetchData()
      .then((data) => {
        if (data) {
          setSujets(data.sujets || []);
        }
      })
      .catch((error) => {
        swal.error(
          "Erreur lors de la récupération des sujets",
          "Veuillez contacter l'administrateur."
        );
        console.error("Error fetching sujets:", error);
      });
  }, []); // Handle sujet selection (max 3)
  const handleSujetChange = (sujetId: number, isChecked: boolean) => {
    console.log(`Checkbox ${sujetId} changed to:`, isChecked);

    let newSelection: number[];

    if (isChecked) {
      // Add sujet if less than 3 are selected
      if (selectedSujets.length < 3) {
        newSelection = [...selectedSujets, sujetId];
      } else {
        // Show warning or prevent selection
        alert("Vous ne pouvez sélectionner que 3 sujets maximum.");
        return;
      }
    } else {
      // Remove sujet
      newSelection = selectedSujets.filter((id) => id !== sujetId);
    }

    console.log("New selection:", newSelection);
    setSelectedSujets(newSelection);
    setValue("selectedSujets", newSelection);

    // Also update the individual checkbox field
    setValue(`sujet_${sujetId}`, isChecked);

    console.log("Updated form values:", getValues());
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold text-blue-600 flex items-center mb-4">
        <span className="mr-2">
          <i className="fas fa-lightbulb text-blue-600"></i>
        </span>
        Sélection des Sujets de Recherche
      </h3>

      {/* Sujets Selection Section */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Choisissez jusqu'à 3 sujets qui vous intéressent *
          </label>

          {!sujets ? (
            <p className="text-gray-500">Chargement des sujets...</p>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto border border-gray-200 rounded-md p-4">
              {" "}
              {sujets.map((sujet: Sujet) => (
                <CheckboxField
                  key={sujet.id}
                  label={sujet.intitule}
                  name={`sujet_${sujet.id}`}
                  register={register}
                  errors={errors}
                  control={control}
                  disabled={
                    !selectedSujets.includes(sujet.id) &&
                    selectedSujets.length >= 3
                  }
                  onChange={(checked: boolean) =>
                    handleSujetChange(sujet.id, checked)
                  }
                  // Uncomment below if teams should be displayed
                  // description={sujet.teams ? `Équipes: ${sujet.teams.join(", ")}` : undefined}
                />
              ))}
            </div>
          )}

          <div className="mt-2 text-sm text-gray-600">
            {selectedSujets.length}/3 sujets sélectionnés
          </div>

          {errors.selectedSujets && (
            <p className="mt-1 text-sm text-red-600">
              {typeof errors.selectedSujets?.message === "string"
                ? errors.selectedSujets.message
                : "Veuillez sélectionner au moins un sujet"}
            </p>
          )}

          {/* Hidden input to register the field with react-hook-form */}
          <input
            type="hidden"
            {...register("selectedSujets", {
              required: "Veuillez sélectionner au moins un sujet",
              validate: (value) =>
                Array.isArray(value) && value.length > 0
                  ? true
                  : "Veuillez sélectionner au moins un sujet",
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default ResearchSubjectsForm;
