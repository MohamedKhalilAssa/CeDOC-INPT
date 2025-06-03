import DatePicker from "@/Components/Form/DatePicker";
import InputField from "@/Components/Form/InputField";
import SelectField from "@/Components/Form/SelectField";
import { getData } from "@/Helpers/CRUDFunctions";
import { useAlert } from "@/Hooks/UseAlert";
import { UseJWT } from "@/Hooks/UseJWT";
import appConfig from "@/public/config";
import {
  LieuDeNaissance,
  Nationalite,
  UtilisateurResponseDTO,
} from "@/Types/UtilisateursResponses";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
// Define nationality options

interface PersonalInfoFormProps {
  form: UseFormReturn<any>;
}
// To store fetched data
interface fetchedDataType {
  utilisateur: UtilisateurResponseDTO | undefined;
  nationalities: Nationalite[] | undefined;
  lieuDeNaissance: LieuDeNaissance[] | undefined;
}
const PersonalInfoForm = ({ form }: PersonalInfoFormProps) => {
  const {
    register,
    formState: { errors },
  } = form;
  const { getClaim } = UseJWT(localStorage.getItem("token"));
  const swal = useAlert();
  const [fetchedData, setFetchedData] = useState<fetchedDataType>({
    utilisateur: undefined,
    nationalities: [],
    lieuDeNaissance: [],
  });

  // FETCH ON LOAD
  useEffect(() => {
    const fetchData = async () => {
      const utilisateur: UtilisateurResponseDTO | undefined = await getData(
        appConfig.API_PATHS.AUTH.currentUser.path
      );
      const nationalities: Nationalite[] | undefined = await getData(
        appConfig.API_PATHS.NATIONALITE.getAll.path
      );
      const lieuDeNaissance: LieuDeNaissance[] | undefined = await getData(
        appConfig.API_PATHS.LIEU_DE_NAISSANCE.getAll.path
      );
      return { utilisateur, nationalities, lieuDeNaissance };
    };

    fetchData()
      .then((data) => {
        if (data) {
          setFetchedData(data);
        }
      })
      .catch((error) => {
        swal.error(
          "Erreur lors de la récupération des données",
          "Veuillez contacter l'administrateur."
        );
        console.error("Error fetching data:", error);
      });
  }, []);

  const nationalityOptions =
    fetchedData.nationalities?.map((nationality) => ({
      value: nationality.id,
      label: nationality.intitule,
    })) || [];
  const lieuDeNaissanceOptions =
    fetchedData.lieuDeNaissance?.map((lieu) => ({
      value: lieu.id,
      label: lieu.nom,
    })) || [];
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
          name="laDateDeNaissance"
          register={register}
          errors={errors}
          required={true}
        />

        <SelectField
          label="Nationalité"
          name="nationalite"
          options={nationalityOptions}
          register={register}
          errors={errors}
          required={true}
        />
        <SelectField
          label="Lieu de naissance"
          name="lieuDeNaissance"
          options={lieuDeNaissanceOptions}
          register={register}
          errors={errors}
          required={true}
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;
