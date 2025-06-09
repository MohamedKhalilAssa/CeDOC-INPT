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
      {
        href: appConfig.FRONTEND_PATHS.DASHBOARD.publications.publier.path,
        label: "Mes Publications",
        icon: "fas fa-pen",
      },
      {
        href: appConfig.FRONTEND_PATHS.DASHBOARD.honors.distinctions.path,
        label: "Mes Distinctions",
        icon: "fas fa-award",
      },
      {
        href: appConfig.FRONTEND_PATHS.DASHBOARD.conferences.participer.path,
        label: "Mes Conférences",
        icon: "fas fa-microphone",
      },
      {
        href: appConfig.FRONTEND_PATHS.DASHBOARD.reinscriptions.reinscrire.path,
        label: "Mes Réinscriptions",
        icon: "fas fa-undo",
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
