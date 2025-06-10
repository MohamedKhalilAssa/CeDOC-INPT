import { PageMeta } from "@/Components/DashComps";
import PageBreadcrumb from "@/Components/DashComps/common/PageBreadCrumb";
import Button from "@/Components/DashComps/ui/button/Button";
import { getData } from "@/Helpers/CRUDFunctions";
import { useModal } from "@/Hooks/DashHooks/useModal";
import { useAlert } from "@/Hooks/UseAlert";
import EditUserModal from "@/Pages/Dashboard/UserProfile/EditUserModal";
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
  const { isOpen, openModal, closeModal } = useModal();

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
    <div>
      <PageMeta
        title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="flex items-center justify-between mb-5 lg:mb-7">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Profile
          </h3>
          <Button
            size="sm"
            onClick={openModal}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="fas fa-edit mr-2"></i>
            Modifier le profil
          </Button>
        </div>

        <div className="space-y-6">
          <UserMetaCard user={user} loading={loading} />
          <UserInfoCard user={user} loading={loading} />
          <UserAddressCard user={user} loading={loading} />
        </div>
      </div>

      <EditUserModal
        user={user}
        isOpen={isOpen}
        onClose={closeModal}
        onUserUpdate={refreshUserData}
      />
    </div>
  );
}
