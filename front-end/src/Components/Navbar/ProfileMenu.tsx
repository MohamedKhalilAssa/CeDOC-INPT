import AvatarDropdown, { DropdownItem } from "@/Components/Ui/AvatarDropdown";
import type { AuthContextType } from "@/Context/Auth";
import { logout } from "@/Helpers/AuthFunctions";
import { UseAlert } from "@/Hooks/UseAlert";
import appConfig from "@/public/config";
export const ProfileMenu = ({
  auth,
  swal,
}: {
  auth: AuthContextType;
  swal: UseAlert;
}) => {
  const userLabel = auth.utilisateur?.sub?.split("@")[0] || "??";
  const logoutObj = {
    type: "button" as const,
    label: "Deconnexion",
    color: "red" as const,
    onClick: () => {
      logout(auth, swal);
    },
  };

  const dropdownItems: DropdownItem[] = [
    { type: "link", label: "Mon compte", to: "/dashboard" },
  ];
  if (auth.roles.length === 0) {
    dropdownItems.push({
      type: "link" as const,
      label: "Postuler",
      to: appConfig.FRONTEND_PATHS.GLOBAL.postuler.path,
    });
  }
  if (auth.roles.length > 0) {
    dropdownItems.push({
      type: "link" as const,
      label: "Dashboard",
      to: appConfig.FRONTEND_PATHS.DASHBOARD.homePage.path,
    });
  }
  dropdownItems.push(logoutObj);
  return <AvatarDropdown triggerLabel={userLabel} items={dropdownItems} />;
};
