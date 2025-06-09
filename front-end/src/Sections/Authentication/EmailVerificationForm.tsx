import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { getQueryParam, postData } from "@/Helpers/CRUDFunctions";
import { useAlert } from "@/Hooks/UseAlert";
import appConfig from "@/public/config";
import { AuthenticationResponseValues } from "@/Types/AuthTypes";

// Types
type EmailFormValues = { email: string };
type TokenFormValues = { token: string; email: string };

const EmailVerificationForm = () => {
  const location = useLocation();
  const hasRunRef = useRef(false);
  const navigate = useNavigate();
  const alert = useAlert();

  const [page, setPage] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [canResendOtp, setCanResendOtp] = useState(true);

  // Email form hook
  const {
    register: registerEmail,
    handleSubmit: submitEmail,
    setError: setEmailError,
    formState: { errors: emailErrors },
  } = useForm<EmailFormValues>();

  // Token form hook
  const {
    register: registerToken,
    handleSubmit: submitToken,
    formState: { errors: tokenErrors },
  } = useForm<TokenFormValues>();

  // Handle token verification logic
  const verifyToken = async (token: string, emailToUse: string) => {
    setLoading(true);
    try {
      const res: AuthenticationResponseValues | undefined = await postData(
        appConfig.API_PATHS.AUTH.verifyEmail.path,
        {
          token,
          email: emailToUse,
        }
      );
      console.log(res);
      setVerified(true);
      alert.success(
        "Vérification réussie",
        "Votre email est maintenant vérifié."
      );
    } catch (err: any) {
      alert.error(
        "Échec de la vérification",
        err?.errors || "Token invalide ou expiré."
      );
    } finally {
      setLoading(false);
    }
  };

  // On email submit: check if verified, else send token
  const onEmailSubmit = async (data: EmailFormValues) => {
    setLoading(true);
    try {
      const res: AuthenticationResponseValues | undefined = await postData(
        appConfig.API_PATHS.AUTH.sendVerificationEmail.path,
        { email: data.email }
      );

      console.log(res);

      setEmail(data.email);
      setPage(2);
      alert.info(
        "Vérification de l'email",
        "Un email de vérification a été envoyé.<br/> Veuillez vérifier votre boîte de réception."
      );
      setCanResendOtp(false);
      setTimeout(() => {
        setCanResendOtp(true);
      }, 60000);
    } catch (err: any) {
      if (Array.isArray(err.errors)) {
        err.errors.forEach((e: { field: string; message: string }) => {
          setEmailError(e.field as keyof EmailFormValues, {
            type: "manual",
            message: e.message,
          });
        });
      } else {
        const error = err?.errors || "Une erreur est survenue.";
        let finalError;
        if (error.includes("deja verifi")) {
          finalError = `${error} \n Redirection...`;
          setTimeout(() => {
            navigate(appConfig.FRONTEND_PATHS.AUTH.login.path);
          }, 3000);
        }
        alert.error(
          "Échec de l'envoi",
          finalError || "Une erreur est survenue."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // On token submit manually
  const onTokenSubmit = async (data: TokenFormValues) => {
    if (!email) {
      alert.error(
        "Email requis",
        "Veuillez entrer votre email avant de vérifier le token."
      );

      return;
    }

    await verifyToken(data.token, email);
  };

  // Auto verification via query params
  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const token = getQueryParam(location.search, "t");
    const emailFromUrl = getQueryParam(location.search, "email");
    const autoFlag = getQueryParam(location.search, "auto");

    if (token && emailFromUrl && autoFlag === "1") {
      setEmail(emailFromUrl);
      verifyToken(token, emailFromUrl);
    }
  }, [location.search]);

  // Render logic
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[calc(100vh-10rem)]">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-4">
          Vérification d'email
        </h2>

        <p className="text-center text-gray-600 mb-4">
          {verified ? (
            <>
              Vous pouvez maintenant vous connecter.{" "}
              <Link
                to={appConfig.FRONTEND_PATHS.AUTH.login.path}
                className="text-blue-600 underline"
              >
                Se connecter
              </Link>
            </>
          ) : (
            "Veuillez saisir votre email puis le token envoyé par mail."
          )}
        </p>

        {loading ? (
          <p className="text-center text-gray-600">Chargement...</p>
        ) : verified ? (
          <p className="text-green-600 text-center">
            Votre email est vérifié. Vous pouvez vous connecter.
          </p>
        ) : (
          <>
            {page === 1 ? (
              <form onSubmit={submitEmail(onEmailSubmit)} className="space-y-4">
                <input
                  type="email"
                  placeholder="Votre email"
                  {...registerEmail("email", {
                    required: "L'email est requis.",
                  })}
                  className="w-full px-4 py-2 border rounded-md"
                />
                {emailErrors.email && (
                  <p className="text-red-500 text-sm">
                    {emailErrors.email.message}
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full cursor-pointer py-2 bg-black text-white rounded hover:bg-gray-800"
                >
                  Vérifier l'email
                </button>
              </form>
            ) : (
              <form onSubmit={submitToken(onTokenSubmit)} className="space-y-4">
                <input
                  type="text"
                  placeholder="Token de vérification"
                  {...registerToken("token", { required: "Token requis." })}
                  className="w-full px-4 py-2 border rounded-md"
                />
                {tokenErrors.token && (
                  <p className="text-red-500 text-sm">
                    {tokenErrors.token.message}
                  </p>
                )}
                <p>
                  Vous n'avez rien recu ?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      canResendOtp ? onEmailSubmit({ email }) : null;
                    }}
                    className={` ${
                      canResendOtp
                        ? "text-blue-500  hover:text-blue-700 hover:underline cursor-pointer"
                        : "text-gray-500"
                    }  transition`}
                  >
                    {canResendOtp ? "Clickez ici" : "Attendez 1 minute..."}
                  </button>
                </p>
                <button
                  type="submit"
                  className="w-full cursor-pointer py-2 bg-black text-white rounded hover:bg-gray-800"
                >
                  Vérifier le token
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EmailVerificationForm;
