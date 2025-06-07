import { NavItem } from "@/Components/sidebar/NavItem";
import { Link } from "react-router-dom";
import { SidebarProps } from "./sidebarInterfaces";

/**
 * Generalized Sidebar Component
 */
export const Sidebar = ({
  isOpen,
  onClose,
  branding,
  navigationSections = [],
  footer,
}: SidebarProps) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-white-600 to-white-700">
        <div className="flex items-center space-x-3">
          <Link to={branding.homeLink} className="flex items-center">
            <img
              className="h-10 w-auto"
              src={branding.logo}
              alt={branding.logoAlt}
            />
            <span className="block h-6 w-px bg-gray-300 mx-3"></span>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
              {branding.title}
            </span>
          </Link>
        </div>{" "}
        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-lg text-blue-100 hover:text-white hover:bg-blue-500 transition-colors flex items-center justify-center"
        >
          <i className="fas fa-times text-base"></i>
        </button>
      </div>

      {/* Navigation */}
      <nav
        className="p-4 space-y-1 overflow-y-auto"
        style={{ height: "calc(100vh - 160px)" }}
      >
        {navigationSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className={sectionIndex > 0 ? "pt-4" : ""}>
            {section.title && (
              <h3 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                {section.title}
              </h3>
            )}
            {section.items.map((item, itemIndex) => (
              <NavItem key={itemIndex} item={item} />
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      {footer && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-500">{footer.text}</div>
            {footer.status && (
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${footer.status.color}`}
                ></div>
                <span className="text-xs text-slate-600">
                  {footer.status.text}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
