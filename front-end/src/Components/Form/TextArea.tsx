import { TextAreaProps } from "@/Components/Form/FormInterfaces";

const TextArea = ({
  label,
  name,
  placeholder,
  required = false,
  register,
  errors,
  validation = {},
  classes,
  rows = 4,
}: TextAreaProps) => {
  return (
    <div className={`mb-4 ${classes}`}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input-focus ${
          errors[name] ? "border-red-500" : ""
        }`}
        {...register(name, {
          required: required ? `${label} est requis` : false,
          ...validation,
        })}
      ></textarea>
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>
      )}
    </div>
  );
};

export default TextArea;
