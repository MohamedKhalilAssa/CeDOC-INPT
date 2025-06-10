import {
  AlertTriangle,
  Award,
  BookOpen,
  Clock,
  FileText,
  GraduationCap,
  Plus,
  User,
  Users,
  XCircle,
} from "lucide-react";
import React, { useState } from "react";

const getStatusLabel = (status: string) => {
  switch (status) {
    case "phd_student":
      return "PhD Student";
    case "pre_registered":
      return "Pre-registered";
    case "candidate_accepted":
      return "Accepted Candidate";
    default:
      return status;
  }
};

// Mock data (replace with actual API calls)
const mockPhdStudents = [
  {
    id: "1",
    firstName: "Youssef",
    lastName: "Benali",
    email: "y.benali@inpt.ac.ma",
    enrollmentYear: 2024,
    status: "phd_student",
    teamId: "team1",
    thesisDirectorId: "prof1",
    thesisSubject: "Machine Learning Applications in Healthcare",
    hasEquivalence: true,
    documentsComplete: true,
    profile: {
      publicationCount: { indexedJournals: 1, internationalConferences: 3 },
      meetsMinimumRequirements: false,
    },
  },
  {
    id: "2",
    firstName: "Fatima",
    lastName: "Alaoui",
    email: "f.alaoui@inpt.ac.ma",
    enrollmentYear: 2023,
    status: "pre_registered",
    hasEquivalence: false,
    documentsComplete: false,
    profile: {
      publicationCount: { indexedJournals: 0, internationalConferences: 1 },
      meetsMinimumRequirements: false,
    },
  },
  {
    id: "3",
    firstName: "Ahmed",
    lastName: "Zerouali",
    email: "a.zerouali@inpt.ac.ma",
    enrollmentYear: 2022,
    status: "phd_student",
    teamId: "team2",
    thesisDirectorId: "prof2",
    thesisSubject: "Renewable Energy Systems Optimization",
    hasEquivalence: true,
    documentsComplete: true,
    profile: {
      publicationCount: { indexedJournals: 2, internationalConferences: 4 },
      meetsMinimumRequirements: true,
    },
  },
];

const mockTeams = [
  { id: "team1", name: "AI & Data Science", leaderId: "prof1" },
  { id: "team2", name: "Energy Systems", leaderId: "prof2" },
  { id: "team3", name: "Network Security", leaderId: "prof3" },
];

const mockProfessors = [
  {
    id: "prof1",
    firstName: "Dr. Mohammed",
    lastName: "Tahiri",
    canSupervise: true,
  },
  {
    id: "prof2",
    firstName: "Dr. Aicha",
    lastName: "Mansouri",
    canSupervise: true,
  },
  {
    id: "prof3",
    firstName: "Dr. Hassan",
    lastName: "Kettani",
    canSupervise: true,
  },
];

type UserRole = 'admin' | 'professor' | 'student';

interface PhdProfileManagementProps {
  userRole: UserRole;
  userId?: string; // For professor/student views
}

const DashboardOverview: React.FC<PhdProfileManagementProps> = ({ userRole, userId }) => {
  const [students] = useState(mockPhdStudents);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [showStudentModal, setShowStudentModal] = useState(false);

  // Filter students based on user role
  const getFilteredStudents = () => {
    switch (userRole) {
      case 'professor':
        return students.filter(student => 
          student.thesisDirectorId === userId 
          // student.coDirectorId === userId
        );
      case 'student':
        return students.filter(student => student.id === userId);
      default:
        return students; // admin sees all
    }
  };

  const filteredStudents = getFilteredStudents();

  const stats = {
    total: filteredStudents.length,
    active: filteredStudents.filter((s) => s.status === "phd_student").length,
    preRegistered: filteredStudents.filter((s) => s.status === "pre_registered").length,
    readyForDefense: filteredStudents.filter((s) => s.profile.meetsMinimumRequirements).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {userRole === 'admin' && 'PhD Student Profile Management'}
            {userRole === 'professor' && 'My PhD Students'}
            {userRole === 'student' && 'My PhD Profile'}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {userRole === 'admin' && 'Manage PhD student profiles, team assignments, and academic progress'}
            {userRole === 'professor' && 'View and manage students under your supervision'}
            {userRole === 'student' && 'View your academic progress and profile information'}
          </p>
        </div>
        {userRole === 'admin' && (
          <button
            onClick={() => setShowStudentModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Assign New Student</span>
          </button>
        )}
      </div>

      {/* Statistics Cards - Not shown for students */}
      {userRole !== 'student' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Students
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.total}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <GraduationCap className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Active Students
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.active}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Pre-registered
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.preRegistered}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Ready for Defense
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.readyForDefense}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Student List - Not shown for students (they only see their own profile) */}
      {userRole !== 'student' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enrollment Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Requirements
                  </th>
                  {userRole === 'admin' && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Team
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr 
                    key={student.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedStudent(student)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {student.firstName} {student.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {student.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          student.status === "phd_student"
                            ? "bg-green-100 text-green-800"
                            : student.status === "pre_registered"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {getStatusLabel(student.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.enrollmentYear}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          student.profile.meetsMinimumRequirements
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {student.profile.meetsMinimumRequirements ? "Met" : "Not Met"}
                      </span>
                    </td>
                    {userRole === 'admin' && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {mockTeams.find(t => t.id === student.teamId)?.name || 'N/A'}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* For students, show their profile directly */}
      {userRole === 'student' && filteredStudents.length > 0 && (
        <StudentDetailView student={filteredStudents[0]} />
      )}

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {selectedStudent.firstName} {selectedStudent.lastName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {selectedStudent.email}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <StudentDetailView student={selectedStudent} />
            </div>
          </div>
        </div>
      )}

      {/* Student Assignment Modal - Only for admin */}
      {showStudentModal && userRole === 'admin' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Assign New PhD Student
              </h2>
            </div>
            <div className="p-6">
              <StudentAssignmentForm
                onClose={() => setShowStudentModal(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Student Detail View Component (same as before)
const StudentDetailView: React.FC<{ student: any }> = ({ student }) => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "publications", label: "Publications", icon: FileText },
    { id: "teaching", label: "Teaching", icon: BookOpen },
    { id: "awards", label: "Awards", icon: Award },
  ];

  return (
    <div className="space-y-6">
      {/* Status Alert */}
      {student.status === "pre_registered" && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800">
                Pre-registration Status
              </h3>
              <p className="text-sm text-yellow-700 mt-1">
                This student is pre-registered pending document completion or
                diploma equivalence.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Minimum Requirements Alert */}
      {!student.profile.meetsMinimumRequirements &&
        student.status === "phd_student" && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <XCircle className="w-5 h-5 text-red-600 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-red-800">
                  Minimum Requirements Not Met
                </h3>
                <p className="text-sm text-red-700 mt-1">
                  Student needs 2 indexed journal articles OR 1 indexed journal + 2 international conferences to defend.
                </p>
              </div>
            </div>
          </div>
        )}

      {/* Student Profile Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Academic Information
          </h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-500">
                Enrollment Year:
              </span>
              <span className="ml-2 text-sm text-gray-900">
                {student.enrollmentYear}
              </span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Status:</span>
              <span
                className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  student.status === "phd_student"
                    ? "bg-green-100 text-green-800"
                    : student.status === "pre_registered"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {getStatusLabel(student.status)}
              </span>
            </div>
            {student.thesisSubject && (
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Thesis Subject:
                </span>
                <p className="mt-1 text-sm text-gray-900">
                  {student.thesisSubject}
                </p>
              </div>
            )}
            {student.thesisDirectorId && (
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Thesis Director:
                </span>
                <p className="mt-1 text-sm text-gray-900">
                  {mockProfessors.find(p => p.id === student.thesisDirectorId)?.firstName} 
                  {' '}
                  {mockProfessors.find(p => p.id === student.thesisDirectorId)?.lastName}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Publications
          </h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-500">
                Indexed Journals:
              </span>
              <span className="ml-2 text-sm text-gray-900">
                {student.profile.publicationCount.indexedJournals}
              </span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">
                International Conferences:
              </span>
              <span className="ml-2 text-sm text-gray-900">
                {student.profile.publicationCount.internationalConferences}
              </span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">
                Meets Requirements:
              </span>
              <span
                className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  student.profile.meetsMinimumRequirements
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {student.profile.meetsMinimumRequirements ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Student Assignment Form Component (same as before)
const StudentAssignmentForm: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [formData, setFormData] = useState({
    candidateId: "",
    teamId: "",
    thesisDirectorId: "",
    coDirectorId: "",
    thesisSubject: "",
  });

  const mockAcceptedCandidates = [
    { id: "1", name: "Sara Benjelloun", email: "s.benjelloun@inpt.ac.ma" },
    { id: "2", name: "Omar Tazi", email: "o.tazi@inpt.ac.ma" },
    { id: "3", name: "Laila Hamdi", email: "l.hamdi@inpt.ac.ma" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to assign the student
    console.log("Assigning student:", formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Accepted Candidate
        </label>
        <select
          value={formData.candidateId}
          onChange={(e) =>
            setFormData({ ...formData, candidateId: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Choose a candidate...</option>
          {mockAcceptedCandidates.map((candidate) => (
            <option key={candidate.id} value={candidate.id}>
              {candidate.name} ({candidate.email})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Assign to Team
        </label>
        <select
          value={formData.teamId}
          onChange={(e) => setFormData({ ...formData, teamId: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select team...</option>
          {mockTeams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Thesis Director
        </label>
        <select
          value={formData.thesisDirectorId}
          onChange={(e) =>
            setFormData({ ...formData, thesisDirectorId: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select director...</option>
          {mockProfessors
            .filter((p) => p.canSupervise)
            .map((prof) => (
              <option key={prof.id} value={prof.id}>
                {prof.firstName} {prof.lastName}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Co-Director (Optional)
        </label>
        <select
          value={formData.coDirectorId}
          onChange={(e) =>
            setFormData({ ...formData, coDirectorId: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select co-director...</option>
          {mockProfessors
            .filter((p) => p.canSupervise && p.id !== formData.thesisDirectorId)
            .map((prof) => (
              <option key={prof.id} value={prof.id}>
                {prof.firstName} {prof.lastName}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Thesis Subject
        </label>
        <textarea
          value={formData.thesisSubject}
          onChange={(e) =>
            setFormData({ ...formData, thesisSubject: e.target.value })
          }
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter thesis subject..."
          required
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Assign Student
        </button>
      </div>
    </form>
  );
};

export default DashboardOverview;