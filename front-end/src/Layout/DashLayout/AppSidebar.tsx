import { useSidebar } from "@/Context/DashContext/SidebarContext";
import { HomeIcon, InfoIcon, NewspaperIcon, SchoolIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

// Using Material UI icons which are commonly available
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ArticleIcon from "@mui/icons-material/Article";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import GroupsIcon from "@mui/icons-material/Groups";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PublicIcon from "@mui/icons-material/Public";
import WorkIcon from "@mui/icons-material/Work";
type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <HomeIcon fontSize="medium" />,
    name: "Accueil",
    path: "/",
  },
  {
    icon: <AccountBalanceIcon fontSize="medium" />,
    name: "CEDOC INPT",
    subItems: [
      { name: "Présentation", path: "/presentation", pro: false },
      { name: "Mot du Directeur", path: "/mot-directeur", pro: false },
      { name: "Structure", path: "/structure", pro: false },
    ],
  },
  {
    icon: <SchoolIcon fontSize="medium" />,
    name: "Formation Doctorale",
    subItems: [
      { name: "Programmes", path: "/programmes", pro: false },
      { name: "Admissions", path: "/admissions", pro: false },
      { name: "Charte des Thèses", path: "/charte-theses", pro: false },
    ],
  },
  {
    icon: <ArticleIcon fontSize="medium" />,
    name: "Recherche",
    subItems: [
      { name: "Laboratoires", path: "/laboratoires", pro: false },
      { name: "Équipes", path: "/equipes", pro: false },
      { name: "Publications", path: "/publications", pro: false },
    ],
  },
  {
    icon: <GroupsIcon fontSize="medium" />,
    name: "Encadrants",
    path: "/encadrants",
  },
  {
    icon: <EmojiEventsIcon fontSize="medium" />,
    name: "Doctorants",
    subItems: [
      { name: "Annuaire", path: "/annuaire-doctorants", pro: false },
      { name: "Thèses soutenues", path: "/theses-soutenues", pro: false },
    ],
  },
];

const othersItems: NavItem[] = [
  {
    icon: <CalendarMonthIcon fontSize="medium" />,
    name: "Événements",
    subItems: [
      { name: "Agenda", path: "/agenda", pro: false },
      { name: "Conférences", path: "/conferences", pro: false },
      { name: "Séminaires", path: "/seminaires", pro: false },
    ],
  },
  {
    icon: <AssignmentIcon fontSize="medium" />,
    name: "Procédures",
    subItems: [
      { name: "Inscription", path: "/procedure-inscription", pro: false },
      { name: "Soutenance", path: "/procedure-soutenance", pro: false },
      { name: "Mobilité", path: "/procedure-mobilite", pro: false },
    ],
  },
  {
    icon: <FileCopyIcon fontSize="medium" />,
    name: "Documents",
    subItems: [
      { name: "Formulaires", path: "/formulaires", pro: false },
      { name: "Règlement Intérieur", path: "/reglement", pro: false },
      { name: "Guides", path: "/guides", pro: false },
    ],
  },
  {
    icon: <WorkIcon fontSize="medium" />,
    name: "Partenariats",
    subItems: [
      { name: "Académiques", path: "/partenaires-academiques", pro: false },
      { name: "Industriels", path: "/partenaires-industriels", pro: false },
      {
        name: "Internationaux",
        path: "/partenaires-internationaux",
        pro: false,
        new: true,
      },
    ],
  },
  {
    icon: <PublicIcon fontSize="medium" />,
    name: "International",
    subItems: [
      { name: "Cotutelle", path: "/cotutelle", pro: false },
      { name: "Mobilité", path: "/mobilite", pro: false },
      { name: "Projets", path: "/projets-internationaux", pro: false },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`menu-item-icon-size ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <KeyboardArrowDownIcon
                  className={`ml-auto transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-primary-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            nouveau
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src="/images/logo/inpt-cedoc-logo.svg"
                alt="CEDOC INPT Logo"
                width={200}
                height={60}
              />
              <img
                className="hidden dark:block"
                src="/images/logo/inpt-cedoc-logo-dark.svg"
                alt="CEDOC INPT Logo"
                width={200}
                height={60}
              />
            </>
          ) : (
            <img
              src="/images/logo/inpt-cedoc-icon.svg"
              alt="CEDOC INPT Logo"
              width={40}
              height={40}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-500 font-semibold ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Principal"
                ) : (
                  <InfoIcon fontSize="small" />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-500 font-semibold ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Ressources"
                ) : (
                  <NewspaperIcon fontSize="small" />
                )}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
