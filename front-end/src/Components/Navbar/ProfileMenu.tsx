import AvatarDropdown from "@/Components/Ui/AvatarDropdown";
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

  const dropdownItems = [
    { type: "link" as const, label: "Mon compte", to: "/" },
    {
      type: "link" as const,
      label: "Postuler",
      to: appConfig.FRONTEND_PATHS.postuler.path,
    },
    {
      type: "button" as const,
      label: "Deconnexion",
      color: "red" as const,
      onClick: () => {
        logout(auth, swal);
      },
    },
  ];

  return <AvatarDropdown triggerLabel={userLabel} items={dropdownItems} />;
};
