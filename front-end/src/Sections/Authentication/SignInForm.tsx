import InputField from "@/Components/Form/InputField";
import { postData } from "@/Helpers/CRUDFunctions";
import appConfig from "@/public/config";
import {
  AuthenticationFormValues,
  AuthenticationResponseValues,
} from "@/Types/RegisterTypes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    setError,

    formState: { errors },
  } = useForm<AuthenticationFormValues>();

  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const onSubmit = async (data: AuthenticationFormValues) => {
    setLoading(true);
    try {
      const res: AuthenticationResponseValues | undefined = await postData(
        appConfig.API_PATHS.login.path,
        data
      );

      localStorage.setItem("token", "Bearer " + res?.access_token || "");
      Swal.fire({
        icon: "success",
        title: "Authentication réussie",
        text: res?.message || "Vous etes authentifié.",
      });
      setTimeout(() => {
        navigate(appConfig.FRONTEND_PATHS.landingPage.path);
      }, 1000);
    } catch (err: any) {
      if (Array.isArray(err.errors)) {
        // Backend returned validation errors: map to form fields
        err.errors.forEach((e: { field: string; message: string }) => {
          console.log(e);
          if (e.field === "global") {
            setGlobalError(e.message);
          } else {
            setError(e.field as keyof AuthenticationFormValues, {
              type: "manual",
              message: e.message,
            });
          }
        });
      } else {
        // General API error
        Swal.fire({
          icon: "error",
          title: "Erreur d'authentification: " + err.status,
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
              <h2 className="text-3xl font-bold text-gray-800 ">
                Authentification
              </h2>
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

              {globalError && (
                <p className="mt-1 text-sm text-red-600">{globalError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full disabled:opacity-50 cursor-pointer py-3 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition"
              disabled={loading}
            >
              {loading ? "Chargement..." : "Se connecter"}
            </button>

            <p className="text-sm text-center mt-4 text-gray-600">
              Vous n'avez pas de compte?{" "}
              <Link
                to={`${appConfig.FRONTEND_PATHS.register.path}`}
                className="text-blue-600 hover:underline"
              >
                Creer un compte
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
