import InputField from "@/Components/Form/InputField";
import SelectField from "@/Components/Form/SelectField";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

type BaseField = {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  validation?: any;
  classes?: string;
};

type InputOnly = BaseField & {
  isPassword?: boolean;
};

type SelectOnly = BaseField & {
  options: { label: string; value: string | number }[];
};

type Field = InputOnly | SelectOnly;

type Props<T extends FieldValues> = {
  fields: Field[];
  onSubmit: SubmitHandler<T>;
  buttonText?: string;
};

export function SimpleForm<T extends FieldValues>({
  fields,
  onSubmit,
  buttonText = "Envoyer",
}: Props<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {fields.map((field) => {
        if (field.type === "select" && "options" in field) {
          return (
            <SelectField
              key={field.name}
              label={field.label}
              name={field.name}
              options={field.options}
              register={register}
              errors={errors}
              required={field.required}
              classes={field.classes}
            />
          );
        } else {
          return (
            <InputField
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              register={register}
              errors={errors}
              validation={field.validation}
              required={field.required}
              isPassword={(field as InputOnly).isPassword}
              classes={field.classes}
            />
          );
        }
      })}

      <button
        type="submit"
        className="w-full cursor-pointer py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        {buttonText}
      </button>
    </form>
  );
}
