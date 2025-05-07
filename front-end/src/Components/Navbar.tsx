import appConfig from "@/public/config.ts";
import { useEffect, useState, type JSX } from "react";
import { Link } from "react-router-dom";

const Navbar = (): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
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

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex h-10 w-40 items-center justify-between">
            <img
              className="h-8 w-auto"
              src={`${appConfig.BACKEND_URL}/images/Logo_inpt.png`}
              alt="Logo INPT"
            />
            <span className="hidden md:block h-full w-[1px] bg-black"></span>
            <span className=" text-xl font-bold hidden md:block bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 bg-clip-text text-transparent">
              CEDoc
            </span>
          </div>
          <div className="hidden lg:flex space-x-6 ml-12">
            {["accueil", "programmes", "recherche", "admission", "contact"].map(
              (section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-md text-sm transition duration-300 relative group"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              )
            )}
          </div>
          <div className="hidden lg:block">
            <Link
              to="/register"
              className="relative inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-full text-sm shadow-lg hover:shadow-xl transition duration-300 group"
            >
              <span className="relative z-10">Postuler</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-900 rounded-full opacity-0 group-hover:opacity-100 transition duration-300" />
            </Link>
          </div>
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none cursor-pointer transition-transform duration-300"
            >
              <svg
                className={`h-8 w-8 transform transition duration-300 ${
                  menuOpen ? "rotate-90" : ""
                }`}
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

      {menuOpen && (
        <div className="lg:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3">
            {[
              "accueil",
              "programmes",
              "recherche",
              "admission",
              "contact",
              "candidature",
            ].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  section === "candidature"
                    ? "text-white bg-gradient-to-r from-blue-600 to-blue-800"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
