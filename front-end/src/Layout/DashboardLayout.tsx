import { useState } from "react";
import { Outlet } from "react-router-dom";
import Logo_inpt from "@/assets/images/Logo_inpt.png";
import appConfig from "@/public/config.ts";
import { Link } from "react-router-dom";




/**
 * PhD Studies Center Dashboard Layout for INPT
 * Academic-focused dashboard for managing PhD programs and research
 */
const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-white-600 to-white-700">
          <div className="flex items-center space-x-3">
            <Link
              to={`${appConfig.FRONTEND_PATHS.GLOBAL.landingPage.path}`}
              className="flex items-center"
            >
              <img className="h-10 w-auto" src={Logo_inpt} alt="Logo INPT" />{" "}
              {/* Increased logo size from h-8 to h-10 */}
              <span className="block h-6 w-px bg-gray-300 mx-3"></span>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
                CEDoc
              </span>
            </Link>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg text-blue-100 hover:text-white hover:bg-blue-500 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {/* Dashboard */}
          <a
            href="/dashboard"
            className="flex items-center px-4 py-3 text-sm font-medium text-slate-700 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group"
          >
            <svg
              className="w-5 h-5 mr-3 text-slate-500 group-hover:text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              />
            </svg>
            Dashboard Overview
          </a>
          {/* Doctoral Profile Management */}
          <div className="pt-4">
            <h3 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Doctoral Profile
            </h3>
            <Link
              to="/dashboard/student-profile"
              className="flex items-center px-4 py-3 text-sm font-medium text-slate-700 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group"
            >
              <svg
                className="w-5 h-5 mr-3 text-slate-500 group-hover:text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              My Profile
            </Link>
            <Link
              to="/dashboard/team-assignment"
              className="flex items-center px-4 py-3 text-sm font-medium text-slate-700 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group"
            >
              <svg
                className="w-5 h-5 mr-3 text-slate-500 group-hover:text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Team Assignment
            </Link>
            <Link
              to="/dashboard/publication-validation"
              className="flex items-center px-4 py-3 text-sm font-medium text-slate-700 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group"
            >
              <svg
                className="w-5 h-5 mr-3 text-slate-500 group-hover:text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Publication Validation
            </Link>
          </div>

          {/* Students Management */}
          <div className="pt-4">
            <h3 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Student Management
            </h3>
            <a
              href="/dashboard/students"
              className="flex items-center px-4 py-3 text-sm font-medium text-slate-700 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group"
            >
              <svg
                className="w-5 h-5 mr-3 text-slate-500 group-hover:text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
              PhD Students
            </a>
            <a
              href="/dashboard/applications"
              className="flex items-center px-4 py-3 text-sm font-medium text-slate-700 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group"
            >
              <svg
                className="w-5 h-5 mr-3 text-slate-500 group-hover:text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Applications
            </a>
          </div>

          {/* Research Management */}
          <div className="pt-4">
            <h3 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Research
            </h3>
            <a
              href="/dashboard/research-projects"
              className="flex items-center px-4 py-3 text-sm font-medium text-slate-700 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group"
            >
              <svg
                className="w-5 h-5 mr-3 text-slate-500 group-hover:text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              Research Projects
            </a>
            <a
              href="/dashboard/publications"
              className="flex items-center px-4 py-3 text-sm font-medium text-slate-700 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group"
            >
              <svg
                className="w-5 h-5 mr-3 text-slate-500 group-hover:text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              Publications
            </a>
            <a
              href="/dashboard/supervisors"
              className="flex items-center px-4 py-3 text-sm font-medium text-slate-700 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group"
            >
              <svg
                className="w-5 h-5 mr-3 text-slate-500 group-hover:text-blue-600"
                fill="noneAD
"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Supervisors
            </a>
          </div>

          {/* Academic Management */}
          <div className="pt-4">
            <h3 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Academic
            </h3>
            <a
              href="/dashboard/defenses"
              className="flex items-center px-4 py-3 text-sm font-medium text-slate-700 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group"
            >
              <svg
                className="w-5 h-5 mr-3 text-slate-500 group-hover:text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4l6 6m0-6l-6 6"
                />
              </svg>
              Thesis Defenses
            </a>
            <a
              href="/dashboard/courses"
              className="flex items-center px-4 py-3 text-sm font-medium text-slate-700 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group"
            >
              <svg
                className="w-5 h-5 mr-3 text-slate-500 group-hover:text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              Doctoral Courses
            </a>
            <a
              href="/dashboard/seminars"
              className="flex items-center px-4 py-3 text-sm font-medium text-slate-700 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group"
            >
              <svg
                className="w-5 h-5 mr-3 text-slate-500 group-hover:text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Research Seminars
            </a>
          </div>

          {/* Reports & Analytics */}
          <div className="pt-4">
            <h3 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Reports
            </h3>
            <a
              href="/dashboard/analytics"
              className="flex items-center px-4 py-3 text-sm font-medium text-slate-700 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group"
            >
              <svg
                className="w-5 h-5 mr-3 text-slate-500 group-hover:text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Analytics
            </a>
            <a
              href="/dashboard/reports"
              className="flex items-center px-4 py-3 text-sm font-medium text-slate-700 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group"
            >
              <svg
                className="w-5 h-5 mr-3 text-slate-500 group-hover:text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Reports
            </a>
          </div>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-500">
              Academic Year 2024-2025
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-slate-600">System Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top header */}
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              {/* Search Bar */}
              <div className="hidden md:flex items-center bg-slate-100 rounded-lg px-3 py-2">
                <svg
                  className="w-4 h-4 text-slate-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search students, projects..."
                  className="bg-transparent text-sm text-slate-600 placeholder-slate-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">AD</span>
                </div>
                <span className="hidden md:block text-sm text-slate-700">
                  Admin
                </span>
              </div>

              <a
                href="/"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back
              </a>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
