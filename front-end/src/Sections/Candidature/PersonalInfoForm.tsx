import DatePicker from "@/Components/Form/DatePicker";
import InputField from "@/Components/Form/InputField";
import SelectField from "@/Components/Form/SelectField";
import { getData } from "@/Helpers/CRUDFunctions";
import { useAlert } from "@/Hooks/UseAlert";
import { UseJWT } from "@/Hooks/UseJWT";
import appConfig from "@/public/config";
import {
  EtatCivilEnum,
  GenreEnum,
  StatutProfessionnelEnum,
} from "@/Types/UtilisateursEnums";
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
  // form should be initialized with { mode: "onBlur" } in the parent component
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

  // OPTIONS
  const nationalityOptions =
    fetchedData.nationalities?.map((nationality) => ({
      value: nationality.id,
      label: nationality.intitule,
    })) || [];
  const lieuDeNaissanceOptions =
    fetchedData.lieuDeNaissance?.map((lieu) => ({
      value: lieu.id,
      label: `${lieu.pays}, ${lieu.ville}`,
    })) || [];

  const genreOptions = Object.entries(GenreEnum).map(([key, value]) => ({
    value: key,
    label: value,
  }));
  const etatCivilOptions = Object.entries(EtatCivilEnum).map(
    ([key, value]) => ({
      value: key,
      label: value,
    })
  );
  const statutProfessionnelOptions = Object.entries(
    StatutProfessionnelEnum
  ).map(([key, value]) => ({
    value: key,
    label: value,
  }));
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
          label="Nom"
          name="nom"
          type="text"
          defaultValue={fetchedData.utilisateur?.nom || ""}
          placeholder="Entrez votre nom de famille"
          register={register}
          errors={errors}
          required={true}
        />
        <InputField
          label="Prénom"
          name="prenom"
          type="text"
          defaultValue={fetchedData.utilisateur?.prenom || ""}
          placeholder="Entrez votre prénom"
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
          name="telephone"
          type="tel"
          defaultValue={fetchedData.utilisateur?.telephone || ""}
          placeholder="+212623456789 ou 0623456789"
          register={register}
          validation={{
            pattern: {
              value: /^(\+212|0)([5-7][0-9]{8})$/,
              message: "Numéro de téléphone invalide",
            },
          }}
          errors={errors}
          required={true}
        />

        <SelectField
          label="Genre"
          name="genre"
          options={genreOptions}
          defaultValue={fetchedData.utilisateur?.genre || ""}
          register={register}
          errors={errors}
          required={true}
        />
        <SelectField
          label="État civil"
          name="etatCivilEnum"
          options={etatCivilOptions}
          defaultValue={fetchedData.utilisateur?.etatCivilEnum || ""}
          register={register}
          errors={errors}
          required={true}
        />
        <SelectField
          label="Statut professionnel"
          name="statutProfessionnel"
          options={statutProfessionnelOptions}
          defaultValue={fetchedData.utilisateur?.statutProfessionnel || ""}
          register={register}
          errors={errors}
          required={true}
        />
        <DatePicker
          label="Date de naissance"
          name="dateNaissance"
          defaultValue={
            fetchedData.utilisateur?.dateNaissance
              ? new Date(fetchedData.utilisateur.dateNaissance)
              : null
          }
          register={register}
          errors={errors}
          required={true}
        />

        <SelectField
          label="Nationalité"
          name="nationaliteId"
          defaultValue={fetchedData.utilisateur?.nationalite?.id || ""}
          options={nationalityOptions}
          register={register}
          errors={errors}
          required={true}
        />
        <SelectField
          label="Lieu de naissance"
          name="lieuDeNaissanceId"
          defaultValue={fetchedData.utilisateur?.lieuDeNaissance?.id || ""}
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
