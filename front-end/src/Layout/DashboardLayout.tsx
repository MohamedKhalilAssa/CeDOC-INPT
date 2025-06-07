import Logo_inpt from "@/assets/images/Logo_inpt.png";
import { ProfileMenu } from "@/Components/Navbar/ProfileMenu";
import { Sidebar } from "@/Components/sidebar/Sidebar";
import { useAlert } from "@/Hooks/UseAlert";
import { useAuth } from "@/Hooks/UseAuth";
import appConfig from "@/public/config.ts";
import * as sideBarConfig from "@/public/sideBarConfigBasedOnRoles";
import { RoleEnum } from "@/Types/UtilisateursEnums";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

/**
 * PhD Studies Center Dashboard Layout for INPT
 * Academic-focused dashboard for managing PhD programs and research
 */
const DashboardLayout = () => {
  const auth = useAuth();
  const swal = useAlert();
  const roles: RoleEnum[] = auth.roles || [RoleEnum.UTILISATEUR]; // Default to "UTILISATEUR" if roles are not defined
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
            icon: "fas fa-tachometer-alt",
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
    let set = new Set<sideBarConfig.NavigationGroup[]>();
    roles.forEach((role) => {
      switch (role) {
        case RoleEnum.CANDIDAT:
          set.add(sideBarConfig.candidatsSidebarConfig);
          break;
        case RoleEnum.DOCTORANT:
          set.add(sideBarConfig.doctorantsSidebarConfig);
          break;
        case RoleEnum.PROFESSEUR:
          set.add(sideBarConfig.professeursSidebarConfig);
          break;
        case RoleEnum.CHEF_EQUIPE:
          set.add(sideBarConfig.chefsEquipesSidebarConfig);
          break;
        case RoleEnum.DIRECTEUR_DE_THESE:
          set.add(sideBarConfig.directeurDeTheseSidebarConfig);
          break;
        case RoleEnum.DIRECTION_CEDOC:
          set.add(sideBarConfig.directionCedocSidebarConfig);
          break;
        case RoleEnum.RESPONSABLE_FORMATION:
          set.add(sideBarConfig.responsableFormationSidebarConfig);
          break;
        default:
          break;
      }
    });
    sidebarConfig.navigationSections.push(...Array.from(set).flat());
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <i className="fas fa-bars w-6 h-6 flex items-center justify-center"></i>
              </button>
              {/* back button */}
              <Link
                to={appConfig.FRONTEND_PATHS.GLOBAL.landingPage.path}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <i className="fas fa-arrow-left w-4 h-4 mr-1 flex items-center justify-center"></i>
                Back
              </Link>

              {/* Search Bar */}
              <div className="hidden md:flex items-center bg-slate-100 rounded-lg px-3 py-2">
                <i className="fas fa-search w-4 h-4 text-slate-400 mr-2 flex items-center justify-center"></i>
                <input
                  type="text"
                  placeholder="Search students, projects..."
                  className="bg-transparent text-sm text-slate-600 placeholder-slate-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                <i className="fas fa-bell w-5 h-5 flex items-center justify-center"></i>
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
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
