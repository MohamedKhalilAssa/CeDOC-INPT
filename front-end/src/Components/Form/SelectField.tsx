import { SelectFieldProps } from "@/Components/Form/FormInterfaces.ts";
import { Controller } from "react-hook-form";

const SelectField = ({
  label,
  name,
  options,
  required = false,
  register,
  control,
  errors,
  classes,
  defaultValue = "",
}: SelectFieldProps) => {
  // If control is provided, use Controller for controlled component
  if (control) {
    return (
      <div className={`mb-4 ${classes}`}>
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>{" "}
        <Controller
          name={name}
          control={control}
          rules={{
            required: required ? `${label} is required` : false,
          }}
          render={({ field }) => (
            <select
              {...field}
              id={name}
              value={field.value || ""}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input-focus ${
                errors[name] ? "border-red-500" : ""
              }`}
            >
              <option value="">Sélectionnez {label}</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        />
        {errors[name] && (
          <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>
        )}
      </div>
    );
  }

  // Fallback to uncontrolled component with register
  return (
    <div className={`mb-4 ${classes}`}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        defaultValue={defaultValue}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input-focus ${
          errors[name] ? "border-red-500" : ""
        }`}
        {...register(name, {
          required: required ? `${label} is required` : false,
        })}
      >
        <option value="">Sélectionnez {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>
      )}
    </div>
  );
};

export default SelectField;
