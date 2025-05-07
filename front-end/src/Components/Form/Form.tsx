import appConfig from "@/public/config";
import { RegisterFormValues } from "@/Types/RegisterTypes";
import { useForm } from "react-hook-form";
import InputField from "./InputField";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="h-full flex justify-center items-center min-h-[calc(100vh-8rem)]">
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
            <div className="text-center md:text-left flex h-12 w-60 items-center justify-between mb-6">
              <img
                className="h-10 w-auto"
                src={`${appConfig.BACKEND_URL}/images/Logo_inpt.png`}
                alt="Logo INPT"
              />
              <span className="block h-full w-[1px] bg-black"></span>
              <h2 className="text-3xl font-bold text-gray-800 ">Sign Up</h2>
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
                register={register}
                errors={errors}
                required
              />
              <InputField
                label="Confirmer le mot de passe"
                name="passwordConfirmation"
                type="password"
                register={register}
                errors={errors}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full lg:w-1/2 cursor-pointer py-3 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition"
            >
              Sign Up
            </button>

            <p className="text-sm text-center mt-4 text-gray-600">
              Already have an account?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Log in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
