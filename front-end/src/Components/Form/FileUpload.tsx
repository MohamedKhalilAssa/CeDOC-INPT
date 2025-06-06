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
  // Track if we've already initialized from form values  // Validate file value for React Hook Form and the internal UI
  const { ref: reactHookFormRef, ...rest } = register(name, {
    required: required ? "Ce champ est obligatoire" : false,
    validate: {
      fileUploaded: (value: any) => {
        // Skip validation if not required and no file
        if (!required && (!value || value === null)) {
          return true;
        }

        // Check if required but missing
        if (required && (!value || !(value instanceof File))) {
          return "Veuillez télécharger un fichier valide";
        }

        if (value instanceof File) {
          // Check file size (5MB max)
          if (value.size > 5 * 1024 * 1024) {
            return "La taille du fichier ne doit pas dépasser 5MB";
          }

          // Check file extension
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
    if (el) {
      // React Hook Form ref registration
      reactHookFormRef(el);
      // Our local ref
      fileInputRef.current = el;

      // If we have a file value in the form, make sure it's represented in the input element
      if (getValues && getValues(name) instanceof File) {
        const file = getValues(name);
        try {
          if ("DataTransfer" in window) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            el.files = dataTransfer.files;
          }
        } catch (error) {
          console.error("Failed to restore file to input in ref:", error);
        }
      }
    }
  };

  useEffect(() => {
    if (!getValues) return;

    // Get the file from the form state
    const storedFile = getValues(name);

    // If there's a valid file in the form state
    if (storedFile && storedFile instanceof File) {
      // Update the UI with the filename
      setFileName(storedFile.name);

      // Make sure we validate the file
      if (!validateFile(storedFile)) {
        // If validation fails, clear the file from the form
        setValue?.(name, null, {
          shouldValidate: false,
          shouldDirty: true,
          shouldTouch: false,
        });
        return;
      }

      // Restore file to the input element for proper form submission
      if (fileInputRef.current && "DataTransfer" in window) {
        try {
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(storedFile);
          fileInputRef.current.files = dataTransfer.files;
        } catch (error) {
          console.error("Failed to restore file to input:", error);
          // Even if the DataTransfer fails, the form value is still set
        }
      }
    } else if (storedFile === null || storedFile === undefined) {
      // Clear UI if form value is cleared elsewhere
      setFileName(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [getValues, name, setValue]);

  const validateFile = (file: File): boolean => {
    setFileError(null); // Clear previous errors

    if (!file) {
      setFileError("Aucun fichier sélectionné");
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFileError("La taille du fichier ne doit pas dépasser 5MB");
      return false;
    }

    const ext = file.name.split(".").pop()?.toLowerCase();
    const allowed = accept
      .split(",")
      .map((type) => type.trim().replace(".", "").toLowerCase());

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

      // Create a copy of the file to ensure it persists between steps
      const persistentFile = new File([file], file.name, {
        type: file.type,
        lastModified: file.lastModified,
      });

      // Set the value without triggering validation to avoid false positives during upload
      setValue?.(name, persistentFile, {
        shouldValidate: false,
        shouldDirty: true,
        shouldTouch: false,
      });
    } else {
      setFileName(null);
      // Clear the value in React Hook Form
      setValue?.(name, null, {
        shouldValidate: false,
        shouldDirty: true,
        shouldTouch: false,
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation(); // Stop event propagation
    setIsDragging(false);
    setFileError(null);

    const file = e.dataTransfer.files?.[0];
    if (!file) {
      // No file dropped
      setFileError("Aucun fichier sélectionné");
      return;
    }

    if (!validateFile(file)) {
      // File validation failed, error set by validateFile
      return;
    }

    setFileName(file.name);

    // Create a copy of the file to ensure it persists between steps
    const persistentFile = new File([file], file.name, {
      type: file.type,
      lastModified: file.lastModified,
    });

    // Update React Hook Form with proper options
    setValue?.(name, persistentFile, {
      shouldValidate: false,
      shouldDirty: true,
      shouldTouch: false,
    });

    // Update the file input element to keep UI in sync
    try {
      if (fileInputRef.current && "DataTransfer" in window) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(persistentFile);
        fileInputRef.current.files = dataTransfer.files;
      }
    } catch (error) {
      console.error("Failed to sync file with input:", error);
    }
  };

  const clearFile = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Stop propagation to prevent container click
    setFileName(null);
    setFileError(null);

    // Update React Hook Form with null without triggering validation
    setValue?.(name, null, {
      shouldValidate: false,
      shouldDirty: true,
      shouldTouch: false,
    });

    // Clear the file input value
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const openFileDialog = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  // Handle clicks anywhere within the container to open file dialog
  const handleContainerClick = () => {
    fileInputRef.current?.click();
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
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(false);
        }}
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
          transition-colors duration-200 min-h-[120px] outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full`}
      >
        <input
          type="file"
          id={name}
          name={name}
          accept={accept}
          {...rest}
          ref={setRefs}
          className="hidden"
          onChange={handleFileChange}
        />

        {fileName ? (
          <div className="flex flex-col items-center space-y-2 w-full pointer-events-none">
            <FileCheck className="w-8 h-8 text-green-500" />
            <p className="text-sm text-gray-700 text-center">{fileName}</p>
            <button
              className="text-red-500 text-xs hover:underline mt-1 pointer-events-auto"
              onClick={clearFile}
              type="button"
            >
              <XCircle className="inline-block w-4 h-4 mr-1" />
              Supprimer
            </button>
          </div>
        ) : (
          <div className="text-center w-full pointer-events-none">
            <Upload className="w-8 h-8 text-gray-400 mx-auto" />
            <p className="text-gray-500 text-sm mt-2">
              Glissez et déposez un fichier ou cliquez ici
            </p>
          </div>
        )}
      </div>

      {fileError && <p className="mt-1 text-sm text-red-600">{fileError}</p>}
      {errors?.[name] && !fileError && (
        <p className="mt-1 text-sm text-red-600">
          {errors[name]?.message?.toString()}
        </p>
      )}
      {helpText && <p className="mt-1 text-sm text-gray-500">{helpText}</p>}
    </div>
  );
};

export default FileUpload;
