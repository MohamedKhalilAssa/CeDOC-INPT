import InputField from "@/Components/Form/InputField";
import SelectField from "@/Components/Form/SelectField";
import { UseFormReturn } from "react-hook-form";

// Define degree options
const degreeOptions = [
  { value: "master", label: "Master" },
  { value: "engineer", label: "Diplôme d'Ingénieur" },
  { value: "phd", label: "Doctorat" },
  { value: "other", label: "Autre" },
];

interface EducationHistoryFormProps {
  form: UseFormReturn<any>;
}

const EducationHistoryForm = ({ form }: EducationHistoryFormProps) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold text-blue-600 flex items-center mb-4">
        <span className="mr-2">
          <i className="fas fa-graduation-cap text-blue-600"></i>
        </span>
        Historique de Formation
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          label="Diplôme le plus élevé"
          name="highestDegree"
          options={degreeOptions}
          register={register}
          errors={errors}
          required={true}
        />

        <InputField
          label="Domaine d'étude"
          name="fieldOfStudy"
          type="text"
          placeholder="Ex: Informatique, Physique"
          register={register}
          errors={errors}
          required={true}
        />

        <InputField
          label="Institution"
          name="institution"
          type="text"
          placeholder="Nom de l'université ou école"
          register={register}
          errors={errors}
          required={true}
        />

        <InputField
          label="Année d'obtention"
          name="graduationYear"
          type="number"
          placeholder="AAAA"
          register={register}
          errors={errors}
          validation={{
            min: {
              value: 1950,
              message: "Année invalide",
            },
            max: {
              value: new Date().getFullYear(),
              message: "L'année ne peut pas être dans le futur",
            },
          }}
          required={true}
        />
      </div>

      <div className="mt-4">
        <InputField
          label="Titre du mémoire/thèse"
          name="thesisTitle"
          type="text"
          placeholder="Titre de votre mémoire ou thèse précédente"
          register={register}
          errors={errors}
          classes="w-full"
        />
      </div>

      <div className="mt-4">
        <button
          type="button"
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <i className="fas fa-plus-circle mr-1"></i>
          Ajouter un autre diplôme
        </button>
      </div>
    </div>
  );
};

export default EducationHistoryForm;
