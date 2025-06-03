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

interface PersonalInfoFormProps {
  form: UseFormReturn<any>; // must be initialized with { mode: "onBlur" }
}

interface fetchedDataType {
  utilisateur: UtilisateurResponseDTO | undefined;
  nationalities: Nationalite[] | undefined;
  lieuDeNaissance: LieuDeNaissance[] | undefined;
}

const PersonalInfoForm = ({ form }: PersonalInfoFormProps) => {
  const {
    register,
    formState: { errors },
    reset,
  } = form;

  const { getClaim } = UseJWT(localStorage.getItem("token"));
  const swal = useAlert();

  const [fetchedData, setFetchedData] = useState<fetchedDataType>({
    utilisateur: undefined,
    nationalities: [],
    lieuDeNaissance: [],
  });

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

  // Reset form values when data is fetched
  useEffect(() => {
    if (fetchedData.utilisateur) {
      const user = fetchedData.utilisateur;
      reset({
        nom: user.nom || "",
        prenom: user.prenom || "",
        email: getClaim("sub") || "",
        telephone: user.telephone || "",
        genre: user.genre || "",
        etatCivilEnum: user.etatCivilEnum || "",
        statutProfessionnel: user.statutProfessionnel || "",
        dateNaissance: user.dateNaissance
          ? new Date(user.dateNaissance).toISOString().split("T")[0]
          : null,
        nationaliteId: user.nationalite?.id || "",
        lieuDeNaissanceId: user.lieuDeNaissance?.id || "",
      });
    }
  }, [fetchedData.utilisateur]);

  const nationalityOptions =
    fetchedData.nationalities?.map((n) => ({
      value: n.id,
      label: n.intitule,
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

  if (!fetchedData.utilisateur) return <p>Chargement des données...</p>;

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
          placeholder="Entrez votre nom de famille"
          register={register}
          errors={errors}
          required
        />
        <InputField
          label="Prénom"
          name="prenom"
          type="text"
          placeholder="Entrez votre prénom"
          register={register}
          errors={errors}
          required
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="votre@email.com"
          register={register}
          errors={errors}
          disabled
          required
        />
        <InputField
          label="Téléphone"
          name="telephone"
          type="tel"
          placeholder="+212623456789 ou 0623456789"
          register={register}
          errors={errors}
          validation={{
            pattern: {
              value: /^(\+212|0)([5-7][0-9]{8})$/,
              message: "Numéro de téléphone invalide",
            },
          }}
          required
        />
        <SelectField
          label="Genre"
          name="genre"
          options={genreOptions}
          register={register}
          errors={errors}
          required
        />
        <SelectField
          label="État civil"
          name="etatCivilEnum"
          options={etatCivilOptions}
          register={register}
          errors={errors}
          required
        />
        <SelectField
          label="Statut professionnel"
          name="statutProfessionnel"
          options={statutProfessionnelOptions}
          register={register}
          errors={errors}
          required
        />
        <DatePicker
          label="Date de naissance"
          name="dateNaissance"
          register={register}
          errors={errors}
          required
        />
        <SelectField
          label="Nationalité"
          name="nationaliteId"
          options={nationalityOptions}
          register={register}
          errors={errors}
          required
        />
        <SelectField
          label="Lieu de naissance"
          name="lieuDeNaissanceId"
          options={lieuDeNaissanceOptions}
          register={register}
          errors={errors}
          required
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;
