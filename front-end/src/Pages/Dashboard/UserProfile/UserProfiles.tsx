import { PageMeta } from "@/Components/DashComps";
import PageBreadcrumb from "@/Components/DashComps/common/PageBreadCrumb";
import UserAddressCard from "@/Pages/Dashboard/UserProfile/UserAddressCard";
import UserInfoCard from "@/Pages/Dashboard/UserProfile/UserInfoCard";
import UserMetaCard from "@/Pages/Dashboard/UserProfile/UserMetaCard";

export default function UserProfiles() {
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
          <UserMetaCard />
          <UserInfoCard />
          <UserAddressCard />
        </div>
      </div>
    </>
  );
}
