import { UtilisateurResponseDTO } from "@/Types/UtilisateursTypes";

interface UserInfoCardProps {
  user: UtilisateurResponseDTO | null;
  loading: boolean;
}

export default function UserInfoCard({ user, loading }: UserInfoCardProps) {
  if (loading) {
    return (
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded dark:bg-gray-700 mb-6"></div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index}>
                <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="w-full">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Informations personnelles
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Prénom
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.prenom || "Non spécifié"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Nom
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.nom || "Non spécifié"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Email
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.email || "Non spécifié"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Téléphone
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.telephone || "Non spécifié"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Date de naissance
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.dateNaissance
                  ? new Date(user.dateNaissance).toLocaleDateString("fr-FR")
                  : "Non spécifiée"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Genre
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.genre || "Non spécifié"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                État civil
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.etatCivilEnum || "Non spécifié"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Statut professionnel
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.statutProfessionnel
                  ?.split("_")
                  .join(" ")
                  .toUpperCase() || "Non spécifié"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
