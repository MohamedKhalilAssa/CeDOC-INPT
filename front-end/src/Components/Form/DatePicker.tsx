import { DatePickerProps } from "@/Components/Form/FormInterfaces";

const DatePicker = ({
  label,
  name,
  required = false,
  register,
  errors,
  classes,
  defaultValue = null,
}: DatePickerProps) => {
  return (
    <div className={`mb-4 ${classes}`}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        value={defaultValue ? defaultValue.toISOString().split("T")[0] : ""}
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
