import { CheckboxFieldProps } from "@/Components/Form/FormInterfaces";
import React from "react";
import { Controller } from "react-hook-form";

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  name,
  register,
  control,
  errors,
  required = false,
  disabled = false,
  description,
  onChange,
  className = "",
}) => {
  const error = errors[name];

  // If control is provided, use Controller for controlled component
  if (control) {
    return (
      <div className={`mb-4 ${className}`}>
        <div className="flex items-start">
          {" "}
          <Controller
            name={name}
            control={control}
            rules={{
              required: required ? `${label} est requis` : false,
            }}
            render={({ field }) => (
              <input
                ref={field.ref}
                name={field.name}
                type="checkbox"
                id={name}
                checked={!!field.value}
                className={`
                  mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded
                  ${
                    disabled
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }
                  ${error ? "border-red-500 focus:ring-red-500" : ""}
                `}
                disabled={disabled}
                onChange={(e) => {
                  field.onChange(e.target.checked);
                  if (onChange) {
                    onChange(e.target.checked);
                  }
                }}
              />
            )}
          />
          <div className="ml-3">
            <label
              htmlFor={name}
              className={`
                block text-sm font-medium cursor-pointer
                ${disabled ? "text-gray-400" : "text-gray-700"}
                ${error ? "text-red-700" : ""}
              `}
            >
              {" "}
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {description && (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}
            {error && (
              <p className="mt-1 text-sm text-red-600">
                {typeof error?.message === "string"
                  ? error.message
                  : `${label} est requis`}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Fallback to uncontrolled component with register
  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex items-start">
        <input
          type="checkbox"
          id={name}
          defaultChecked={false}
          className={`
            mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            ${error ? "border-red-500 focus:ring-red-500" : ""}
          `}
          disabled={disabled}
          {...(register &&
            register(name, {
              required: required ? `${label} est requis` : false,
            }))}
          onChange={(e) => {
            if (onChange) {
              onChange(e.target.checked);
            }
          }}
        />
        <div className="ml-3">
          <label
            htmlFor={name}
            className={`
              block text-sm font-medium cursor-pointer
              ${disabled ? "text-gray-400" : "text-gray-700"}
              ${error ? "text-red-700" : ""}
            `}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
          {error && (
            <p className="mt-1 text-sm text-red-600">
              {typeof error?.message === "string"
                ? error.message
                : `${label} est requis`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckboxField;
