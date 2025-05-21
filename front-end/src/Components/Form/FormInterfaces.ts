export interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  register: any;
  errors: any;
  validation?: any;
  classes?: string;
  isPassword?: boolean;
}
export interface SelectFieldProps {
  label: string;
  name: string;
  options: { value: string | number; label: string | number }[];
  required?: boolean;
  register: any;
  errors: any;
  classes?: string;
}
export interface DatePickerProps {
  label: string;
  name: string;
  required?: boolean;
  register: any;
  errors: any;
  classes?: string;
}

export interface FileUploadProps {
  label: string;
  name: string;
  required?: boolean;
  register: any;
  errors: any;
  classes?: string;
  accept?: string;
  helpText?: string;
  setValue?: any;
  getValues?: any;
}

export interface TagInputProps {
  label: string;
  name: string;
  required?: boolean;
  register: any;
  errors: any;
  classes?: string;
  tags: string[];
  setTags: (tags: string[]) => void;
  placeholder?: string;
  setValue?: any;
  getValues?: any;
}

export interface TextAreaProps {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  register: any;
  errors: any;
  validation?: any;
  classes?: string;
  rows?: number;
}
