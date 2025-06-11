interface ApiPaths {
  name: string;
  path: string;
  method: "POST" | "GET" | "PUT" | "DELETE";
}

interface FrontendPaths {
  name: string;
  path: string;
  method?: "POST" | "GET" | "PUT" | "DELETE";
}

type ApiPathsMap = { [key: string]: ApiPaths };
type FrontendPathsMap = { [key: string]: FrontendPaths };

interface AppConfig {
  APP_NAME: string;
  API_URL: string;
  BACKEND_URL: string;
  FRONTEND_URL: string;
  IMAGES_RESSOURCES: string;
  API_PATHS: {
    AUTH: ApiPathsMap;
    NATIONALITE: ApiPathsMap;
    LIEU_DE_NAISSANCE: ApiPathsMap;
    SUJET: ApiPathsMap;
    CANDIDATURE: ApiPathsMap;

    //Formations API paths
    FORMATION: ApiPathsMap;
    SEANCEFORMATION: ApiPathsMap;
    // Add more groups here
    CHEFS_EQUIPES: ApiPathsMap;
    PROFESSEUR: ApiPathsMap;
    DOCTORANT: ApiPathsMap;
    EQUIPE: ApiPathsMap;
  };

  FRONTEND_PATHS: {
    AUTH: FrontendPathsMap;
    GLOBAL: FrontendPathsMap;
    FORMATION: FrontendPathsMap;
    EQUIPE: FrontendPathsMap;
    DASHBOARD: {
      homePage: FrontendPaths;
      utilisateurs: FrontendPathsMap;
      sujets: FrontendPathsMap;
      formations: FrontendPathsMap;
      candidatures: FrontendPathsMap;
      equipes: FrontendPathsMap;
    };
  };
}

// ─── Actual config object ───────────────────────────────────────────────

const appConfig: AppConfig = {
  APP_NAME: "CEDoc",
  API_URL: "http://localhost:8080/api",
  BACKEND_URL: "http://localhost:8080",
  FRONTEND_URL: "http://localhost:5173",
  IMAGES_RESSOURCES: "@/assets/images",

  API_PATHS: {
    AUTH: {
      register: { name: "Register", path: "/auth/register", method: "POST" },
      login: { name: "Login", path: "/auth/login", method: "POST" },
      logout: { name: "Logout", path: "/auth/logout", method: "POST" },
      sendVerificationEmail: {
        name: "Send Verification Email",
        path: "/auth/send-verification",
        method: "POST",
      },
      verifyEmail: {
        name: "Verify Email",
        path: "/auth/verify-email",
        method: "POST",
      },
      forgotPassword: {
        name: "Forgot Password",
        path: "/auth/forgot-password",
        method: "POST",
      },
      resetPassword: {
        name: "Reset Password",
        path: "/auth/reset-password",
        method: "POST",
      },
      authCheck: {
        name: "Auth Check",
        path: "/auth/check",
        method: "GET",
      },
      currentUser: {
        name: "Current User",
        path: "/utilisateurs/logged-in",
        method: "GET",
      },
      updateCurrentUser: {
        name: "Update Current User",
        path: "/utilisateurs/logged-in",
        method: "PUT",
      },
    },

    NATIONALITE: {
      getAll: {
        name: "Get All Nationalities",
        path: "/nationalites",
        method: "GET",
      },
    },

    LIEU_DE_NAISSANCE: {
      getAll: {
        name: "Get All LIEU_DE_NAISSANCE",
        path: "/lieux-de-naissances",
        method: "GET",
      },
    },

    SUJET: {
      getAllSimple: {
        name: "Get All SUJETS",
        path: "/sujets/simple",
        method: "GET",
      },
      chefsSujets: {
        name: "Chefs et leurs Sujets",
        path: "/chefs-equipe/chefs-sujets",
        method: "GET",
      },
      sujetsChefEquipes: {
        name: "Sujets et chef et Équipes",
        path: "/sujets/chefs-sujets-equipes",
        method: "GET",
      },
      sujetsListPublic: {
        name: "Liste des Sujets",
        path: "/sujets/public",
        method: "GET",
      },
      sujetById: {
        name: "Sujet par ID",
        path: "/sujets/:id",
        method: "GET",
      },
      proposerSujet: {
        name: "Proposer un Sujet",
        path: "/sujets",
        method: "POST",
      },
      createSujet: {
        name: "Créer un Sujet",
        path: "/sujets",
        method: "POST",
      },
      updateSujet: {
        name: "Mettre à jour un Sujet",
        path: "/sujets/",
        method: "PUT",
      },
      deleteSujet: {
        name: "Supprimer un Sujet",
        path: "/sujets/",
        method: "DELETE",
      },
    },

    CANDIDATURE: {
      postuler: {
        name: "Postuler",
        path: "/candidatures/postuler",
        method: "POST",
      },
      update: {
        name: "Mettre à jour candidature",
        path: "/candidatures/{id}",
        method: "PUT",
      },
      accessible: {
        name: "Candidatures Accessibles",
        path: "/candidatures/accessible",
        method: "GET",
      },
      accepter: {
        name: "Accepter candidature",
        path: "/candidatures/{id}/accepter",
        method: "POST",
      },
      refuser: {
        name: "Refuser candidature",
        path: "/candidatures/{id}/refuser",
        method: "POST",
      },
      changeStatus: {
        name: "Changer statut candidature",
        path: "/candidatures/{id}/status",
        method: "PUT",
      },
    },

    // Formation API paths
    FORMATION: {
      getAll: {
        name: "Get All Formations",
        path: "/formations",
        method: "GET",
      },
    },
    SEANCEFORMATION: {
      getAll: {
        name: "Get All Formations",
        path: "/formations",
        method: "GET",
      },
      postSeanceFormation: {
        name: "Post Seance Formation",
        path: "/formations/seances-formations",
        method: "POST",
      },
      getValidatedFormationsByDoctorant: {
        name: "Post Seance Formation",
        path: "/formations/seances-formations/validated/doctorant",
        method: "GET",
      },
      getTotalValidatedDuree: {
        name: "Post Seance Formation",
        path: "/formations/seances-formations/validated/duree/total",
        method: "GET",
      },
      getValidatedFormationDuree: {
        name: "Post Seance Formation",
        path: "/formations/seances-formations/validated/duree",
        method: "GET",
      },
      getDeclaredSeances: {
        name: "Post Seance Formation",
        path: "/formations/seances-formations/doctorant",
        method: "GET",
      },
    },

    // ── THE TWO NEW TOP‐LEVEL KEYS ──

    CHEFS_EQUIPES: {
      chefsSujets: {
        name: "Chefs et leurs Sujets",
        path: "/chefs-equipe/chefs-sujets",
        method: "GET",
      },
      sujetsEquipes: {
        name: "Sujets et Équipes",
        path: "/chefs-equipe/sujets-equipes",
        method: "GET",
      },
      sujetsDesMembresEquipe: {
        name: "Sujets des Membres de l'Équipe",
        path: "/chefs-equipe/sujets/membres-equipe",
        method: "GET",
      },
      createSujet: {
        name: "Créer un Sujet par Chef d'Équipe",
        path: "/chefs-equipe/sujets",
        method: "POST",
      },
    },
    PROFESSEUR: {
      getAll: {
        name: "Get All Professeurs",
        path: "/professeurs",
        method: "GET",
      },
      getById: {
        name: "Get Professeur by ID",
        path: "/professeurs/:id",
        method: "GET",
      },
      search: {
        name: "Search Professeurs",
        path: "/professeurs/search",
        method: "GET",
      },
      mesSujets: {
        name: "Mes Sujets",
        path: "/professeurs/mes-sujets",
        method: "GET",
      },
    },
    DOCTORANT: {
      getAll: {
        name: "Get All Doctorants",
        path: "/doctorants",
        method: "GET",
      },
      getById: {
        name: "Get Doctorant by ID",
        path: "/doctorants/:id",
        method: "GET",
      },
      search: {
        name: "Search Doctorants",
        path: "/doctorants/search",
        method: "GET",
      },
    },
    EQUIPE: {
      getAllPublic: {
        name: "Get All Public Équipes",
        path: "/equipes/public",
        method: "GET",
      },
      getAllSimple: {
        name: "Get All Simple Équipes",
        path: "/equipes/public/simple",
        method: "GET",
      },
      getPublicPaginated: {
        name: "Get Public Équipes Paginated",
        path: "/equipes/public/paginated",
        method: "GET",
      },
      getById: {
        name: "Get Équipe by ID",
        path: "/equipes/public/:id",
        method: "GET",
      },
      // Admin endpoints for DIRECTION_CEDOC
      getAll: {
        name: "Get All Équipes (Admin)",
        path: "/equipes",
        method: "GET",
      },
      getAllPaginated: {
        name: "Get All Équipes Paginated (Admin)",
        path: "/equipes/admin/paginated",
        method: "GET",
      },
      create: {
        name: "Create Équipe",
        path: "/equipes",
        method: "POST",
      },
      update: {
        name: "Update Équipe",
        path: "/equipes/:id",
        method: "PUT",
      },
      delete: {
        name: "Delete Équipe",
        path: "/equipes/:id",
        method: "DELETE",
      },
      getByIdAdmin: {
        name: "Get Équipe by ID (Admin)",
        path: "/equipes/:id",
        method: "GET",
      },
      search: {
        name: "Search Équipes",
        path: "/equipes/search",
        method: "GET",
      },
    },
  },

  FRONTEND_PATHS: {
    GLOBAL: {
      landingPage: { name: "Landing Page", path: "/" },
      postuler: { name: "Postuler", path: "/postuler" },
      recherche: { name: "Recherche", path: "/recherche" },
      contact: { name: "Contact", path: "/contact" },
    },
    AUTH: {
      register: { name: "Register", path: "/auth/register" },
      login: { name: "Login", path: "/auth/login" },
      verifyEmail: { name: "Email Verification", path: "/auth/verify-email" },
      forgotPassword: {
        name: "Forgot Password",
        path: "/auth/forgot-password",
      },
      resetPassword: { name: "Reset Password", path: "/auth/reset-password" },
    },
    FORMATION: {
      formations: { name: "Formations", path: "/formations" },
    },
    EQUIPE: {
      Listings: { name: "Équipes de Recherche", path: "/equipes" },
      // Details: { name: "Détails de l'Équipe", path: "/equipes/:id" },
    },
    DASHBOARD: {
      homePage: { name: "Dashboard Home", path: "/dashboard" },
      utilisateurs: {
        profile: { name: "Profil", path: "/dashboard/utilisateurs/profile" },
      },
      sujets: {
        proposer: {
          name: "Proposer un Sujet",
          path: "/dashboard/sujets/proposer",
        },
        creer: { name: "Créer un Sujet", path: "/dashboard/sujets/creer" },
        mesSujets: {
          name: "Mes Sujets",
          path: "/dashboard/sujets/mes-sujets",
        },
        MembresEquipe: {
          name: "Sujets des Membres de l'Équipe",
          path: "/dashboard/sujets/membres-equipe",
        },
      },
      formations: {
        proposer: {
          name: "Mes Formations",
          path: "/dashboard/formations/mesformations",
        },
      },
      candidatures: {
        accessible: { name: "Candidatures", path: "/dashboard/candidatures" },
      },
      equipes: {
        gestion: {
          name: "Gestion des Équipes",
          path: "/dashboard/equipes/gestion",
        },
      },
    },
  },
};

export default appConfig;
