import { useAuth } from "@/Hooks/UseAuth";
import { RoleEnum } from "@/Types/UtilisateursEnums";
import  DashboardOverview from "@/Components/DashComps/ecommerce/DashboardOverview";
import PageMeta from "@/Components/DashComps/common/PageMeta";

export default function Home() {
  // Get the authenticated user's data
  const { utilisateur, roles } = useAuth();

  // Determine which DashboardOverview to render based on user role
  const getDashboardComponent = () => {
    if (roles.includes(RoleEnum.DIRECTION_CEDOC)) {
      return <DashboardOverview userRole="admin" />;
    } else if (roles.includes(RoleEnum.DOCTORANT)) {
      return <DashboardOverview userRole="student" userId="1" />;
    }
    // Add more cases for other roles as needed
    return <DashboardOverview userRole="student" userId="1" />;
  };

  return (
    <>
      <PageMeta title="CEDoc" description="" />
      {getDashboardComponent()}
    </>
  );
}