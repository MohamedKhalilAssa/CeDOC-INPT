// PublicationCard.tsx
import Button from "@/Components/DashComps/ui/button/Button";

interface PublicationCardProps {
  titre: string;
  journal: string;
  datePublication: string;
  status: string;
  onView: () => void;
}

const PublicationCard = ({
  titre,
  journal,
  datePublication,
  status,
  onView,
}: PublicationCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-lg">{titre}</h3>
          <p className="text-gray-600">{journal}</p>
          <p className="text-sm text-gray-500 mt-1">
            Publié le: {new Date(datePublication).toLocaleDateString()}
          </p>
          <span className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${
            status === "PUBLIE" 
              ? "bg-green-100 text-green-800" 
              : "bg-yellow-100 text-yellow-800"
          }`}>
            {status}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onView}
        >
          Voir
        </Button>
      </div>
    </div>
  );
};

export default PublicationCard;