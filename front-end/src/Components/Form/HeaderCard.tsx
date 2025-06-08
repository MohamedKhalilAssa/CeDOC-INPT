type HeaderCardProps = {
  title: string;
  description: string;
  icon?: string;
};

export const HeaderCard = ({ title, description, icon = "fa-lightbulb" }: HeaderCardProps) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
    <div className="flex items-start space-x-4">
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
        <i className={`fas ${icon} text-blue-600 text-xl`}></i>
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  </div>
);
