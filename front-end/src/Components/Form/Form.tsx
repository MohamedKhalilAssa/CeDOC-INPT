import appConfig from "@/public/config";
import {
  EtatCivilEnum,
  GenreEnum,
  RegisterFormValues,
} from "@/Types/RegisterTypes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import SelectField from "./SelectField";

const SignUpForm = () => {
  const genreOptions = Object.entries(GenreEnum).map(([key, value]) => ({
    label: value,
    value: value,
  }));

  const etatCivilOptions = Object.entries(EtatCivilEnum).map(
    ([key, value]) => ({
      label: value,
      value: value,
    })
  );
  const [page, setPage] = useState<1 | 2>(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<RegisterFormValues>();

  const goToPageTwo = async () => {
    const valid = await trigger([
      "prenom",
      "nom",
      "telephone",
      "dateNaissance",
      "nationaliteId",
      "lieuDeNaissanceId",
      "genre",
      "etatCivilEnum",
    ]);
    if (valid) setPage(2);
  };
  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="h-screen flex items-center justify-center  p-4">
      <div className="flex w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
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
            {page === 1 && (
              <>
                <div className="first-sheet">
                  <div className="flex gap-4 md:flex-row flex-col">
                    <InputField
                      label="Prenom"
                      name="prenom"
                      type="text"
                      placeholder="John"
                      register={register}
                      errors={errors}
                      classes="lg:w-1/2 w-full"
                      required
                    />
                    <InputField
                      label="nom"
                      name="nom"
                      type="text"
                      placeholder="Doe"
                      register={register}
                      errors={errors}
                      classes="lg:w-1/2 w-full"
                      required
                    />
                  </div>

                  <InputField
                    label="Telephone"
                    name="telephone"
                    type="tel"
                    placeholder="+212 6 XX XX XX XX"
                    register={register}
                    errors={errors}
                    required
                  />

                  <InputField
                    label="Date de naissance"
                    name="dateNaissance"
                    type="date"
                    register={register}
                    errors={errors}
                    required
                  />
                  <SelectField
                    label="Nationalite"
                    name="nationaliteId"
                    options={genreOptions}
                    register={register}
                    errors={errors}
                    required
                  />
                  <SelectField
                    label="Lieu de Naissance"
                    name="lieuDeNaissanceId"
                    options={genreOptions}
                    register={register}
                    errors={errors}
                    required
                  />
                  <div className="flex justify-between gap-4 md:flex-row flex-col">
                    <SelectField
                      label="Genre"
                      name="genre"
                      options={genreOptions}
                      register={register}
                      classes="lg:w-1/2 w-full"
                      errors={errors}
                      required
                    />

                    <SelectField
                      label="Etat civil"
                      name="etatCivilEnum"
                      options={etatCivilOptions}
                      classes="lg:w-1/2 w-full"
                      register={register}
                      errors={errors}
                      required
                    />
                  </div>
                </div>
                <button
                  className="cursor-pointer w-full py-3 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition"
                  onClick={goToPageTwo}
                >
                  Next
                </button>
              </>
            )}
            {page === 2 && (
              <>
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

                <div className="flex justify-between items-center gap-4">
                  <button
                    type="button"
                    className=" w-full lg:w-1/2 cursor-pointer py-3 bg-gray-300 text-black rounded-md font-semibold hover:bg-gray-400 transition"
                    onClick={() => setPage(1)}
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="w-full lg:w-1/2 cursor-pointer py-3 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition"
                  >
                    Sign Up
                  </button>
                </div>
              </>
            )}

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
