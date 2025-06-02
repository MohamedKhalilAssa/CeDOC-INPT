import Inpt_Illustration_1 from "@/assets/images/Inpt_Illustration_1.png";
import InputField from "@/Components/Form/InputField";
import { AuthContextType, useAuth } from "@/Context/Auth/index";
import { userDirectedLoginStorage } from "@/Helpers/AuthFunctions";
import { postData } from "@/Helpers/CRUDFunctions";
import { useAlert } from "@/Hooks/UseAlert";
import appConfig from "@/public/config";
import {
  AuthenticationFormValues,
  AuthenticationResponseValues,
} from "@/Types/AuthTypes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    setError,

    formState: { errors },
  } = useForm<AuthenticationFormValues>();

  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | undefined>(undefined);
  const alert = useAlert();
  const auth: AuthContextType = useAuth();
  const navigate = useNavigate();
  const onSubmit = async (data: AuthenticationFormValues) => {
    setLoading(true);
    try {
      const res: AuthenticationResponseValues | undefined = await postData(
        appConfig.API_PATHS.login.path,
        data
      );
      userDirectedLoginStorage();
      auth.login();
      alert.toast(res?.message || "Authentication réussie", "success");
      setTimeout(() => {
        navigate(appConfig.FRONTEND_PATHS.landingPage.path);
      }, 200);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        alert.error(
          "Erreur d'authentification: " + err.status,
          err.errors || "Une erreur est survenue"
        );
        auth.logout();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen lg:h-[80vh] flex justify-center items-center">
      <div className="flex w-full max-w-xl lg:max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden h-[80vh]">
        {/* Left: Illustration */}
        <div className="w-1/2 hidden lg:block">
          <img
            src={Inpt_Illustration_1}
            alt="Signup Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Form */}
        <div className="w-full lg:w-1/2 p-10 ">
          <div className="wrapper-title w-full flex justify-center md:justify-start ">
            <div className="text-center md:text-left flex h-12  items-center justify-between ">
              <h2 className="text-3xl font-bold text-gray-800 ">
                Authentification
              </h2>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="second-sheet my-8">
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
            <p className="text-sm text-center mt-4 text-gray-600">
              Mot de passe oublié?{" "}
              <Link
                to={`${appConfig.FRONTEND_PATHS.forgotPassword.path}`}
                className="text-blue-600 hover:underline"
              >
                Recuperer le mot de passe
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
