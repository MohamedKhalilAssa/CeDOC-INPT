import DatePicker from "@/Components/Form/DatePicker";
import InputField from "@/Components/Form/InputField";
import SelectField from "@/Components/Form/SelectField";
import { getData } from "@/Helpers/CRUDFunctions";
import { UseJWT } from "@/Hooks/UseJWT";
import appConfig from "@/public/config";
import { UtilisateurResponseDTO } from "@/Types/UtilisateursResponses";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
// Define nationality options
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

interface PersonalInfoFormProps {
  form: UseFormReturn<any>;
}

const PersonalInfoForm = ({ form }: PersonalInfoFormProps) => {
  const {
    register,
    formState: { errors },
  } = form;

  const { getClaim } = UseJWT(localStorage.getItem("token"));
  useEffect(() => {
    const fetchData = async () => {
      const user: UtilisateurResponseDTO | undefined = await getData(
        appConfig.API_PATHS.currentUser.path
      );
      console.log("User data fetched:", user?.id);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold text-blue-600 flex items-center mb-4">
        <span className="mr-2">
          <i className="fas fa-user text-blue-600"></i>
        </span>
        Informations Personnelles
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Prénom"
          name="nom"
          type="text"
          placeholder="Entrez votre prénom"
          register={register}
          errors={errors}
          required={true}
        />

        <InputField
          label="Nom"
          name="prenom"
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
          defaultValue={getClaim("sub")}
          disabled={true}
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
  );
};

export default PersonalInfoForm;
