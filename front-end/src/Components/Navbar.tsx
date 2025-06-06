import Logo_inpt from "@/assets/images/Logo_inpt.png";
import type { AuthContextType } from "@/Context/AuthProvider";
import { useAuth } from "@/Context/AuthProvider";
import { checkAuth, logout } from "@/Helpers/AuthFunctions";
import { UseAlert, useAlert } from "@/Hooks/UseAlert";
import appConfig from "@/public/config.ts";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type JSX } from "react";
import { Link } from "react-router-dom";

// Profile Menu component
const ProfileMenu = ({ auth, swal }: { auth: AuthContextType; swal: UseAlert }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node | null)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-blue-600 font-medium text-sm"
      >
        <span>{auth.utilisateur?.sub.split("@")[0]}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform duration-300 ${
            isMenuOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg py-1 z-50">
          <Link
            to="/"
            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Mon compte
          </Link>
          <Link
            to="/"
            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Postuler
          </Link>
          <button
            onClick={() => {
              logout(auth, swal);
              setIsMenuOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
          >
            Deconnexion
          </button>
        </div>
      )}
    </div>
  );
};

// Dropdown Menu component
const Dropdown = ({ 
  triggerLabel, 
  items 
}: { 
  triggerLabel: string;
  items: Array<{
    type: "link" | "button";
    label: string;
    to?: string;
    onClick?: () => void;
  }>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-blue-600 font-medium text-sm transition duration-300"
      >
        {triggerLabel}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white shadow-lg py-1 z-50">
          {items.map((item, index) =>
            item.type === "link" ? (
              <a
                key={index}
                href={item.to}
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ) : (
              <button
                key={index}
                onClick={() => {
                  item.onClick && item.onClick();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              >
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

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

    checkAuth(auth);
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
        <div className="flex justify-between h-20 items-center"> {/* Increased height from h-16 to h-20 */}
          {/* Logo and Branding */}
          <div className="flex items-center">
            <Link
              to={`${appConfig.FRONTEND_PATHS.landingPage.path}`}
              className="flex items-center"
            >
              <img className="h-10 w-auto" src={Logo_inpt} alt="Logo INPT" /> {/* Increased logo size from h-8 to h-10 */}
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

          {/* Auth Button or Profile Menu */}
          <div className="hidden lg:flex items-center">
            {!auth.isAuthenticated ? (
              <Link
                to={`${appConfig.FRONTEND_PATHS.register.path}`}
                className="ml-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-full text-sm shadow-sm hover:shadow-md transition duration-300"
              >
                Se Connecter
              </Link>
            ) : (
              <ProfileMenu auth={auth} swal={swal} />
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
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
              <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer">
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

              {/* Divider */}
              <div className="border-t border-gray-200 my-2"></div>

              {/* Login Button */}
              {!auth.isAuthenticated ? (
                <div className="px-3 py-2">
                  <a
                    href={`${appConfig.FRONTEND_PATHS.register.path}`}
                    className="block w-full px-4 py-2 text-center font-medium text-white bg-gradient-to-r from-blue-600 to-blue-800 rounded-full"
                    onClick={() => setMenuOpen(false)}
                  >
                    Se Connecter
                  </a>
                </div>
              ) : (
                <div>
                  <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Mon compte
                  </div>

                  <a
                    href="/"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => setMenuOpen(false)}
                  >
                    Mon compte
                  </a>

                  <a
                    href="/"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => setMenuOpen(false)}
                  >
                    Postuler
                  </a>

                  <button
                    className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50"
                    onClick={() => {
                      logout(auth, swal);
                      setMenuOpen(false);
                    }}
                  >
                    Deconnexion
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;