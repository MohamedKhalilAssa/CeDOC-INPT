import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Eye,
  Filter,
  Search,
} from "lucide-react";
import React, { useMemo, useState } from "react";

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
  width?: string;
}

interface FilterOption {
  label: string;
  value: string;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  searchable?: boolean;
  searchPlaceholder?: string;
  itemsPerPage?: number;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onRowClick?: (row: any) => void;
  onEdit?: (row: any) => void;
  onView?: (row: any) => void;
  actions?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  title?: string;
  subtitle?: string;
  filters?: { [key: string]: FilterOption[] };
}

const DataTable: React.FC<DataTableProps> = ({
  data = [],
  columns = [],
  searchable = true,
  searchPlaceholder = "Search...",
  itemsPerPage = 10,
  currentPage: controlledCurrentPage,
  totalPages: controlledTotalPages,
  onPageChange,
  onRowClick,
  onEdit,
  onView,
  actions = true,
  loading = false,
  emptyMessage = "No data available",
  title,
  subtitle,
  filters = {},
}) => {
  // Internal state for uncontrolled mode
  const [internalCurrentPage, setInternalCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [activeFilters, setActiveFilters] = useState<{ [key: string]: string }>(
    {}
  );
  const [showFilters, setShowFilters] = useState(false);

  // Use controlled or uncontrolled page state
  const currentPage = controlledCurrentPage ?? internalCurrentPage;
  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    } else {
      setInternalCurrentPage(page);
    }
  };

  // Filter and search data
  const filteredData = useMemo(() => {
    let filtered = [...data];

    // Apply search
    if (searchTerm && searchable) {
      filtered = filtered.filter((row) =>
        columns.some((column) => {
          const value = row[column.key];
          return (
            value &&
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
      );
    }

    // Apply filters
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value && value !== "all") {
        filtered = filtered.filter((row) => {
          const rowValue = row[key];
          return rowValue === value;
        });
      }
    });

    return filtered;
  }, [data, searchTerm, activeFilters, columns, searchable]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Pagination
  const totalPages =
    controlledTotalPages ?? Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = controlledTotalPages
    ? sortedData
    : sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (key: string) => {
    if (!columns.find((col) => col.key === key)?.sortable) return;

    setSortConfig((prevConfig) => {
      if (prevConfig?.key === key) {
        if (prevConfig.direction === "asc") {
          return { key, direction: "desc" };
        } else {
          return null; // Remove sort
        }
      }
      return { key, direction: "asc" };
    });
  };

  const getSortIcon = (key: string) => {
    const column = columns.find((col) => col.key === key);
    if (!column?.sortable) return null;

    if (sortConfig?.key === key) {
      return sortConfig.direction === "asc" ? (
        <ArrowUp className="w-4 h-4" />
      ) : (
        <ArrowDown className="w-4 h-4" />
      );
    }
    return <ArrowUpDown className="w-4 h-4 opacity-50" />;
  };

  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    // Reset to first page when filtering
    handlePageChange(1);
  };

  const clearFilters = () => {
    setActiveFilters({});
    setSearchTerm("");
    handlePageChange(1);
  };

  const hasActiveFilters =
    Object.values(activeFilters).some((v) => v && v !== "all") || searchTerm;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {" "}
      {/* Header */}
      {(title || subtitle || searchable || Object.keys(filters).length > 0) && (
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

            {/* Controls Section - Right aligned on larger screens */}
            {(searchable || Object.keys(filters).length > 0) && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 xl:ml-auto">
                {/* Search */}
                {searchable && (
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
                )}

                {/* Filter Toggle */}
                {Object.keys(filters).length > 0 && (
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center justify-center space-x-2 px-3 py-2 border rounded-lg text-sm transition-colors whitespace-nowrap flex-shrink-0 ${
                      hasActiveFilters
                        ? "border-blue-500 text-blue-600 bg-blue-50"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Filter className="w-4 h-4" />
                    <span>Filters</span>
                    {hasActiveFilters && (
                      <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5 ml-1">
                        {Object.values(activeFilters).filter(
                          (v) => v && v !== "all"
                        ).length + (searchTerm ? 1 : 0)}
                      </span>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>{" "}
          {/* Filters Panel */}
          {showFilters && Object.keys(filters).length > 0 && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4">
                {Object.entries(filters).map(([key, options]) => (
                  <div
                    key={key}
                    className="flex items-center space-x-2 min-w-0"
                  >
                    <label className="text-sm font-medium text-gray-700 capitalize whitespace-nowrap">
                      {key.replace(/([A-Z])/g, " $1").trim()}:
                    </label>
                    <select
                      value={activeFilters[key] || "all"}
                      onChange={(e) => handleFilterChange(key, e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white min-w-[120px]"
                    >
                      <option value="all">All</option>
                      {options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap sm:ml-auto"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>
          )}
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
            {loading ? (
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
            ) : paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => (
                <tr
                  key={row.id || index}
                  className={`hover:bg-gray-50 ${
                    onRowClick ? "cursor-pointer" : ""
                  }`}
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
                            className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                        {onEdit && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEdit(row);
                            }}
                            className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
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
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, sortedData.length)} of{" "}
              {sortedData.length} results
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Page numbers */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-1 rounded-lg text-sm ${
                        currentPage === pageNum
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
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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

// Export types for external use
export type { Column, DataTableProps, FilterOption };

// Default export
export default DataTable;
