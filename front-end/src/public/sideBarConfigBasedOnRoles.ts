import appConfig from "@/public/config";

export type NavigationGroup = {
  title?: string;
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
];
export const doctorantsSidebarConfig: NavigationGroup[] = [
  ...utilisateursSidebarConfig,
  {
    title: "Doctorant",
    items: [
      {
        href: appConfig.FRONTEND_PATHS.DASHBOARD.utilisateurs.profile.path,
        label: "Doctorant Profile",
        icon: "fas fa-user",
      },
      {
        href: appConfig.FRONTEND_PATHS.DASHBOARD.formations.proposer.path,
        label: "Mes Formations,",
        icon: "fas fa-graduation-cap",
      },
    ],
  },
];

export const professeursSidebarConfig: NavigationGroup[] = [
  ...utilisateursSidebarConfig,
  {
    title: "Sujets",
    items: [
      {
        href: appConfig.FRONTEND_PATHS.DASHBOARD.sujets.proposer.path,
        label: "Proposer un sujet",
        icon: "fas fa-book",
      },
    ],
  },
  {
    title: "Applications",
    items: [
      {
        href: `/dashboard/${appConfig.FRONTEND_PATHS.DASHBOARD.candidatures.accessible.path}`,
        label: "Candidatures",
        icon: "fas fa-file-alt",
      },
    ],
  },
];
export const chefsEquipesSidebarConfig: NavigationGroup[] = [
  ...professeursSidebarConfig,
  {
    title: "Gestion d'Équipe",
    items: [
      {
        href: "/dashboard/sujets/membres-equipe",
        label: "Sujets des Membres",
        icon: "fas fa-users",
      },
    ],
  },
  {
    title: "Applications",
    items: [
      {
        href: "/dashboard/candidatures",
        label: "Candidatures",
        icon: "fas fa-file-alt",
      },
    ],
  },
];
export const directeurDeTheseSidebarConfig: NavigationGroup[] = [
  ...professeursSidebarConfig,
];
export const directionCedocSidebarConfig: NavigationGroup[] = [
  ...utilisateursSidebarConfig,
  {
    title: "Applications",
    items: [
      {
        href: "/dashboard/candidatures",
        label: "Candidatures",
        icon: "fas fa-file-alt",
      },
    ],
  },
];
export const responsableFormationSidebarConfig: NavigationGroup[] = [
  ...professeursSidebarConfig,
];
