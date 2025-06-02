import Logo_inpt from "@/assets/images/Logo_inpt.png";
import { ProfileMenu } from "@/Components/Navbar/ProfileMenu";
import { Dropdown } from "@/Components/Ui/Dropdown";
import type { AuthContextType } from "@/Context/Auth/index";
import { UseAlert, useAlert } from "@/Hooks/UseAlert";
import { useAuth } from "@/Hooks/UseAuth";
import appConfig from "@/public/config.ts";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type JSX } from "react";
import { Link } from "react-router-dom";

const Navbar = (): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);
  const hasRunRef = useRef(false);
  const auth: AuthContextType = useAuth();
  const swal: UseAlert = useAlert();

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const handleScroll = () => {
      const backToTop = document.getElementById("back-to-top");
      if (!backToTop) return;
      if (window.scrollY > 300) {
        backToTop.classList.remove("opacity-0", "invisible");
        backToTop.classList.add("opacity-100", "visible");
      } else {
        backToTop.classList.add("opacity-0", "invisible");
        backToTop.classList.remove("opacity-100", "visible");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Landing page sections for navbar
  const landingPageSections = [
    { label: "Accueil", anchor: "#accueil" },
    { label: "Recherche", anchor: "#recherche" },
    { label: "Admission", anchor: "#admission" },
  ];
  // Other pages for dropdown
  const otherPages = [
    { label: "Formations", path: "/formations" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-20 items-center">
          {/* Logo and Branding */}
          <div className="flex items-center">
            <Link
              to={`${appConfig.FRONTEND_PATHS.landingPage.path}`}
              className="flex items-center"
            >
              <img className="h-10 w-auto" src={Logo_inpt} alt="Logo INPT" />
              <span className="block h-6 w-px bg-gray-300 mx-3"></span>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
                CEDoc
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex flex-1 justify-center">
            <div className="flex space-x-4">
              {/* Landing Page Sections as direct links */}
              {landingPageSections.map((section) => (
                <a
                  key={section.label}
                  href={section.anchor}
                  className="px-3 py-2 text-gray-700 hover:text-blue-600 font-medium text-sm"
                >
                  {section.label}
                </a>
              ))}

              {/* Pages Dropdown */}
              <Dropdown
                triggerLabel="Pages"
                items={otherPages.map((page) => ({
                  type: "link",
                  label: page.label,
                  to: page.path,
                }))}
              />
            </div>
          </div>

          {/* Right side elements - Auth Button/Profile Menu + Mobile Menu Button */}
          <div className="flex items-center">
            {/* Auth Button or Profile Menu - Always visible */}
            {!auth.isAuthenticated ? (
              <Link
                to={`${appConfig.FRONTEND_PATHS.login.path}`}
                className="px-4 py-2 lg:px-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-full text-sm shadow-sm hover:shadow-md transition duration-300"
              >
                <span className="hidden sm:inline">Se Connecter</span>
                <span className="sm:hidden">Login</span>
              </Link>
            ) : (
              <ProfileMenu auth={auth} swal={swal} />
            )}

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center ml-3">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-700 hover:text-blue-600 focus:outline-none cursor-pointer p-1"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {menuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="lg:hidden bg-white shadow-lg border-t border-gray-100"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-2 py-3 space-y-1">
              {/* Sections Heading */}
              <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Sections
              </div>

              {/* Landing Page Sections */}
              {landingPageSections.map((section) => (
                <a
                  key={section.label}
                  href={section.anchor}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  onClick={() => setMenuOpen(false)}
                >
                  {section.label}
                </a>
              ))}

              {/* Divider */}
              <div className="border-t border-gray-200 my-2"></div>

              {/* Pages Links */}
              <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Pages
              </div>

              {otherPages.map((page) => (
                <a
                  key={page.label}
                  href={page.path}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  onClick={() => setMenuOpen(false)}
                >
                  {page.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
