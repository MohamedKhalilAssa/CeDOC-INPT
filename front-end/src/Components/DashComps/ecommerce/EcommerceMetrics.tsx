import React, { useState, useEffect } from 'react';
import { 
  User, 
  GraduationCap, 
  FileText, 
  Award, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Plus,
  Edit3,
  Eye,
  AlertTriangle,
  Users,
  BookOpen
} from 'lucide-react';
const getStatusLabel = (status: string) => {
  switch (status) {
    case 'phd_student': return 'PhD Student';
    case 'pre_registered': return 'Pre-registered';
    case 'candidate_accepted': return 'Accepted Candidate';
    default: return status;
  }
};

// Mock data (replace with actual API calls)
const mockPhdStudents = [
  {
    id: '1',
    firstName: 'Youssef',
    lastName: 'Benali',
    email: 'y.benali@inpt.ac.ma',
    enrollmentYear: 2024,
    status: 'phd_student',
    teamId: 'team1',
    thesisDirectorId: 'prof1',
    thesisSubject: 'Machine Learning Applications in Healthcare',
    hasEquivalence: true,
    documentsComplete: true,
    profile: {
      publicationCount: { indexedJournals: 1, internationalConferences: 3 },
      meetsMinimumRequirements: false
    }
  },
  {
    id: '2',
    firstName: 'Fatima',
    lastName: 'Alaoui',
    email: 'f.alaoui@inpt.ac.ma',
    enrollmentYear: 2023,
    status: 'pre_registered',
    hasEquivalence: false,
    documentsComplete: false,
    profile: {
      publicationCount: { indexedJournals: 0, internationalConferences: 1 },
      meetsMinimumRequirements: false
    }
  },
  {
    id: '3',
    firstName: 'Ahmed',
    lastName: 'Zerouali',
    email: 'a.zerouali@inpt.ac.ma',
    enrollmentYear: 2022,
    status: 'phd_student',
    teamId: 'team2',
    thesisDirectorId: 'prof2',
    thesisSubject: 'Renewable Energy Systems Optimization',
    hasEquivalence: true,
    documentsComplete: true,
    profile: {
      publicationCount: { indexedJournals: 2, internationalConferences: 4 },
      meetsMinimumRequirements: true
    }
  }
];

const mockTeams = [
  { id: 'team1', name: 'AI & Data Science', leaderId: 'prof1' },
  { id: 'team2', name: 'Energy Systems', leaderId: 'prof2' },
  { id: 'team3', name: 'Network Security', leaderId: 'prof3' }
];

const mockProfessors = [
  { id: 'prof1', firstName: 'Dr. Mohammed', lastName: 'Tahiri', canSupervise: true },
  { id: 'prof2', firstName: 'Dr. Aicha', lastName: 'Mansouri', canSupervise: true },
  { id: 'prof3', firstName: 'Dr. Hassan', lastName: 'Kettani', canSupervise: true }
];

const PhdProfileManagement: React.FC = () => {
  const [students, setStudents] = useState(mockPhdStudents);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'phd_student': return 'bg-green-100 text-green-800';
      case 'pre_registered': return 'bg-yellow-100 text-yellow-800';
      case 'candidate_accepted': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'phd_student': return 'PhD Student';
      case 'pre_registered': return 'Pre-registered';
      case 'candidate_accepted': return 'Accepted Candidate';
      default: return status;
    }
  };

  const filteredStudents = students.filter(student => 
    filterStatus === 'all' || student.status === filterStatus
  );

  const stats = {
    total: students.length,
    active: students.filter(s => s.status === 'phd_student').length,
    preRegistered: students.filter(s => s.status === 'pre_registered').length,
    readyForDefense: students.filter(s => s.profile.meetsMinimumRequirements).length
  };
  

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">PhD Student Profile Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage PhD student profiles, team assignments, and academic progress
          </p>
        </div>
        <button 
          onClick={() => setShowStudentModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Assign New Student</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <GraduationCap className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Students</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.active}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pre-registered</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.preRegistered}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ready for Defense</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.readyForDefense}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Filter by status:</span>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Students</option>
            <option value="phd_student">PhD Students</option>
            <option value="pre_registered">Pre-registered</option>
            <option value="candidate_accepted">Accepted Candidates</option>
          </select>
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">PhD Students</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team / Director
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Publications
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Defense Ready
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => {
                const team = mockTeams.find(t => t.id === student.teamId);
                const director = mockProfessors.find(p => p.id === student.thesisDirectorId);
                
                return (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                              {student.firstName[0]}{student.lastName[0]}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {student.firstName} {student.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(student.status)}`}>
                        {getStatusLabel(student.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <div className="font-medium">{team?.name || 'Not assigned'}</div>
                        <div className="text-gray-500">{director ? `${director.firstName} ${director.lastName}` : 'No director'}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex space-x-2">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {student.profile.publicationCount.indexedJournals} Journals
                        </span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                          {student.profile.publicationCount.internationalConferences} Conf.
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {student.profile.meetsMinimumRequirements ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => setSelectedStudent(student)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 p-1 rounded">
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

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
                  <p className="text-sm text-gray-500">{selectedStudent.email}</p>
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

      {/* Student Assignment Modal */}
      {showStudentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Assign New PhD Student</h2>
            </div>
            <div className="p-6">
              <StudentAssignmentForm onClose={() => setShowStudentModal(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Student Detail View Component
const StudentDetailView: React.FC<{ student: any }> = ({ student }) => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'publications', label: 'Publications', icon: FileText },
    { id: 'teaching', label: 'Teaching', icon: BookOpen },
    { id: 'awards', label: 'Awards', icon: Award }
  ];

  return (
    <div className="space-y-6">
      {/* Status Alert */}
      {student.status === 'pre_registered' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800">Pre-registration Status</h3>
              <p className="text-sm text-yellow-700 mt-1">
                This student is pre-registered pending document completion or diploma equivalence.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Minimum Requirements Alert */}
      {!student.profile.meetsMinimumRequirements && student.status === 'phd_student' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <XCircle className="w-5 h-5 text-red-600 mr-2" />
            <div>
              <h3 className="text-sm font-medium text-red-800">Minimum Requirements Not Met</h3>
              <p className="text-sm text-red-700 mt-1">
                Student needs 2 indexed journal articles OR 1 indexed journal + 2 international conferences to defend.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-gray-500">Enrollment Year</label>
                  <p className="text-sm text-gray-900">{student.enrollmentYear}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <p className="text-sm text-gray-900">{getStatusLabel(student.status)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Documents Complete</label>
                  <p className="text-sm text-gray-900">{student.documentsComplete ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Has Equivalence</label>
                  <p className="text-sm text-gray-900">{student.hasEquivalence ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Academic Assignment</h3>
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-gray-500">Team</label>
                  <p className="text-sm text-gray-900">
                    {mockTeams.find(t => t.id === student.teamId)?.name || 'Not assigned'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Thesis Director</label>
                  <p className="text-sm text-gray-900">
                    {mockProfessors.find(p => p.id === student.thesisDirectorId) ? 
                      `${mockProfessors.find(p => p.id === student.thesisDirectorId)?.firstName} ${mockProfessors.find(p => p.id === student.thesisDirectorId)?.lastName}` 
                      : 'Not assigned'
                    }
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Thesis Subject</label>
                  <p className="text-sm text-gray-900">{student.thesisSubject || 'Not defined'}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'publications' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Publications & Communications</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Publication Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Indexed Journals: </span>
                    <span className="font-medium">{student.profile.publicationCount.indexedJournals}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">International Conferences: </span>
                    <span className="font-medium">{student.profile.publicationCount.internationalConferences}</span>
                  </div>
                </div>
              </div>
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p>No publications added yet</p>
                <button className="mt-2 text-blue-600 hover:text-blue-700 text-sm">
                  Add Publication
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Student Assignment Form Component
const StudentAssignmentForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    candidateId: '',
    teamId: '',
    thesisDirectorId: '',
    coDirectorId: '',
    thesisSubject: ''
  });

  const mockAcceptedCandidates = [
    { id: '1', name: 'Sara Benjelloun', email: 's.benjelloun@inpt.ac.ma' },
    { id: '2', name: 'Omar Tazi', email: 'o.tazi@inpt.ac.ma' },
    { id: '3', name: 'Laila Hamdi', email: 'l.hamdi@inpt.ac.ma' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to assign the student
    console.log('Assigning student:', formData);
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
          onChange={(e) => setFormData({ ...formData, candidateId: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Choose a candidate...</option>
          {mockAcceptedCandidates.map(candidate => (
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
          {mockTeams.map(team => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Thesis Director
        </label>
        <select
          value={formData.thesisDirectorId}
          onChange={(e) => setFormData({ ...formData, thesisDirectorId: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select director...</option>
          {mockProfessors.filter(p => p.canSupervise).map(prof => (
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
          onChange={(e) => setFormData({ ...formData, coDirectorId: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select co-director...</option>
          {mockProfessors.filter(p => p.canSupervise && p.id !== formData.thesisDirectorId).map(prof => (
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
          onChange={(e) => setFormData({ ...formData, thesisSubject: e.target.value })}
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

export default PhdProfileManagement;