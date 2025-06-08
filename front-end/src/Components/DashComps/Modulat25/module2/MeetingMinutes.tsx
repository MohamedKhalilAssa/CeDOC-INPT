import { FileText, Download, Upload } from 'lucide-react';

const MeetingMinutes = ({ student }: any) => {
  const hasMinutes = student.status === 'phd_student';
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Meeting Minutes</h2>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {hasMinutes ? (
          <div className="flex flex-col items-center text-center py-8">
            <FileText className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Admission Meeting Minutes</h3>
            <p className="text-gray-600 mt-1">
              Signed PV from the admission committee meeting
            </p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Download Minutes
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center py-8">
            <FileText className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No Meeting Minutes Available</h3>
            <p className="text-gray-600 mt-1">
              The admission committee meeting minutes will be uploaded after the interview process
            </p>
            <button className="mt-4 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center">
              <Upload className="w-4 h-4 mr-2" />
              Upload Minutes (Team Leader Only)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingMinutes;