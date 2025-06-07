import appConfig from "@/public/config";

type NavigationGroup = {
  title?: String;
  items: NavigationItem[];
};

type NavigationItem = {
  href: string;
  label: string;
  icon: string;
};
export const utilisateurs: NavigationGroup[] = [
  {
    title: "Utilisateur",
    items: [
      {
        href: appConfig.FRONTEND_PATHS.DASHBOARD.utilisateurs.profile.path,
        label: "Profile",
        icon: "fas fa-user",
      },
    ],
  },
];
export const sideBarConfigCandidat : NavigationGroup[] = [...utilisateurs,];
