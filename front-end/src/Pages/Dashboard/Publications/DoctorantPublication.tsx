import { FileText, Plus, CheckCircle, XCircle, Clock } from 'lucide-react';

const Publications = ({ student }: any) => {
  const mockPublications = [
    {
      id: '1',
      type: 'journal',
      title: 'Deep Learning for Medical Image Analysis',
      date: '2023-05-15',
      authors: 'Y. Benali, M. Tahiri, A. Mansouri',
      status: 'validated'
    },
    {
      id: '2',
      type: 'conference',
      title: 'Neural Networks in Healthcare Applications',
      date: '2023-09-20',
      authors: 'Y. Benali, M. Tahiri',
      status: 'pending'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Publications</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Publication
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900">Publication Summary</h3>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800">Indexed Journals</p>
              <p className="text-2xl font-semibold text-blue-900">
                {student.publications.journals}
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-green-800">International Conferences</p>
              <p className="text-2xl font-semibold text-green-900">
                {student.publications.conferences}
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {mockPublications.map((pub) => (
            <div key={pub.id} className="border rounded-lg p-4">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium">{pub.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {pub.type === 'journal' ? 'Journal Article' : 'Conference Paper'} | {pub.date} | {pub.authors}
                  </p>
                </div>
                <div>
                  {pub.status === 'validated' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" /> Validated
                    </span>
                  )}
                  {pub.status === 'pending' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <Clock className="w-3 h-3 mr-1" /> Pending
                    </span>
                  )}
                  {pub.status === 'rejected' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <XCircle className="w-3 h-3 mr-1" /> Rejected
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 flex justify-end space-x-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  View Details
                </button>
                <button className="text-gray-600 hover:text-gray-800 text-sm">
                  Download Proof
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Publications;