const StatusForm = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold text-blue-600 flex items-center mb-4">
        <span className="mr-2">
          <i className="fas fa-clipboard-check text-blue-600"></i>
        </span>
        Statut de la Candidature
      </h3>

      <div className="p-4 bg-green-50 border border-green-200 rounded-md">
        <div className="flex items-center mb-4">
          <i className="fas fa-check-circle h-8 w-8 text-green-500 mr-3 text-2xl"></i>
          <div>
            <h4 className="font-semibold text-green-700">
              Candidature Soumise avec Succès
            </h4>
            <p className="text-sm text-green-600">
              Votre candidature a été reçue et est en cours d'examen.
            </p>
          </div>
        </div>

        <div className="border-t border-green-200 pt-4 mt-4">
          <h5 className="font-medium text-gray-700 mb-2">
            Prochaines étapes :
          </h5>
          <ol className="list-decimal pl-5 text-sm text-gray-600 space-y-2">
            <li>
              Notre équipe examinera votre dossier (délai habituel : 2-3
              semaines)
            </li>
            <li>
              Vous recevrez une notification par email concernant l'état de
              votre candidature
            </li>
            <li>
              Si votre candidature est présélectionnée, vous serez invité à un
              entretien
            </li>
          </ol>
        </div>

        <div className="mt-6 text-sm text-gray-600">
          <p>
            Si vous avez des questions, veuillez contacter notre équipe à{" "}
            <a
              href="mailto:admissions@cedoc.ma"
              className="text-blue-600 hover:underline"
            >
              admissions@cedoc.ma
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatusForm;
