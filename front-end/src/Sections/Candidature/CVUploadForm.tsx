import FileUpload from "@/Components/Form/FileUpload";
import { UseFormReturn } from "react-hook-form";

interface CVUploadFormProps {
  form: UseFormReturn<any>;
}

const CVUploadForm = ({ form }: CVUploadFormProps) => {
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
        Curriculum Vitae
      </h3>

      <FileUpload
        label="CV"
        name="cv"
        register={register}
        errors={errors}
        required={true}
        helpText="PDF, DOC ou DOCX (max 5MB)"
        setValue={setValue}
        getValues={getValues}
      />
    </div>
  );
};

export default CVUploadForm;
