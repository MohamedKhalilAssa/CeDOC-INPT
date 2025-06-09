import Logo_inpt from "@/assets/images/Logo_inpt.png";
import { ProfileMenu } from "@/Components/Navbar/ProfileMenu";
import { Sidebar } from "@/Components/sidebar/Sidebar";
import { useAlert } from "@/Hooks/UseAlert";
import { useAuth } from "@/Hooks/UseAuth";
import appConfig from "@/public/config.ts";
import * as sideBarConfig from "@/public/sideBarConfigBasedOnRoles";
import { RoleEnum } from "@/Types/UtilisateursEnums";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

/**
 * PhD Studies Center Dashboard Layout for INPT
 * Academic-focused dashboard for managing PhD programs and research
 */
const DashboardLayout = () => {
  const auth = useAuth();
  const swal = useAlert();
  const navigate = useNavigate();
  const roles: RoleEnum[] =
    auth.roles.length == 0 ? [RoleEnum.UTILISATEUR] : auth.roles; // Default to "UTILISATEUR" if roles are not defined
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    // Check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  // Apply theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Check if user is authenticated
    if (!auth.loading && !auth.isAuthenticated) {
      // Redirect to login page if not authenticated
      navigate(appConfig.FRONTEND_PATHS.AUTH.login.path);

      if (
        !localStorage.getItem("userDirectedLogout") ||
        localStorage.getItem("userDirectedLogout") == "false"
      )
        swal.toast(
          "Vous devez vous connecter pour accéder au tableau de bord.",
          "error"
        );
    }
    console.log(roles);
  }, [auth.isAuthenticated, auth.loading, navigate]);

  // Sidebar configuration
  const sidebarConfig = {
    branding: {
      logo: Logo_inpt,
      logoAlt: "Logo INPT",
      title: "CEDoc",
      homeLink: appConfig.FRONTEND_PATHS.GLOBAL.landingPage.path,
    },
    navigationSections: [
      {
        items: [
          {
            href: "/dashboard",
            label: "Dashboard Overview",
            icon: "fa-solid fa-table-columns",
          },
        ],
      },
      // {
      //   title: "Doctoral Profile",
      //   items: [
      //     {
      //       href: "/dashboard/student-profile",
      //       label: "My Profile",
      //       icon: "fas fa-user-circle",
      //     },
      //     {
      //       href: "/dashboard/team-assignment",
      //       label: "Team Assignment",
      //       icon: "fas fa-users",
      //     },
      //     {
      //       href: "/dashboard/publication-validation",
      //       label: "Publication Validation",
      //       icon: "fas fa-check-circle",
      //     },
      //   ],
      // },
      // {
      //   title: "Student Management",
      //   items: [
      //     {
      //       href: "/dashboard/students",
      //       label: "PhD Students",
      //       icon: "fas fa-user-graduate",
      //     },
      //     {
      //       href: "/dashboard/applications",
      //       label: "Applications",
      //       icon: "fas fa-file-alt",
      //     },
      //   ],
      // },
      // {
      //   title: "Research",
      //   items: [
      //     {
      //       href: "/dashboard/research-projects",
      //       label: "Research Projects",
      //       icon: "fas fa-flask",
      //     },
      //     {
      //       href: "/dashboard/publications",
      //       label: "Publications",
      //       icon: "fas fa-book-open",
      //     },
      //     {
      //       href: "/dashboard/supervisors",
      //       label: "Supervisors",
      //       icon: "fas fa-chalkboard-teacher",
      //     },
      //   ],
      // },
      // {
      //   title: "Academic",
      //   items: [
      //     {
      //       href: "/dashboard/defenses",
      //       label: "Thesis Defenses",
      //       icon: "fas fa-medal",
      //     },
      //     {
      //       href: "/dashboard/courses",
      //       label: "Doctoral Courses",
      //       icon: "fas fa-graduation-cap",
      //     },
      //     {
      //       href: "/dashboard/seminars",
      //       label: "Research Seminars",
      //       icon: "fas fa-presentation",
      //     },
      //   ],
      // },
      // {
      //   title: "Reports",
      //   items: [
      //     {
      //       href: "/dashboard/analytics",
      //       label: "Analytics",
      //       icon: "fas fa-chart-bar",
      //     },
      //     {
      //       href: "/dashboard/reports",
      //       label: "Reports",
      //       icon: "fas fa-chart-line",
      //     },
      //   ],
      // },
    ],
    footer: {
      text: "Academic Year 2024-2025",
      status: {
        color: "bg-green-500",
        text: "System Online",
      },
    },
  };
  //  YOU SHOULD ADD YOUR OWN SIDEBAR CONFIGURATION BASED ON ROLES LIKE THIS FOR EXAMPLE
  // CHANGE THE SIDEBAR CONFIGURATION BASED ON THE USER ROLES ON sideBarConfigBasedOnRoles.ts
  // and import it here for links in the side
  if (roles[0] === RoleEnum.UTILISATEUR) {
    sidebarConfig.navigationSections.push(
      ...sideBarConfig.utilisateursSidebarConfig
    );
  } else {
    // Collect all navigation groups from different roles
    const allNavigationGroups: sideBarConfig.NavigationGroup[] = [];

    roles.forEach((role) => {
      switch (role) {
        case RoleEnum.CANDIDAT:
          allNavigationGroups.push(...sideBarConfig.candidatsSidebarConfig);
          break;
        case RoleEnum.DOCTORANT:
          allNavigationGroups.push(...sideBarConfig.doctorantsSidebarConfig);
          break;
        case RoleEnum.PROFESSEUR:
          allNavigationGroups.push(...sideBarConfig.professeursSidebarConfig);
          break;
        case RoleEnum.CHEF_EQUIPE:
          allNavigationGroups.push(...sideBarConfig.chefsEquipesSidebarConfig);
          break;
        case RoleEnum.DIRECTEUR_DE_THESE:
          allNavigationGroups.push(
            ...sideBarConfig.directeurDeTheseSidebarConfig
          );
          break;
        case RoleEnum.DIRECTION_CEDOC:
          allNavigationGroups.push(
            ...sideBarConfig.directionCedocSidebarConfig
          );
          break;
        case RoleEnum.RESPONSABLE_FORMATION:
          allNavigationGroups.push(
            ...sideBarConfig.responsableFormationSidebarConfig
          );
          break;
        default:
          break;
      }
    }); // Remove duplicates by grouping navigation items by title
    const groupMap = new Map<string, sideBarConfig.NavigationGroup>();

    allNavigationGroups.forEach((group) => {
      const key = (group.title as string) || "untitled";
      if (groupMap.has(key)) {
        // Merge items and remove duplicates based on href
        const existingGroup = groupMap.get(key)!;
        const existingHrefs = new Set(
          existingGroup.items.map((item) => item.href)
        );
        const newItems = group.items.filter(
          (item) => !existingHrefs.has(item.href)
        );
        existingGroup.items.push(...newItems);
      } else {
        groupMap.set(key, { ...group });
      }
    });

    sidebarConfig.navigationSections.push(...Array.from(groupMap.values()));
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        branding={sidebarConfig.branding}
        navigationSections={sidebarConfig.navigationSections}
        footer={sidebarConfig.footer}
      />

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top header */}
        <div className="sticky top-0 z-40 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              {" "}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center"
              >
                <i className="fas fa-bars text-base"></i>
              </button>
              {/* back button */}{" "}
              <button
                onClick={() => navigate(-1)}
                className="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
              >
                <i className="fas fa-arrow-left text-sm mr-1"></i>
                Back
              </button>
              {/* Search Bar */}{" "}
              <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-700 rounded-lg px-3 py-2">
                <i className="fas fa-search text-sm text-slate-400 dark:text-slate-300 mr-2"></i>
                <input
                  type="text"
                  placeholder="Search students, projects..."
                  className="bg-transparent text-sm text-slate-600 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none"
                />
              </div>
            </div>{" "}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2  cursor-pointer text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center justify-center"
                title={
                  isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                }
              >
                {isDarkMode ? (
                  <i className="fas fa-sun text-base"></i>
                ) : (
                  <i className="fas fa-moon text-base"></i>
                )}
              </button>
              {/* Notifications */}{" "}
              <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center justify-center">
                <i className="fas fa-bell text-base"></i>
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              {/* User Menu */}
              <div className="flex items-center space-x-3">
                {!auth.isAuthenticated ? (
                  <Link
                    to={`${appConfig.FRONTEND_PATHS.AUTH.login.path}`}
                    className="px-4 py-2 lg:px-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-full text-sm shadow-sm hover:shadow-md transition duration-300"
                  >
                    <span className="hidden sm:inline">Se Connecter</span>
                    <span className="sm:hidden">Login</span>
                  </Link>
                ) : (
                  <ProfileMenu auth={auth} swal={swal} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          {auth.loading ? <div>Loading...</div> : <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
