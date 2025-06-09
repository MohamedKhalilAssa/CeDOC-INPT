import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export type UseAlert = {
  success: (title: string, text?: string) => void;
  error: (title: string, text?: string) => void;
  info: (title: string, text?: string) => void;
  toast: (message: string, type?: "success" | "error" | "info") => void;
  confirm: (
    title: string,
    text: string,
    confirmButtonText?: string
  ) => Promise<boolean>;
};

export const useAlert = (): UseAlert => {
  const success = (title: string, text?: string) =>
    MySwal.fire({ icon: "success", title, text });

  const error = (title: string, text?: string) =>
    MySwal.fire({ icon: "error", title, text });

  const info = (title: string, text?: string) =>
    MySwal.fire({ icon: "info", title, text });

  const toast = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) =>
    MySwal.fire({
      toast: true,
      position: "bottom-end",
      icon: type,
      title: message,
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
    });

  const confirm = async (
    title: string,
    text: string,
    confirmButtonText = "OK"
  ): Promise<boolean> => {
    const result = await MySwal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText: "Annuler",
    });

    return result.isConfirmed;
  };

  return { success, error, info, toast, confirm };
};
