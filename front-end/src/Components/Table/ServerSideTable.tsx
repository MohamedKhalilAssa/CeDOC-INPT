import { PaginatedResponse, TableConfig } from "@/Types/GlobalTypes";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Eye,
  Search,
  TrashIcon,
} from "lucide-react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
  width?: string;
}

interface ServerSideTableProps {
  columns: Column[];
  data: PaginatedResponse<any>;
  loading?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  title?: string;
  subtitle?: string;
  emptyMessage?: string;
  actions?: boolean;
  config: TableConfig;
  onConfigChange: (config: Partial<TableConfig>) => void;
  onRowClick?: (row: any) => void;
  onEdit?: (row: any) => void;
  onView?: (row: any) => void;
  onDelete?: (row: any) => void;
  dataStability?: boolean; // Enable data stability during loading
}

const ServerSideTable: React.FC<ServerSideTableProps> = ({
  columns,
  data,
  loading = false,
  searchable = true,
  searchPlaceholder = "Search...",
  title,
  subtitle,
  emptyMessage = "No data available",
  actions = true,
  config,
  onConfigChange,
  onRowClick,
  onEdit,
  onDelete,
  onView,
  dataStability = true,
}) => {
  const [searchTerm, setSearchTerm] = useState(config.search);
  const stableDataRef = useRef<PaginatedResponse<any> | null>(null);
  const prevDataRef = useRef<PaginatedResponse<any> | null>(null);

  // Data stability logic - keep previous data during loading if dataStability is enabled
  const displayData = useMemo(() => {
    if (!dataStability) {
      return data;
    }

    // If we're loading and have stable data, use stable data
    if (loading && stableDataRef.current) {
      return stableDataRef.current;
    }

    // If we're not loading and data is different from previous, update stable data
    if (
      !loading &&
      JSON.stringify(data) !== JSON.stringify(prevDataRef.current)
    ) {
      stableDataRef.current = data;
      prevDataRef.current = data;
    }

    return data;
  }, [data, loading, dataStability]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== config.search) {
        onConfigChange({ search: searchTerm, page: 1 }); // Reset to page 1 on search
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, config.search, onConfigChange]);

  // Update local search when config changes externally
  useEffect(() => {
    setSearchTerm(config.search);
  }, [config.search]);

  const handleSort = useCallback(
    (key: string) => {
      const column = columns.find((col) => col.key === key);
      if (!column?.sortable) return;

      let newSort: "asc" | "desc" | "" = "asc";
      if (config.sortBy === key) {
        if (config.sort === "asc") {
          newSort = "desc";
        } else {
          // Remove sort
          onConfigChange({ sortBy: "", sort: "", page: 1 });
          return;
        }
      }

      onConfigChange({ sortBy: key, sort: newSort, page: 1 });
    },
    [columns, config.sortBy, config.sort, onConfigChange]
  );

  const getSortIcon = useCallback(
    (key: string) => {
      const column = columns.find((col) => col.key === key);
      if (!column?.sortable) return null;
      if (config.sortBy === key) {
        return config.sort === "asc" ? (
          <ArrowUp className="w-4 h-4" />
        ) : (
          <ArrowDown className="w-4 h-4" />
        );
      }
      return <ArrowUpDown className="w-4 h-4 opacity-50" />;
    },
    [config.sortBy, config.sort, columns]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      onConfigChange({ page });
    },
    [onConfigChange]
  );
  const { content = [], totalPages, totalItems, pageSize } = displayData;
  // Use config.page for pagination button state (not affected by data stability)
  const activePage = config.page;

  // Calculate display values using activePage and actual content for accuracy
  const startIndex = totalItems > 0 ? (activePage - 1) * pageSize + 1 : 0;
  const endIndex = totalItems > 0 ? startIndex + content.length - 1 : 0;
  // Check if we can navigate (use config.page but validate against stable data bounds)
  const canGoPrevious = activePage > 1;
  const canGoNext = activePage < totalPages;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      {(title || subtitle || searchable) && (
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4">
            {/* Title Section */}
            {(title || subtitle) && (
              <div className="flex-shrink-0">
                {title && (
                  <h2 className="text-lg font-semibold text-gray-900">
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
                )}
              </div>
            )}

            {/* Search Section */}
            {searchable && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 xl:ml-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    column.sortable ? "cursor-pointer hover:bg-gray-100" : ""
                  }`}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {getSortIcon(column.key)}
                  </div>
                </th>
              ))}
              {actions && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading && !dataStability ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-6 py-12 text-center"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <span className="text-gray-500">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : content.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              content.map((row: any, index: number) => (
                <tr
                  key={row.id || index}
                  className={`hover:bg-gray-50 ${
                    onRowClick ? "cursor-pointer" : ""
                  } ${loading && dataStability ? "opacity-75" : ""}`} // Slightly fade during loading if data stability is on
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        {onView && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onView(row);
                            }}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 cursor-pointer  hover:scale-110  transition"
                            title="View"
                          >
                            <Eye className="w-5 h-5 text-green-500 hover:text-green-700 transition" />
                          </button>
                        )}
                        {onEdit && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEdit(row);
                            }}
                            className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50 cursor-pointer  hover:scale-110  transition"
                            title="Edit"
                          >
                            <Edit3 className="w-5 h-5 text-blue-500 hover:text-blue-700 transition" />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDelete(row);
                            }}
                            className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50 cursor-pointer  hover:scale-110  transition"
                            title="Delete"
                          >
                            <TrashIcon className="w-5 h-5 text-red-500 hover:text-red-700 transition" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Loading indicator for data stability mode */}
      {loading && dataStability && (
        <div className="px-6 py-2 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-sm text-gray-600">Updating...</span>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {startIndex} to {endIndex} of {totalItems} results
            </div>{" "}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(activePage - 1)}
                disabled={!canGoPrevious}
                className={`p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed ${
                  canGoPrevious ? "cursor-pointer" : ""
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Page numbers */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (activePage <= 3) {
                    pageNum = i + 1;
                  } else if (activePage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = activePage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-1 rounded-lg text-sm cursor-pointer ${
                        activePage === pageNum
                          ? "bg-blue-600 text-white"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageChange(activePage + 1)}
                disabled={!canGoNext}
                className={`p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed ${
                  canGoNext ? "cursor-pointer" : ""
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export type { Column, ServerSideTableProps };
export default ServerSideTable;
