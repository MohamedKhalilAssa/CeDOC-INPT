import AvatarDropdown from "@/Components/Ui/AvatarDropdown";
import type { AuthContextType } from "@/Context/Auth";
import { logout } from "@/Helpers/AuthFunctions";
import { UseAlert } from "@/Hooks/UseAlert";
import appConfig from "@/public/config";
import { RoleEnum } from "@/Types/UtilisateursEnums";
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
      type: "button" as const,
      label: "Deconnexion",
      color: "red" as const,
      onClick: () => {
        logout(auth, swal);
      },
    },
  ];
  if (!auth.roles.includes(RoleEnum.CANDIDAT)) {
    dropdownItems.push({
      type: "link" as const,
      label: "Postuler",
      to: appConfig.FRONTEND_PATHS.GLOBAL.postuler.path,
    });
  }

  return <AvatarDropdown triggerLabel={userLabel} items={dropdownItems} />;
};
