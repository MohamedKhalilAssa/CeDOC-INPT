import { UtilisateurResponseDTO } from "@/Types/UtilisateursTypes";

interface UserMetaCardProps {
  user: UtilisateurResponseDTO | null;
  loading: boolean;
}

export default function UserMetaCard({ user, loading }: UserMetaCardProps) {
  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
          <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            {user?.prenom && user?.nom ? (
              <span className="text-2xl font-semibold text-gray-600 dark:text-gray-300">
                {user.prenom.charAt(0)}
                {user.nom.charAt(0)}
              </span>
            ) : (
              <span className="text-2xl font-semibold text-gray-400">?</span>
            )}
          </div>
          <div className="order-3 xl:order-2">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </div>
            ) : (
              <>
                <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                  {user?.prenom && user?.nom
                    ? `${user.prenom} ${user.nom}`
                    : "Nom non spécifié"}
                </h4>
                <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.etatCivilEnum || "Statut non spécifié"}
                  </p>
                  {user?.nationalite && (
                    <>
                      <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {user.nationalite.intitule}
                      </p>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
