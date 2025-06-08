import { FileText, CheckCircle, XCircle, Clock, Upload } from 'lucide-react';

const Documents = ({ student }: any) => {
  const mockDocuments = [
    {
      id: '1',
      name: 'Diploma',
      status: 'validated',
      date: '2023-01-15'
    },
    {
      id: '2',
      name: 'Transcript',
      status: 'validated',
      date: '2023-01-20'
    },
    {
      id: '3',
      name: 'Equivalence Certificate',
      status: student.hasEquivalence ? 'validated' : 'missing',
      date: student.hasEquivalence ? '2023-02-10' : ''
    },
    {
      id: '4',
      name: 'Research Proposal',
      status: 'pending',
      date: '2023-05-05'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'validated': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'missing': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Documents</h2>
      
      {student.status === 'pre_registered' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Documents Incomplete</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  {student.hasEquivalence 
                    ? 'Some required documents are missing or not validated.' 
                    : 'Diploma equivalence certificate is missing.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="space-y-4">
          {mockDocuments.map((doc) => (
            <div key={doc.id} className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="font-medium">{doc.name}</p>
                {doc.date && (
                  <p className="text-sm text-gray-500">
                    Submitted: {doc.date}
                  </p>
                )}
              </div>
              
              <div className="flex items-center">
                {getStatusIcon(doc.status)}
                <span className="ml-2 text-sm">
                  {doc.status === 'validated' && 'Validated'}
                  {doc.status === 'pending' && 'Pending Validation'}
                  {doc.status === 'missing' && 'Missing'}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <label className="cursor-pointer flex flex-col items-center">
            <Upload className="w-10 h-10 mb-2 text-gray-400" />
            <span className="text-sm font-medium">Upload New Document</span>
            <input type="file" className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Documents;