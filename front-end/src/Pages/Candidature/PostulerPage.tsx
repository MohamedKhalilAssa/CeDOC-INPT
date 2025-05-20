import DatePicker from "@/Components/Form/DatePicker";
import FileUpload from "@/Components/Form/FileUpload";
import InputField from "@/Components/Form/InputField";
import SelectField from "@/Components/Form/SelectField";
import TagInput from "@/Components/Form/TagInput";
import TextArea from "@/Components/Form/TextArea";
import ProgressSteps from "@/Components/Ui/ProgressSteps";
import { useState } from "react";
import { useForm } from "react-hook-form";

const steps = [
  { id: 1, name: "Inscription" },
  { id: 2, name: "Sujets de recherche" },
  { id: 3, name: "Candidature" },
  { id: 4, name: "Statut" },
];

const nationalityOptions = [
  { value: "fr", label: "France" },
  { value: "ca", label: "Canada" },
  { value: "be", label: "Belgique" },
  { value: "ch", label: "Suisse" },
  { value: "uk", label: "Royaume-Uni" },
  { value: "us", label: "États-Unis" },
  { value: "de", label: "Allemagne" },
  { value: "it", label: "Italie" },
  { value: "es", label: "Espagne" },
  // Ajoutez d'autres pays selon vos besoins
];

const degreeOptions = [
  { value: "master", label: "Master" },
  { value: "engineer", label: "Diplôme d'Ingénieur" },
  { value: "phd", label: "Doctorat" },
  { value: "other", label: "Autre" },
];

const researchAreaOptions = [
  { value: "cs", label: "Informatique" },
  { value: "ai", label: "Intelligence Artificielle" },
  { value: "physics", label: "Physique" },
  { value: "chemistry", label: "Chimie" },
  { value: "biology", label: "Biologie" },
  { value: "math", label: "Mathématiques" },
  { value: "humanities", label: "Sciences Humaines" },
  { value: "social", label: "Sciences Sociales" },
  { value: "business", label: "Commerce et Gestion" },
  { value: "engineering", label: "Ingénierie" },
];

const PostulerPage = () => {
  const [currentStep] = useState(1);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [agreementChecked, setAgreementChecked] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    // Logique pour soumettre le formulaire ou passer à l'étape suivante
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
        Inscription du Candidat
      </h1>
      <h2 className="text-center text-gray-600 mb-6">
        Étape 1 sur 4 - Informations Personnelles
      </h2>

      <ProgressSteps steps={steps} currentStep={currentStep} />

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto">
        {/* Section: Informations personnelles */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold text-blue-600 flex items-center mb-4">
            <span className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>
            Informations Personnelles
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Prénom"
              name="firstName"
              type="text"
              placeholder="Entrez votre prénom"
              register={register}
              errors={errors}
              required={true}
            />

            <InputField
              label="Nom"
              name="lastName"
              type="text"
              placeholder="Entrez votre nom de famille"
              register={register}
              errors={errors}
              required={true}
            />

            <InputField
              label="Email"
              name="email"
              type="email"
              placeholder="votre@email.com"
              register={register}
              errors={errors}
              validation={{
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Adresse email invalide",
                },
              }}
              required={true}
            />

            <InputField
              label="Téléphone"
              name="phone"
              type="tel"
              placeholder="+33 1 23 45 67 89"
              register={register}
              errors={errors}
              required={true}
            />

            <DatePicker
              label="Date de naissance"
              name="birthDate"
              register={register}
              errors={errors}
              required={true}
            />

            <SelectField
              label="Nationalité"
              name="nationality"
              options={nationalityOptions}
              register={register}
              errors={errors}
              required={true}
            />
          </div>
        </div>

        {/* Section: Historique de formation */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold text-blue-600 flex items-center mb-4">
            <span className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l9-5-9-5-9 5 9 5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </svg>
            </span>
            Historique de Formation
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Diplôme le plus élevé"
              name="highestDegree"
              options={degreeOptions}
              register={register}
              errors={errors}
              required={true}
            />

            <InputField
              label="Domaine d'étude"
              name="fieldOfStudy"
              type="text"
              placeholder="Ex: Informatique, Physique"
              register={register}
              errors={errors}
              required={true}
            />

            <InputField
              label="Institution"
              name="institution"
              type="text"
              placeholder="Nom de l'université ou école"
              register={register}
              errors={errors}
              required={true}
            />

            <InputField
              label="Année d'obtention"
              name="graduationYear"
              type="number"
              placeholder="AAAA"
              register={register}
              errors={errors}
              validation={{
                min: {
                  value: 1950,
                  message: "Année invalide",
                },
                max: {
                  value: new Date().getFullYear(),
                  message: "L'année ne peut pas être dans le futur",
                },
              }}
              required={true}
            />
          </div>

          <div className="mt-4">
            <InputField
              label="Titre du mémoire/thèse"
              name="thesisTitle"
              type="text"
              placeholder="Titre de votre mémoire ou thèse précédente"
              register={register}
              errors={errors}
              classes="w-full"
            />
          </div>

          <div className="mt-4">
            <button
              type="button"
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Ajouter un autre diplôme
            </button>
          </div>
        </div>

        {/* Section: CV */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold text-blue-600 flex items-center mb-4">
            <span className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </span>
            Curriculum Vitae
          </h3>

          <FileUpload
            label="CV"
            name="cv"
            register={register}
            errors={errors}
            required={true}
            helpText="PDF, DOC ou DOCX (max 5MB)"
          />
        </div>

        {/* Section: Intérêts de recherche */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold text-blue-600 flex items-center mb-4">
            <span className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </span>
            Intérêts de Recherche
          </h3>

          <div className="mb-4">
            <SelectField
              label="Domaine de recherche principal"
              name="primaryResearchArea"
              options={researchAreaOptions}
              register={register}
              errors={errors}
              required={true}
            />
          </div>

          <TagInput
            label="Mots-clés"
            name="keywords"
            register={register}
            errors={errors}
            tags={keywords}
            setTags={setKeywords}
            placeholder="Ajouter un mot-clé et appuyez sur Entrée"
            required={true}
          />

          <div className="mt-4">
            <TextArea
              label="Énoncé de recherche"
              name="researchStatement"
              placeholder="Décrivez brièvement vos intérêts de recherche et objectifs..."
              register={register}
              errors={errors}
              required={true}
              rows={6}
            />
          </div>
        </div>

        {/* Section: Termes et conditions */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold text-blue-600 flex items-center mb-4">
            <span className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </span>
            Termes et Conditions
          </h3>

          <div className="mb-4 p-4 border border-gray-200 rounded-md">
            <div className="mb-4 font-medium">Accord du Candidat</div>
            <p className="text-sm text-gray-600 mb-2">
              En soumettant cette candidature, vous acceptez que :
            </p>
            <ul className="text-sm text-gray-600 list-disc pl-5 mb-4">
              <li>
                Toutes les informations fournies sont exactes et complètes
              </li>
              <li>Vous avez lu et accepté les conditions de candidature</li>
              <li>
                Vos données personnelles puissent être traitées conformément à
                notre politique de confidentialité
              </li>
            </ul>

            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={agreementChecked}
                {...register("termsAgreement", {
                  required: "Vous devez accepter les termes et conditions",
                  onChange: (e) => {
                    setAgreementChecked(e.target.checked);
                  },
                })}
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-900"
              >
                J'accepte les termes et conditions
              </label>
            </div>
            {errors.termsAgreement && (
              <p className="mt-1 text-sm text-red-600">
                {errors.termsAgreement &&
                typeof errors.termsAgreement.message === "string"
                  ? errors.termsAgreement.message
                  : null}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            className="py-2 px-4 border border-gray-300 cursor-pointer rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sauvegarder en brouillon
          </button>
          <button
            type="submit"
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Continuer
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostulerPage;
