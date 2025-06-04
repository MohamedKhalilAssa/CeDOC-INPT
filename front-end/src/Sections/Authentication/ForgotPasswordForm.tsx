import InputField from "@/Components/Form/InputField";
import { postData } from "@/Helpers/CRUDFunctions";
import { useAlert } from "@/Hooks/UseAlert";
import appConfig from "@/public/config";
import { useState } from "react";
import { useForm } from "react-hook-form";

type ForgotPasswordFormValues = { email: string };

const ForgotPasswordForm = () => {
  const alert = useAlert();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>();

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setLoading(true);
    try {
      await postData(appConfig.API_PATHS.AUTH.forgotPassword.path, {
        email: data.email,
      });
      alert.info(
        "Email envoyé",
        "Un lien de réinitialisation a été envoyé à votre adresse email."
      );
    } catch (err: any) {
      if (Array.isArray(err.errors)) {
        err.errors.forEach((e: { field: string; message: string }) => {
          setError(e.field as keyof ForgotPasswordFormValues, {
            type: "manual",
            message: e.message,
          });
        });
      } else {
        alert.error("Erreur", err?.errors || "Une erreur est survenue.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-4">
          Mot de passe oublié
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Entrez votre adresse email pour recevoir un lien de réinitialisation.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="nom.prenom@example.com"
            register={register}
            errors={errors}
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-black text-white rounded hover:bg-gray-800 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Envoi..." : "Envoyer le lien"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
