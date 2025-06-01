import AvatarDropdown from "@/Components/Ui/AvatarDropdown";
import type { AuthContextType } from "@/Context/Auth";
import { logout } from "@/Helpers/AuthFunctions";
import { UseAlert } from "@/Hooks/UseAlert";

export const ProfileMenu = ({
  auth,
  swal,
}: {
  auth: AuthContextType;
  swal: UseAlert;
}) => {
  const userLabel =
    auth.utilisateur?.sub?.split("@")[0] || "Utilisateur inconnu";

  const dropdownItems = [
    { type: "link" as const, label: "Mon compte", to: "/" },
    { type: "link" as const, label: "Postuler", to: "/" },
    {
      type: "button" as const,
      label: "Deconnexion",
      color: "red",
      onClick: () => { logout(auth, swal); },
    },
  ];

  return <AvatarDropdown triggerLabel={userLabel} items={dropdownItems} />;
};
