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
        href: appConfig.FRONTEND_PATHS.DASHBOARD.formations.declarerSeance.path,
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
      {
        href: appConfig.FRONTEND_PATHS.DASHBOARD.sujets.mesSujets.path,
        label: "Mes Sujets",
        icon: "fas fa-list",
      },
    ],
  },
];
export const chefsEquipesSidebarConfig: NavigationGroup[] = [
  ...professeursSidebarConfig,
  {
    title: "Sujets",
    items: [
      {
        href: appConfig.FRONTEND_PATHS.DASHBOARD.sujets.creer.path,
        label: "Créer un Sujet",
        icon: "fas fa-plus-circle",
      },
    ],
  },
  {
    title: "Gestion d'Équipe",
    items: [
      {
        href: appConfig.FRONTEND_PATHS.DASHBOARD.sujets.MembresEquipe.path,
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
  {
    title: "Formations",
    items: [
      {
        href: appConfig.FRONTEND_PATHS.DASHBOARD.formations.proposer.path,
        label: "Ajouter Formation",
        icon: "fas fa-graduation-cap",
      },
            {
        href: appConfig.FRONTEND_PATHS.DASHBOARD.formations.validerSeance.path,
        label: "Valider les seances",
        icon: "fas fa-check-circle",
      },
    ],
  },
];
