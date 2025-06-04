import FileUpload from "@/Components/Form/FileUpload";
import { UseFormReturn } from "react-hook-form";

interface DossierCandidatureFormProps {
  form: UseFormReturn<any>;
}

const DossierCandidatureForm = ({ form }: DossierCandidatureFormProps) => {
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
          <i className="fas fa-file-alt text-blue-600"></i>
        </span>
        Dossier de Candidature
      </h3>

      <FileUpload
        label="Document"
        name="dossierCandidature"
        register={register}
        errors={errors}
        required={true}
        helpText="Dossier .zip contenant : CV - Relevés de notes - Diplômes (BAC + autres diplômes)"
        setValue={setValue}
        getValues={getValues}
        accept=".zip"
      />
    </div>
  );
};

export default DossierCandidatureForm;
