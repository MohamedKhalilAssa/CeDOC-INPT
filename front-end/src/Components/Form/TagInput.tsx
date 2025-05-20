import { TagInputProps } from "@/Components/Form/FormInterfaces";
import { useState } from "react";

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
}: TagInputProps) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (input.trim() && !tags.includes(input.trim())) {
        setTags([...tags, input.trim()]);
        setInput("");
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
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
                &times;
              </button>
            </div>
          ))}
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors[name] ? "border-red-500" : ""
          }`}
        />
        <input
          type="hidden"
          {...register(name, {
            required: required ? `${label} est requis` : false,
            validate: (value : string) => {
              if (required && tags.length === 0) {
                return `${label} est requis`;
              }
              console.log("Value from tagInput:"+ value);
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
