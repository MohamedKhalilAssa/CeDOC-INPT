import { User, GraduationCap, FileText, BookOpen, Award } from 'lucide-react';

const StudentProfile = ({ student }: any) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {student.firstName} {student.lastName}
          </h2>
          <p className="text-gray-600">{student.email}</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            Edit Profile
          </button>
        </div>
      </div>
      
      {/* Status Alerts */}
      {student.status === 'pre_registered' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Pre-registration Status</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  This student is pre-registered pending document completion or diploma equivalence.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {!student.meetsRequirements && student.status === 'phd_student' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Minimum Requirements Not Met</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>
                  Student needs 2 indexed journal articles OR 1 indexed journal + 2 international conferences to defend.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Profile Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-gray-500" />
            Basic Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Status</label>
              <p className="mt-1 text-sm text-gray-900">
                {student.status === 'phd_student' ? 'PhD Student' : 
                 student.status === 'pre_registered' ? 'Pre-registered' : 
                 'Accepted Candidate'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Enrollment Year</label>
              <p className="mt-1 text-sm text-gray-900">{student.enrollmentYear}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Documents Complete</label>
              <p className="mt-1 text-sm text-gray-900">
                {student.documentsComplete ? 'Yes' : 'No'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Has Equivalence</label>
              <p className="mt-1 text-sm text-gray-900">
                {student.hasEquivalence ? 'Yes' : 'No'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <GraduationCap className="w-5 h-5 mr-2 text-gray-500" />
            Academic Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Research Team</label>
              <p className="mt-1 text-sm text-gray-900">
                {student.team || 'Not assigned'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Thesis Director</label>
              <p className="mt-1 text-sm text-gray-900">
                {student.director || 'Not assigned'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Thesis Subject</label>
              <p className="mt-1 text-sm text-gray-900">
                {student.thesisSubject || 'Not defined'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;