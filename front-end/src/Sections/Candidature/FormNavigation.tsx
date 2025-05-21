interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  isLastStep: boolean;
  isSubmitting: boolean;
}

const FormNavigation = ({
  currentStep,
  onPrevious,
  onNext,
  isLastStep,
  isSubmitting,
}: FormNavigationProps) => {
  return (
    <div className="flex justify-between mt-8">
      {currentStep > 1 ? (
        <button
          type="button"
          onClick={onPrevious}
          className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Précédent
        </button>
      ) : (
        <button
          type="button"
          className="py-2 px-4 border border-gray-300 cursor-pointer rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sauvegarder en brouillon
        </button>
      )}

      <button
        type="button"
        onClick={onNext}
        disabled={isSubmitting}
        className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isLastStep ? "Soumettre" : "Continuer"}
      </button>
    </div>
  );
};

export default FormNavigation;
