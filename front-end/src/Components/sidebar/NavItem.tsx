import { Link, useLocation } from "react-router-dom";
import { NavItemProps } from "./sidebarInterfaces";

/**
 * Navigation Item Component
 * @param {NavItemProps} props - Component props
 * @param {NavItemConfig} props.item - Navigation item configuration
 */
export const NavItem = ({ item }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === item.href;

  // Base classes for the nav item
  const baseClasses =
    "flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group";

  // Active/inactive state classes
  const stateClasses = isActive
    ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
    : "text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300";

  // Combine all classes
  const combinedClasses = `${baseClasses} ${stateClasses}`;

  const content = (
    <>
      {item.icon && (
        <i
          className={`${
            item.icon
          } text-base mr-3 transition-colors duration-200 ${
            isActive
              ? "text-blue-600 dark:text-blue-400"
              : "text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"
          }`}
        ></i>
      )}
      {item.label}
    </>
  );

  if (item.external) {
    return (
      <a href={item.href} className={combinedClasses}>
        {content}
      </a>
    );
  }

  return (
    <Link to={item.href} className={combinedClasses}>
      {content}
    </Link>
  );
};
