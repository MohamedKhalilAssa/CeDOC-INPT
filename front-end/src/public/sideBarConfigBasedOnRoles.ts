import appConfig from "@/public/config";

export type NavigationGroup = {
  title?: String;
  items: NavigationItem[];
};

type NavigationItem = {
  href: string;
  label: string;
  icon: string;
};
export const utilisateursSidebarConfig: NavigationGroup[] = [
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
export const candidatsSidebarConfig: NavigationGroup[] = [
  ...utilisateursSidebarConfig,
  //TEST ONLY
  {
    title: "Candidat",
    items: [
      {
        href: appConfig.FRONTEND_PATHS.DASHBOARD.utilisateurs.profile.path,
        label: "Profile",
        icon: "fas fa-user",
      },
    ],
  },
];
export const doctorantsSidebarConfig: NavigationGroup[] = [
  ...utilisateursSidebarConfig,
];

export const professeursSidebarConfig: NavigationGroup[] = [
  ...utilisateursSidebarConfig,
];
export const chefsEquipesSidebarConfig: NavigationGroup[] = [
  ...professeursSidebarConfig,
];
export const directeurDeTheseSidebarConfig: NavigationGroup[] = [
  ...professeursSidebarConfig,
];
export const directionCedocSidebarConfig: NavigationGroup[] = [
  ...utilisateursSidebarConfig,
];
export const responsableFormationSidebarConfig: NavigationGroup[] = [
  ...professeursSidebarConfig,
];
