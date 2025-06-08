import appConfig from "@/public/config";
import { Link } from "react-router";

interface BreadcrumbProps {
  pageTitle: string;
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({ pageTitle }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
      {" "}
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90 order-2 sm:order-1">
        {pageTitle}
      </h2>
      <nav className="order-1 sm:order-2">
        <ol className="flex items-center gap-2">
          <li className="flex items-center">
            <Link
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              to={appConfig.FRONTEND_PATHS.DASHBOARD.homePage.path}
            >
              <i className="fas fa-home text-xs"></i>
              <span>Home</span>
            </Link>
          </li>
          <li className="flex items-center text-gray-400 dark:text-gray-500">
            <i className="fas fa-chevron-right text-xs"></i>
          </li>
          <li className="text-sm font-medium text-gray-800 dark:text-white/90">
            {pageTitle}
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default PageBreadcrumb;
