import { TagInputProps } from "@/Components/Form/FormInterfaces";
import { useEffect, useState } from "react";

const TagInput = ({
  label,
  name,
  required = false,
  register,
  errors,
  classes,
  tags,
  setTags,
  placeholder = "Ajouter un mot-clé...",
  setValue,
}: TagInputProps) => {
  const [input, setInput] = useState("");

  // When tags changes, update the hidden input value
  useEffect(() => {
    if (setValue && tags.length > 0) {
      setValue(name, tags.join(","), { shouldValidate: true });
    }
  }, [tags, name, setValue]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    if (input.trim() && !tags.includes(input.trim())) {
      const newTags = [...tags, input.trim()];
      setTags(newTags);
      if (setValue) {
        setValue(name, newTags.join(","), { shouldValidate: true });
      }
      setInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    if (setValue) {
      setValue(name, newTags.join(","), { shouldValidate: true });
    }
  };

  return (
    <div className={`mb-4 ${classes}`}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-md flex items-center"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          ))}
        </div>
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`w-full px-3 py-2 pl-3 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors[name] ? "border-red-500" : ""
            }`}
          />
          <button
            type="button"
            onClick={addTag}
            className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800"
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <input
          type="hidden"
          {...register(name, {
            required: required ? `${label} est requis` : false,
            validate: () => {
              if (required && tags.length === 0) {
                return `${label} est requis`;
              }
              return true;
            },
          })}
          value={tags.join(",")}
        />
      </div>
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>
      )}
    </div>
  );
};

export default TagInput;
