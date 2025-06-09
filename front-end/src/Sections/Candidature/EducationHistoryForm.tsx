import InputField from "@/Components/Form/InputField";
import SelectField from "@/Components/Form/SelectField";
import {
  DiplomeEnum,
  EtablissementEnum,
  MentionEnum,
} from "@/Types/UtilisateursEnums";
import { UseFormReturn } from "react-hook-form";

// Define degree options
const diplomeOptions = Object.entries(DiplomeEnum).map(([key, value]) => ({
  value: key,
  label: value,
}));
const mentionOptions = Object.entries(MentionEnum).map(([key, value]) => ({
  value: key,
  label: value,
}));
const etablissementOptions = Object.entries(EtablissementEnum).map(
  ([key, value]) => ({
    value: key,
    label: value,
  })
);
interface EducationHistoryFormProps {
  form: UseFormReturn<any>;
}

const EducationHistoryForm = ({ form }: EducationHistoryFormProps) => {
  const {
    register,
    formState: { errors },
    control,
  } = form;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold text-blue-600 flex items-center mb-4">
        <span className="mr-2">
          <i className="fas fa-graduation-cap text-blue-600"></i>
        </span>
        Historique de Formation
      </h3>{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {" "}
        <SelectField
          label="Type d'établissement"
          name="typeEtablissement"
          options={etablissementOptions}
          register={register}
          errors={errors}
          control={control}
          required={true}
        />
        <SelectField
          label="Type de diplôme"
          name="diplome"
          options={diplomeOptions}
          register={register}
          errors={errors}
          control={control}
          required={true}
        />
        <SelectField
          label="Mention du diplôme"
          name="mentionDiplome"
          options={mentionOptions}
          register={register}
          errors={errors}
          control={control}
          required={true}
        />{" "}
        <SelectField
          label="Mention du BAC"
          name="mentionBac"
          options={mentionOptions}
          register={register}
          errors={errors}
          control={control}
          required={true}
        />
      </div>
      <div className="mt-4">
        <InputField
          label="Domaine d'étude"
          name="specialite"
          type="text"
          placeholder="Ex: Informatique, Mathématiques"
          register={register}
          errors={errors}
          control={control}
          required={true}
        />
      </div>
      <div className="mt-4">
        <InputField
          label="Intitulé du PFE"
          name="intitulePFE"
          type="text"
          placeholder="Titre de votre PFE"
          register={register}
          errors={errors}
          control={control}
          classes="w-full"
          required={true}
        />
      </div>
    </div>
  );
};

export default EducationHistoryForm;
