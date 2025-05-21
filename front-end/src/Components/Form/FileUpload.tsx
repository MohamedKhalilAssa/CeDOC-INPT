import { FileUploadProps } from "@/Components/Form/FormInterfaces";
import { FileCheck, Upload, XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const FileUpload = ({
  label,
  name,
  required = false,
  register,
  errors,
  classes = "",
  accept = ".pdf,.doc,.docx",
  helpText,
  setValue,
  getValues,
}: FileUploadProps) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { ref: reactHookFormRef, ...rest } = register(name, {
    required: required && "Ce champ est obligatoire",
    validate: {
      fileUploaded: (value: any) => {
        if (required && (!value || !(value instanceof File))) {
          return "Veuillez télécharger un fichier valide";
        }

        if (value instanceof File) {
          // Additional validation if a file is present
          if (value.size > 5 * 1024 * 1024) {
            return "La taille du fichier ne doit pas dépasser 5MB";
          }

          const ext = value.name.split(".").pop()?.toLowerCase();
          const allowed = accept
            .split(",")
            .map((type) => type.trim().replace(".", "").toLowerCase());

          if (!ext || !allowed.includes(ext)) {
            return `Format non accepté. Types acceptés: ${accept.replace(
              /\./g,
              ""
            )}`;
          }
        }

        return true;
      },
    },
  });

  // Properly combine refs with a callback ref that handles both React Hook Form and our component ref
  const setRefs = (el: HTMLInputElement | null) => {
    // Register with React Hook Form
    reactHookFormRef(el);

    // Update our local ref
    fileInputRef.current = el;
  };

  useEffect(() => {
    if (!getValues) return;

    const storedFile = getValues(name);
    if (storedFile && storedFile instanceof File) {
      setFileName(storedFile.name);

      // Restore file to input
      setTimeout(() => {
        if (fileInputRef.current) {
          try {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(storedFile);
            fileInputRef.current.files = dataTransfer.files;
          } catch (error) {
            console.error("Failed to restore file to input:", error);
          }
        }
      }, 100);
    }
  }, [getValues, name]);

  const validateFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setFileError("La taille du fichier ne doit pas dépasser 5MB");
      return false;
    }

    const ext = file.name.split(".").pop()?.toLowerCase();
    const allowed = accept
      .split(",")
      .map((type) => type.replace(".", "").toLowerCase());

    if (!ext || !allowed.includes(ext)) {
      setFileError(
        `Format non accepté. Types acceptés: ${accept.replace(/\./g, "")}`
      );
      return false;
    }

    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];

    if (file && validateFile(file)) {
      setFileName(file.name);
      setValue?.(name, file, { shouldValidate: true });
    } else {
      setFileName(null);
      setValue?.(name, null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    setFileError(null);

    const file = e.dataTransfer.files?.[0];
    if (!file || !validateFile(file)) return;

    setFileName(file.name);
    setValue?.(name, file, { shouldValidate: true });

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files;
      fileInputRef.current.dispatchEvent(
        new Event("change", { bubbles: true })
      );
    }
  };

  const clearFile = (e: React.MouseEvent) => {
    e.preventDefault();
    setFileName(null);
    setFileError(null);
    setValue?.(name, null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const openFileDialog = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) openFileDialog(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openFileDialog(e as any);
    }
  };

  return (
    <div className={`mb-4 ${classes}`}>
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div
        onClick={handleContainerClick}
        onKeyDown={handleKeyDown}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        tabIndex={0}
        role="button"
        aria-label={`Upload ${label}`}
        className={`relative border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer
          ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : fileName
              ? "border-gray-300 bg-gray-50"
              : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
          }
          transition-colors duration-200 min-h-[120px] outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
      >
        <input
          type="file"
          id={name}
          name={name}
          accept={accept}
          {...rest}
          ref={setRefs}
          className="hidden absolute"
          onChange={handleFileChange}
        />

        {fileName ? (
          <div className="flex flex-col items-center space-y-2">
            <FileCheck className="w-8 h-8 text-green-500" />
            <p className="text-sm text-gray-700 text-center">{fileName}</p>
            <button
              className="text-red-500 text-xs hover:underline mt-1"
              onClick={clearFile}
            >
              <XCircle className="inline-block w-4 h-4 mr-1" />
              Supprimer
            </button>
          </div>
        ) : (
          <div className="text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto" />
            <p className="text-gray-500 text-sm mt-2">
              Glissez et déposez un fichier ou cliquez ici
            </p>
          </div>
        )}
      </div>

      {fileError && <p className="mt-1 text-sm text-red-600">{fileError}</p>}
      {errors?.[name] && (
        <p className="mt-1 text-sm text-red-600">
          {errors[name]?.message?.toString()}
        </p>
      )}
      {helpText && <p className="mt-1 text-sm text-gray-500">{helpText}</p>}
    </div>
  );
};

export default FileUpload;
