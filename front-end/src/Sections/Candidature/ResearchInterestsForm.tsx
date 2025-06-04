import SelectField from "@/Components/Form/SelectField";
import TagInput from "@/Components/Form/TagInput";
import TextArea from "@/Components/Form/TextArea";
import { UseFormReturn } from "react-hook-form";

// Define research area options MAYBE FOR LATER
const researchAreaOptions = [
  { value: "cs", label: "Informatique" },
  { value: "ai", label: "Intelligence Artificielle" },
  { value: "physics", label: "Physique" },
  { value: "chemistry", label: "Chimie" },
  { value: "biology", label: "Biologie" },
  { value: "math", label: "Mathématiques" },
  { value: "humanities", label: "Sciences Humaines" },
  { value: "social", label: "Sciences Sociales" },
  { value: "business", label: "Commerce et Gestion" },
  { value: "engineering", label: "Ingénierie" },
];

interface ResearchInterestsFormProps {
  form: UseFormReturn<any>;
  keywords: string[];
  setKeywords: (keywords: string[]) => void;
}

const ResearchInterestsForm = ({
  form,
  keywords,
  setKeywords,
}: ResearchInterestsFormProps) => {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = form;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold text-blue-600 flex items-center mb-4">
        <span className="mr-2">
          <i className="fas fa-lightbulb text-blue-600"></i>
        </span>
        Intérêts de Recherche
      </h3>

      <div className="mb-4">
        <SelectField
          label="Domaine de recherche principal"
          name="primaryResearchArea"
          options={researchAreaOptions}
          register={register}
          errors={errors}
          required={true}
        />
      </div>

      <TagInput
        label="Mots-clés"
        name="keywords"
        register={register}
        errors={errors}
        tags={keywords}
        setTags={setKeywords}
        placeholder="Ajouter un mot-clé et appuyez sur Entrée"
        required={true}
        setValue={setValue}
        getValues={getValues}
      />

      <div className="mt-4">
        <TextArea
          label="Énoncé de recherche"
          name="researchStatement"
          placeholder="Décrivez brièvement vos intérêts de recherche et objectifs..."
          register={register}
          errors={errors}
          required={true}
          rows={6}
        />
      </div>
    </div>
  );
};

export default ResearchInterestsForm;
