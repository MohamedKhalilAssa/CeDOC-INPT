interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  register: any;
  errors: any;
  validation?: any;
  classes?: string;
}
interface SelectFieldProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  required?: boolean;
  register: any;
  errors: any;
  classes?: string;
}
interface FormComponentProps {
  title: string;
  onSubmit: (data: any) => void;
  children: React.ReactNode;
}
export type { FormComponentProps, InputFieldProps, SelectFieldProps };
