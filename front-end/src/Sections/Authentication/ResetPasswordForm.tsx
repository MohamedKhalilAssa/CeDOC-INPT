import InputField from "@/Components/Form/InputField";
import { getQueryParam, postData } from "@/Helpers/CRUDFunctions";
import { useAlert } from "@/Hooks/UseAlert";
import appConfig from "@/public/config";
import { decodedJWT } from "@/Types/GlobalTypes";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

type ResetPasswordFormValues = {
  newPassword: string;
  newPasswordConfirmation: string;
};

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const alert = useAlert();

  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>();

  useEffect(() => {
    const t = getQueryParam(location.search, "t");
    const e = getQueryParam(location.search, "email");
    if (!t || !e) {
      alert.toast("Acces interdit!", "error");
      navigate(appConfig.FRONTEND_PATHS.AUTH.forgotPassword.path);
      return;
    }

    const decoded: decodedJWT = jwtDecode(t);
    console.log("decoded.exp:", decoded?.exp);
    console.log("now:", Math.floor(Date.now() / 1000));
    if (!decoded || decoded.exp < Math.floor(Date.now() / 1000)) {
      alert.toast("Token expiré ou invalide!", "error");
      navigate(appConfig.FRONTEND_PATHS.AUTH.forgotPassword.path);
      return;
    }

    setToken(t);
    setEmail(e);
  }, [location.search, navigate]);

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (data.newPassword !== data.newPasswordConfirmation) {
      setError("newPasswordConfirmation", {
        type: "manual",
        message: "Les mots de passe ne correspondent pas.",
      });
      return;
    }

    if (!token || !email) {
      alert.error("Erreur", "Token ou email manquant.");
      navigate(appConfig.FRONTEND_PATHS.AUTH.forgotPassword.path);
      return;
    }

    setLoading(true);
    try {
      await postData(appConfig.API_PATHS.AUTH.resetPassword.path, {
        token,
        email,
        newPassword: data.newPassword,
        newPasswordConfirmation: data.newPasswordConfirmation,
      });
      alert.success("Succès", "Votre mot de passe a été réinitialisé.");
      navigate(appConfig.FRONTEND_PATHS.AUTH.login.path);
    } catch (err: any) {
      alert.error(
        "Erreur",
        err?.errors || "Impossible de réinitialiser le mot de passe."
      );
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      name: "newPassword",
      label: "Nouveau mot de passe",
      placeholder: "Nouveau mot de passe",
      type: "password",
      isPassword: true,
      required: true,
      validation: {
        required: "Le mot de passe est requis.",
        minLength: {
          value: 6,
          message: "Minimum 6 caractères.",
        },
      },
    },
    {
      name: "newPasswordConfirmation",
      label: "Confirmer le mot de passe",
      placeholder: "Confirmer le mot de passe",
      type: "password",
      isPassword: true,
      required: true,
      validation: {
        required: "Confirmez le mot de passe.",
      },
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-4">
          Réinitialiser le mot de passe
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Entrez un nouveau mot de passe.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {fields.map((field) => (
            <InputField
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              register={register}
              errors={errors}
              validation={field.validation}
              required={field.required}
              isPassword={field.isPassword}
            />
          ))}

          <button
            type="submit"
            className="w-full py-2 bg-black text-white rounded hover:bg-gray-800 cursor-pointer transition duration-300"
            disabled={loading}
          >
            {loading ? "Réinitialisation..." : "Réinitialiser"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
