import React, { useState } from "react";
import DataTable, { Column } from "./Table";

const TableExample: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Sample data - expanded to better demonstrate pagination and filtering
  const sampleData = [
    {
      id: "1",
      firstName: "Youssef",
      lastName: "Benali",
      email: "y.benali@inpt.ac.ma",
      status: "phd_student",
      enrollmentYear: 2024,
      publications: 4,
      team: "AI & Data Science",
      supervisor: "Dr. Hassan Ahmed",
    },
    {
      id: "2",
      firstName: "Fatima",
      lastName: "Alaoui",
      email: "f.alaoui@inpt.ac.ma",
      status: "pre_registered",
      enrollmentYear: 2023,
      publications: 1,
      team: "Energy Systems",
      supervisor: "Dr. Amina Berrada",
    },
    {
      id: "3",
      firstName: "Ahmed",
      lastName: "Zerouali",
      email: "a.zerouali@inpt.ac.ma",
      status: "phd_student",
      enrollmentYear: 2022,
      publications: 6,
      team: "Network Security",
      supervisor: "Dr. Omar Kadiri",
    },
    {
      id: "4",
      firstName: "Khadija",
      lastName: "Mansouri",
      email: "k.mansouri@inpt.ac.ma",
      status: "candidate_accepted",
      enrollmentYear: 2024,
      publications: 2,
      team: "AI & Data Science",
      supervisor: "Dr. Hassan Ahmed",
    },
    {
      id: "5",
      firstName: "Mohamed",
      lastName: "Chakir",
      email: "m.chakir@inpt.ac.ma",
      status: "phd_student",
      enrollmentYear: 2021,
      publications: 8,
      team: "Network Security",
      supervisor: "Dr. Omar Kadiri",
    },
    {
      id: "6",
      firstName: "Aicha",
      lastName: "Benjelloun",
      email: "a.benjelloun@inpt.ac.ma",
      status: "pre_registered",
      enrollmentYear: 2024,
      publications: 0,
      team: "Energy Systems",
      supervisor: "Dr. Amina Berrada",
    },
    {
      id: "7",
      firstName: "Rachid",
      lastName: "Ouali",
      email: "r.ouali@inpt.ac.ma",
      status: "phd_student",
      enrollmentYear: 2023,
      publications: 3,
      team: "Robotics",
      supervisor: "Dr. Youssef Idrissi",
    },
    {
      id: "8",
      firstName: "Salma",
      lastName: "Tazi",
      email: "s.tazi@inpt.ac.ma",
      status: "candidate_accepted",
      enrollmentYear: 2024,
      publications: 1,
      team: "Robotics",
      supervisor: "Dr. Youssef Idrissi",
    },
  ];

  // Column definitions with enhanced features
  const columns: Column[] = [
    {
      key: "student",
      label: "Student",
      sortable: true,
      width: "300px",
      render: (_, row) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {row.firstName[0]}
                {row.lastName[0]}
              </span>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {row.firstName} {row.lastName}
            </div>
            <div className="text-sm text-gray-500">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      filterable: true,
      width: "150px",
      render: (status) => {
        const getStatusConfig = (status: string) => {
          switch (status) {
            case "phd_student":
              return {
                color: "bg-green-100 text-green-800 border-green-200",
                label: "PhD Student",
              };
            case "pre_registered":
              return {
                color: "bg-yellow-100 text-yellow-800 border-yellow-200",
                label: "Pre-registered",
              };
            case "candidate_accepted":
              return {
                color: "bg-blue-100 text-blue-800 border-blue-200",
                label: "Accepted",
              };
            default:
              return {
                color: "bg-gray-100 text-gray-800 border-gray-200",
                label: status,
              };
          }
        };

        const config = getStatusConfig(status);
        return (
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${config.color}`}
          >
            {config.label}
          </span>
        );
      },
    },
    {
      key: "team",
      label: "Team",
      sortable: true,
      filterable: true,
      width: "180px",
      render: (team) => (
        <span className="text-sm text-gray-900 font-medium">{team}</span>
      ),
    },
    {
      key: "enrollmentYear",
      label: "Year",
      sortable: true,
      width: "100px",
      render: (year) => (
        <span className="text-sm font-mono text-gray-900">{year}</span>
      ),
    },
    {
      key: "publications",
      label: "Publications",
      sortable: true,
      width: "120px",
      render: (publications) => {
        const getPublicationColor = (count: number) => {
          if (count === 0) return "bg-gray-100 text-gray-600";
          if (count <= 2) return "bg-blue-100 text-blue-700";
          if (count <= 5) return "bg-green-100 text-green-700";
          return "bg-purple-100 text-purple-700";
        };

        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPublicationColor(
              publications
            )}`}
          >
            {publications} {publications === 1 ? "pub" : "pubs"}
          </span>
        );
      },
    },
    {
      key: "supervisor",
      label: "Supervisor",
      sortable: true,
      width: "180px",
      render: (supervisor) => (
        <span className="text-sm text-gray-600">{supervisor}</span>
      ),
    },
  ];

  // Filter options
  const filters = {
    status: [
      { label: "PhD Student", value: "phd_student" },
      { label: "Pre-registered", value: "pre_registered" },
      { label: "Accepted Candidate", value: "candidate_accepted" },
    ],
    team: [
      { label: "AI & Data Science", value: "AI & Data Science" },
      { label: "Energy Systems", value: "Energy Systems" },
      { label: "Network Security", value: "Network Security" },
      { label: "Robotics", value: "Robotics" },
    ],
    enrollmentYear: [
      { label: "2024", value: "2024" },
      { label: "2023", value: "2023" },
      { label: "2022", value: "2022" },
      { label: "2021", value: "2021" },
    ],
  };

  // Event handlers
  const handleView = (row: any) => {
    alert(
      `👁️ Viewing profile: ${row.firstName} ${row.lastName}\n\nEmail: ${row.email}\nTeam: ${row.team}\nSupervisor: ${row.supervisor}`
    );
  };

  const handleEdit = (row: any) => {
    alert(
      `✏️ Editing profile: ${row.firstName} ${row.lastName}\n\nThis would open an edit form or modal.`
    );
  };

  const handleRowClick = (row: any) => {
    console.log("Row clicked:", row);
    // You could navigate to a detail page here
    // navigate(`/students/${row.id}`);
  };

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Table Component Demo
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Demonstration of the enhanced DataTable component with all
                features
              </p>
            </div>
            <button
              onClick={simulateLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Simulate Loading
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Features Overview */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-900">Search</h3>
            <p className="text-xs text-gray-500 mt-1">
              Search across all visible columns
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-900">Filtering</h3>
            <p className="text-xs text-gray-500 mt-1">
              Filter by status, team, and year
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-900">Sorting</h3>
            <p className="text-xs text-gray-500 mt-1">
              Click column headers to sort
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-900">Actions</h3>
            <p className="text-xs text-gray-500 mt-1">
              View and edit buttons for each row
            </p>
          </div>
        </div>

        {/* DataTable Component */}
        <DataTable
          data={sampleData}
          columns={columns}
          title="PhD Students Directory"
          subtitle="Manage PhD student profiles and track academic progress"
          searchable={true}
          searchPlaceholder="Search students by name, email, team..."
          itemsPerPage={5}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onView={handleView}
          onEdit={handleEdit}
          onRowClick={handleRowClick}
          filters={filters}
          actions={true}
          loading={loading}
          emptyMessage="No students found matching your criteria"
        />

        {/* Usage Instructions */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            🧪 Try These Features:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                Search & Filter:
              </h3>
              <ul className="space-y-1 text-gray-600">
                <li>• Search for "Ahmed" or "Energy"</li>
                <li>• Use filters to show only PhD Students</li>
                <li>• Filter by specific teams</li>
                <li>• Combine search with filters</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Interact:</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• Click column headers to sort</li>
                <li>• Click the eye icon to view details</li>
                <li>• Click the edit icon to edit</li>
                <li>• Click on rows to see console log</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableExample;
