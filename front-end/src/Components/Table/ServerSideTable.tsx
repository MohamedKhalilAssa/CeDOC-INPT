import { PaginatedResponse } from "@/Types/GlobalTypes";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Eye,
  Search,
} from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
  width?: string;
}

interface ServerSideTableProps {
  columns: Column[];
  paginatedResponse: PaginatedResponse<any>;
  loading?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  title?: string;
  subtitle?: string;
  emptyMessage?: string;
  actions?: boolean;
  onPageChange: (page: number) => void;
  onSearchChange: (search: string) => void;
  onSortChange: (sortBy: string, sortDirection: "asc" | "desc") => void;
  onRowClick?: (row: any) => void;
  onEdit?: (row: any) => void;
  onView?: (row: any) => void;
  currentSearch?: string;
  currentSort?: {
    sortBy: string;
    sort: "asc" | "desc";
  } | null;
}

const ServerSideTable: React.FC<ServerSideTableProps> = ({
  columns,
  paginatedResponse,
  loading = false,
  searchable = true,
  searchPlaceholder = "Search...",
  title,
  subtitle,
  emptyMessage = "No data available",
  actions = true,
  onPageChange,
  onSearchChange,
  onSortChange,
  onRowClick,
  onEdit,
  onView,
  currentSearch = "",
  currentSort = null,
}) => {
  const [searchTerm, setSearchTerm] = useState(currentSearch);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== currentSearch) {
        onSearchChange(searchTerm);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, onSearchChange, currentSearch]);

  // Update local search when controlled value changes
  useEffect(() => {
    setSearchTerm(currentSearch);
  }, [currentSearch]);

  const handleSort = useCallback(
    (key: string) => {
      const column = columns.find((col) => col.key === key);
      if (!column?.sortable) return;

      let newDirection: "asc" | "desc" = "asc";
      if (currentSort?.sortBy === key) {
        if (currentSort.sort === "asc") {
          newDirection = "desc";
        } else {
          // Remove sort by passing empty sortBy
          onSortChange("", "asc");
          return;
        }
      }

      onSortChange(key, newDirection);
    },
    [columns, currentSort, onSortChange]
  );

  const getSortIcon = useCallback(
    (key: string) => {
      const column = columns.find((col) => col.key === key);
      if (!column?.sortable) return null;
      if (currentSort?.sortBy === key) {
        return currentSort.sort === "asc" ? (
          <ArrowUp className="w-4 h-4" />
        ) : (
          <ArrowDown className="w-4 h-4" />
        );
      }
      return <ArrowUpDown className="w-4 h-4 opacity-50" />;
    },
    [currentSort, columns]
  );

  const {
    content = [],
    currentPage,
    totalPages,
    totalItems,
    pageSize,
  } = paginatedResponse;
  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalItems);

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
              content.map((row, index) => (
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
              Showing {startIndex} to {endIndex} of {totalItems} results
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => onPageChange(currentPage - 1)}
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
                      onClick={() => onPageChange(pageNum)}
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
                onClick={() => onPageChange(currentPage + 1)}
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

export type { Column, ServerSideTableProps };
export default ServerSideTable;
