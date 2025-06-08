import { Award, Plus } from 'lucide-react';

const Awards = ({ student }: any) => {
  const mockAwards = [
    {
      id: '1',
      name: 'Best Paper Award',
      organization: 'IEEE International Conference',
      date: '2023-06-15',
      description: 'Awarded for the paper on medical image analysis'
    },
    {
      id: '2',
      name: 'Research Excellence Scholarship',
      organization: 'Ministry of Education',
      date: '2022-09-01',
      description: 'Scholarship for outstanding PhD candidates'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Awards & Distinctions</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Award
        </button>
      </div>
      
      <div className="space-y-4">
        {mockAwards.map((award) => (
          <div key={award.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-yellow-100 p-3 rounded-lg">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{award.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {award.organization} | {award.date}
                </p>
                <p className="mt-2 text-sm text-gray-700">{award.description}</p>
                <div className="mt-3">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    View Certificate
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Awards;