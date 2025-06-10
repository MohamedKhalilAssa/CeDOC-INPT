import { useServerSideTable } from "@/Hooks/useServerSideTable";
import { PaginatedResponse, TableConfig } from "@/Types/GlobalTypes";
import { createDefaultTableConfig } from "@/Utils/tableUtils";
import React, { useCallback } from "react";
import ServerSideTable, { Column } from "./ServerSideTable";

// Example data type
interface ExampleData {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive";
  createdAt: string;
}

interface ExampleServerSideTableProps {
  title?: string;
  subtitle?: string;
}

const ExampleServerSideTable: React.FC<ExampleServerSideTableProps> = ({
  title = "Example Table",
  subtitle = "This is an example of the unified server-side table with data stability",
}) => {
  // Mock fetcher function that simulates API calls
  const fetchData = useCallback(
    async (config: TableConfig): Promise<PaginatedResponse<ExampleData>> => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock data generation
      const allData: ExampleData[] = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        status: Math.random() > 0.5 ? "active" : "inactive",
        createdAt: new Date(
          Date.now() - Math.random() * 10000000000
        ).toISOString(),
      }));

      // Apply search filter
      let filteredData = allData;
      if (config.search) {
        const searchLower = config.search.toLowerCase();
        filteredData = allData.filter(
          (item) =>
            item.name.toLowerCase().includes(searchLower) ||
            item.email.toLowerCase().includes(searchLower)
        );
      }

      // Apply sorting
      if (config.sortBy && config.sort) {
        filteredData.sort((a, b) => {
          const aVal = a[config.sortBy as keyof ExampleData];
          const bVal = b[config.sortBy as keyof ExampleData];

          let comparison = 0;
          if (aVal < bVal) comparison = -1;
          if (aVal > bVal) comparison = 1;

          return config.sort === "desc" ? -comparison : comparison;
        });
      }

      // Apply pagination
      const startIndex = (config.page - 1) * config.pageSize;
      const endIndex = startIndex + config.pageSize;
      const paginatedData = filteredData.slice(startIndex, endIndex);

      return {
        content: paginatedData,
        currentPage: config.page,
        totalPages: Math.ceil(filteredData.length / config.pageSize),
        totalItems: filteredData.length,
        pageSize: config.pageSize,
        isLast: config.page >= Math.ceil(filteredData.length / config.pageSize),
      };
    },
    []
  );

  // Use the table hook
  const { config, data, loading, error, setConfig } =
    useServerSideTable<ExampleData>({
      initialConfig: createDefaultTableConfig({
        pageSize: 5, // Smaller page size for example
      }),
      fetcher: fetchData,
      onError: (err) => {
        console.error("Table fetch error:", err);
      },
    });

  // Define columns
  const columns: Column[] = [
    {
      key: "id",
      label: "ID",
      sortable: true,
      width: "80px",
    },
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (value: string, row: ExampleData) => (
        <div className="font-medium text-gray-900">{value}</div>
      ),
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
      render: (value: string) => <div className="text-gray-600">{value}</div>,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value: string) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            value === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-500">
          {new Date(value).toLocaleDateString()}
        </div>
      ),
    },
  ];

  // Handle row actions
  const handleView = useCallback((row: ExampleData) => {
    alert(`Viewing user: ${row.name}`);
  }, []);

  const handleEdit = useCallback((row: ExampleData) => {
    alert(`Editing user: ${row.name}`);
  }, []);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-800 font-semibold">Error loading data</h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Configuration Display */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">
          Current Configuration:
        </h4>
        <pre className="text-xs text-gray-600 bg-white p-2 rounded border overflow-x-auto">
          {JSON.stringify(config, null, 2)}
        </pre>
      </div>

      {/* Table */}
      <ServerSideTable
        title={title}
        subtitle={subtitle}
        columns={columns}
        data={data}
        loading={loading}
        config={config}
        onConfigChange={setConfig}
        onView={handleView}
        onEdit={handleEdit}
        searchPlaceholder="Search users by name or email..."
        emptyMessage="No users found"
        dataStability={true} // Enable data stability
      />

      {/* Controls for testing */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="text-sm font-semibold text-blue-700 mb-2">
          Test Controls:
        </h4>
        <div className="space-x-2">
          <button
            onClick={() => setConfig({ page: 1 })}
            className="px-3 py-1  bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            Reset to Page 1
          </button>
          <button
            onClick={() => setConfig({ search: "User 1" })}
            className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          >
            Search "User 1"
          </button>
          <button
            onClick={() => setConfig({ sortBy: "name", sort: "desc", page: 1 })}
            className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
          >
            Sort by Name (Desc)
          </button>
          <button
            onClick={() =>
              setConfig({ search: "", sortBy: "", sort: "", page: 1 })
            }
            className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
          >
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExampleServerSideTable;
