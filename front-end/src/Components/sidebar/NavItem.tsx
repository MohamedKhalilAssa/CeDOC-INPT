import { Link } from "react-router-dom";
import { NavItemProps } from "./sidebarInterfaces";

/**
 * Navigation Item Component
 * @param {NavItemProps} props - Component props
 * @param {NavItemConfig} props.item - Navigation item configuration
 */
export const NavItem = ({ item }: NavItemProps) => {
  const baseClasses =
    "flex items-center px-4 py-3 text-sm font-medium text-slate-700 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group";

  const content = (
    <>
      {item.icon && (
        <i
          className={`${item.icon} w-5 h-5 mr-3 text-slate-500 group-hover:text-blue-600 flex items-center justify-center`}
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
