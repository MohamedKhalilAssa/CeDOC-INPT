import { InputFieldProps } from "@/Components/Form/FormInterfaces.ts";
import { useState } from "react";
import { Controller } from "react-hook-form";

const InputField = ({
  label,
  name,
  type,
  placeholder,
  register,
  control,
  errors,
  validation = {},
  classes,
  defaultValue,
  disabled = false,
  required = false,
  isPassword = false,
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  // If control is provided, use Controller for controlled component
  if (control) {
    return (
      <div className={`mb-5 ${classes}`}>
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>

        <div className="relative">
          {" "}
          <Controller
            name={name}
            control={control}
            rules={{
              required: required ? `${label} is required` : false,
              ...validation,
            }}
            render={({ field }) => (
              <input
                {...field}
                disabled={disabled}
                id={name}
                value={field.value || ""}
                type={
                  type === "password" && isPassword
                    ? showPassword
                      ? "text"
                      : "password"
                    : type
                }
                placeholder={placeholder}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input-focus disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-70 ${
                  errors[name] ? "border-red-500" : ""
                } ${isPassword ? "pr-10" : ""}`}
              />
            )}
          />
          {isPassword && (
            <button
              type="button"
              className="cursor-pointer absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i
                className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                aria-hidden="true"
              ></i>
            </button>
          )}
        </div>

        {errors[name] && (
          <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>
        )}
      </div>
    );
  }

  // Fallback to uncontrolled component with register
  return (
    <div className={`mb-5 ${classes}`}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <input
          disabled={disabled}
          id={name}
          type={
            type === "password" && isPassword
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
          defaultValue={defaultValue || ""}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input-focus disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-70 ${
            errors[name] ? "border-red-500" : ""
          } ${isPassword ? "pr-10" : ""}`}
          {...register(name, {
            required: required ? `${label} is required` : false,
            ...validation,
          })}
        />

        {isPassword && (
          <button
            type="button"
            className="cursor-pointer absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            <i
              className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
              aria-hidden="true"
            ></i>
          </button>
        )}
      </div>

      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>
      )}
    </div>
  );
};

export default InputField;
