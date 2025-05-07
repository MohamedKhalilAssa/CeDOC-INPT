import InputField from "@/Components/Form/InputField";
import { postData } from "@/Helpers/CRUDFunctions";
import appConfig from "@/public/config";
import {
  AuthenticationResponseValues,
  RegisterFormValues,
} from "@/Types/RegisterTypes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    setError,

    formState: { errors },
  } = useForm<RegisterFormValues>();

  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | undefined>(undefined);
  const onSubmit = async (data: RegisterFormValues) => {
    setLoading(true);
    console.log("Form Data:", data);
    try {
      const res: AuthenticationResponseValues | undefined = await postData(
        appConfig.API_PATHS.register.path,
        data
      );
      console.log(res);
      Swal.fire({
        icon: "success",
        title: "Inscription réussie",
        text:
          res?.message ||
          "Veuillez Verifier votre boite mail, avant de vous connecter.",
      });
    } catch (err: any) {
      if (Array.isArray(err.errors)) {
        // Backend returned validation errors: map to form fields
        err.errors.forEach((e: { field: string; message: string }) => {
          console.log(e);
          if (e.field === "global") {
            setGlobalError(e.message);
          } else {
            setError(e.field as keyof RegisterFormValues, {
              type: "manual",
              message: e.message,
            });
          }
        });
      } else {
        // General API error
        Swal.fire({
          icon: "error",
          title: "Erreur d'inscription: " + err.status,
          text: err.errors || "Une erreur est survenue",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex justify-center items-center">
      <div className="flex w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden min-h-[70vh]">
        {/* Left: Illustration */}
        <div className="w-1/2 hidden md:block">
          <img
            src={`${appConfig.BACKEND_URL}/images/Inpt_Illustration_1.png`}
            alt="Signup Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Form */}
        <div className="w-full md:w-1/2 p-10 ">
          <div className="wrapper-title w-full flex justify-center md:justify-start ">
            <div className="text-center md:text-left flex h-12  items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800 ">Inscription</h2>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="second-sheet my-20">
              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="nom.prenom@example.com"
                register={register}
                errors={errors}
                required
              />

              <InputField
                label="Mot de passe"
                name="password"
                type="password"
                placeholder="**********"
                register={register}
                errors={errors}
                required
                isPassword
              />
              <InputField
                label="Confirmer le mot de passe"
                name="passwordConfirmation"
                placeholder="**********"
                type="password"
                register={register}
                errors={errors}
                required
                isPassword
              />

              {globalError && (
                <p className="mt-1 text-sm text-red-600">{globalError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full disabled:opacity-50 cursor-pointer py-3 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition"
              disabled={loading}
            >
              {loading ? "Chargement..." : "S'inscrire"}
            </button>

            <p className="text-sm text-center mt-4 text-gray-600">
              Vous avez deja un compte?{" "}
              <Link
                to={`${appConfig.API_PATHS.login.path}`}
                className="text-blue-600 hover:underline"
              >
                Connectez-vous
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
