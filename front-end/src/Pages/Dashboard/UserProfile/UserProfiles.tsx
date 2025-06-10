import { PageMeta } from "@/Components/DashComps";
import PageBreadcrumb from "@/Components/DashComps/common/PageBreadCrumb";
import { getData } from "@/Helpers/CRUDFunctions";
import { useAlert } from "@/Hooks/UseAlert";
import UserAddressCard from "@/Pages/Dashboard/UserProfile/UserAddressCard";
import UserInfoCard from "@/Pages/Dashboard/UserProfile/UserInfoCard";
import UserMetaCard from "@/Pages/Dashboard/UserProfile/UserMetaCard";
import appConfig from "@/public/config";
import { UtilisateurResponseDTO } from "@/Types/UtilisateursTypes";
import { useEffect, useState } from "react";

export default function UserProfiles() {
  const [user, setUser] = useState<UtilisateurResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const alert = useAlert();

  // Fetch user data once for all components
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userData = await getData<UtilisateurResponseDTO>(
          appConfig.API_PATHS.AUTH.currentUser.path
        );
        setUser(userData || null);
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert.error("Erreur", "Impossible de charger les données utilisateur");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const refreshUserData = async () => {
    try {
      const userData = await getData<UtilisateurResponseDTO>(
        appConfig.API_PATHS.AUTH.currentUser.path
      );
      setUser(userData || null);
    } catch (error) {
      console.error("Error refreshing user data:", error);
      alert.error("Erreur", "Impossible de rafraîchir les données utilisateur");
    }
  };

  return (
    <>
      <PageMeta
        title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard
            user={user}
            loading={loading}
            onUserUpdate={refreshUserData}
          />
          <UserInfoCard
            user={user}
            loading={loading}
            onUserUpdate={refreshUserData}
          />
          <UserAddressCard
            user={user}
            loading={loading}
            onUserUpdate={refreshUserData}
          />
        </div>
      </div>
    </>
  );
}
