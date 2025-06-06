import { DatePickerProps } from "@/Components/Form/FormInterfaces";
import { Controller } from "react-hook-form";

const DatePicker = ({
  label,
  name,
  required = false,
  register,
  control,
  errors,
  classes,
  defaultValue = null,
}: DatePickerProps) => {
  // Format the value for the date input
  const formatDateValue = (value: any) => {
    if (!value) return "";
    if (value instanceof Date) {
      return value.toISOString().split("T")[0];
    }
    if (typeof value === "string") {
      // Handle string dates
      const date = new Date(value);
      return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
    }
    return "";
  };

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
            required: required ? `${label} est requis` : false,
          }}
          render={({ field }) => (
            <input
              {...field}
              value={formatDateValue(field.value)}
              type="date"
              id={name}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input-focus ${
                errors[name] ? "border-red-500" : ""
              }`}
            />
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
      <input
        defaultValue={formatDateValue(defaultValue)}
        type="date"
        id={name}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input-focus ${
          errors[name] ? "border-red-500" : ""
        }`}
        {...register(name, {
          required: required ? `${label} est requis` : false,
        })}
      />
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>
      )}
    </div>
  );
};

export default DatePicker;
