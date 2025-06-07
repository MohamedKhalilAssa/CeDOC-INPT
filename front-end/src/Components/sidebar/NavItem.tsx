import { Link } from "react-router-dom";
import { NavItemProps } from "./sidebarInterfaces";

/**
 * Navigation Item Component
 * @param {NavItemProps} props - Component props
 * @param {NavItemConfig} props.item - Navigation item configuration
 */
export const NavItem = ({ item }: NavItemProps) => {
  const baseClasses =
    "flex items-center px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200 group";
  const content = (
    <>
      {" "}
      {item.icon && (
        <i
          className={`${item.icon} text-base mr-3 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400`}
        ></i>
      )}
      {item.label}
    </>
  );

  if (item.external) {
    return (
      <a href={item.href} className={baseClasses}>
        {content}
      </a>
    );
  }

  return (
    <Link to={item.href} className={baseClasses}>
      {content}
    </Link>
  );
};
