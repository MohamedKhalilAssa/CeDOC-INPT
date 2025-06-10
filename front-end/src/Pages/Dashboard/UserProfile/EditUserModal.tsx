import Button from "@/Components/DashComps/ui/button/Button";
import { Modal } from "@/Components/DashComps/ui/modal";
import DatePicker from "@/Components/Form/DatePicker";
import InputField from "@/Components/Form/InputField";
import SelectField from "@/Components/Form/SelectField";
import { getData, putData } from "@/Helpers/CRUDFunctions";
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
} from "@/Types/UtilisateursTypes";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface EditUserModalProps {
  user: UtilisateurResponseDTO | null;
  isOpen: boolean;
  onClose: () => void;
  onUserUpdate: () => Promise<void>;
}

interface UserFormData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  dateNaissance: string;
  genre: string;
  etatCivilEnum: string;
  statutProfessionnel: string;
  nationaliteId: number;
  lieuDeNaissanceId: number;
}

interface FetchedDataType {
  nationalities: Nationalite[] | undefined;
  lieuDeNaissance: LieuDeNaissance[] | undefined;
}

export default function EditUserModal({
  user,
  isOpen,
  onClose,
  onUserUpdate,
}: EditUserModalProps) {
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const alert = useAlert();
  const { getClaim } = UseJWT(localStorage.getItem("token"));

  const [fetchedData, setFetchedData] = useState<FetchedDataType>({
    nationalities: undefined,
    lieuDeNaissance: undefined,
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>({ mode: "onBlur" });

  // Fetch nationalities and lieu de naissance data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [nationalities, lieuDeNaissance] = await Promise.all([
          getData<Nationalite[]>(appConfig.API_PATHS.NATIONALITE.getAll.path),
          getData<LieuDeNaissance[]>(
            appConfig.API_PATHS.LIEU_DE_NAISSANCE.getAll.path
          ),
        ]);

        setFetchedData({
          nationalities: nationalities || [],
          lieuDeNaissance: lieuDeNaissance || [],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        alert.error(
          "Erreur lors de la récupération des données",
          "Veuillez contacter l'administrateur."
        );
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  // Set form values when user data is available
  useEffect(() => {
    if (user && !loading) {
      setValue("nom", user.nom || "");
      setValue("prenom", user.prenom || "");
      setValue("email", getClaim("sub") || user.email || "");
      setValue("telephone", user.telephone || "");
      setValue("genre", user.genre || "");
      setValue("etatCivilEnum", user.etatCivilEnum || "");
      setValue("statutProfessionnel", user.statutProfessionnel || "");
      setValue(
        "dateNaissance",
        user.dateNaissance
          ? new Date(user.dateNaissance).toISOString().split("T")[0]
          : ""
      );
      setValue("nationaliteId", user.nationalite?.id || 0);
      setValue("lieuDeNaissanceId", user.lieuDeNaissance?.id || 0);
    }
  }, [user, loading, setValue]);

  const handleSave = async (data: UserFormData) => {
    try {
      setSaving(true);

      // Prepare data for update
      const updateData = {
        ...data,
        dateNaissance: data.dateNaissance ? new Date(data.dateNaissance) : null,
      };

      // Update user data
      await putData(
        appConfig.API_PATHS.AUTH.updateCurrentUser.path,
        updateData
      );

      // Refresh user data
      await onUserUpdate();

      alert.success("Succès", "Informations mises à jour avec succès");
      onClose();
    } catch (error) {
      console.error("Error updating user data:", error);
      alert.error("Erreur", "Impossible de mettre à jour les informations");
    } finally {
      setSaving(false);
    }
  };

  // Options for dropdowns
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-4xl m-4">
      <div className="relative w-full p-6 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-8">
        <div className="mb-6">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Modifier les informations du profil
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Mettez à jour toutes vos informations personnelles et
            professionnelles.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">
              Chargement des données...
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit(handleSave)} className="space-y-8">
            {/* Personal Information Section */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 flex items-center mb-6">
                <span className="mr-2">
                  <i className="fas fa-user text-blue-600 dark:text-blue-400"></i>
                </span>
                Informations Personnelles
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Nom"
                  name="nom"
                  type="text"
                  placeholder="Entrez votre nom de famille"
                  register={register}
                  errors={errors}
                  control={control}
                  required
                />

                <InputField
                  label="Prénom"
                  name="prenom"
                  type="text"
                  placeholder="Entrez votre prénom"
                  register={register}
                  errors={errors}
                  control={control}
                  required
                />

                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="votre@email.com"
                  register={register}
                  errors={errors}
                  control={control}
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
                  control={control}
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
                  control={control}
                  required
                />

                <SelectField
                  label="État civil"
                  name="etatCivilEnum"
                  options={etatCivilOptions}
                  register={register}
                  errors={errors}
                  control={control}
                  required
                />

                <SelectField
                  label="Statut professionnel"
                  name="statutProfessionnel"
                  options={statutProfessionnelOptions}
                  register={register}
                  errors={errors}
                  control={control}
                  required
                />

                <DatePicker
                  label="Date de naissance"
                  name="dateNaissance"
                  register={register}
                  errors={errors}
                  control={control}
                  required
                />
              </div>
            </div>

            {/* Location Information Section */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 flex items-center mb-6">
                <span className="mr-2">
                  <i className="fas fa-map-marker-alt text-green-600 dark:text-green-400"></i>
                </span>
                Informations de Localisation
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectField
                  label="Nationalité"
                  name="nationaliteId"
                  options={nationalityOptions}
                  register={register}
                  errors={errors}
                  control={control}
                  required
                />

                <SelectField
                  label="Lieu de naissance"
                  name="lieuDeNaissanceId"
                  options={lieuDeNaissanceOptions}
                  register={register}
                  errors={errors}
                  control={control}
                  required
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                size="sm"
                variant="outline"
                onClick={onClose}
                disabled={saving}
              >
                Annuler
              </Button>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save mr-2"></i>
                    Enregistrer
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}
