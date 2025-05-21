import ProgressSteps from "@/Components/Ui/ProgressSteps";

interface FormStepperProps {
  currentStep: number;
  steps: { id: number; name: string }[];
}

const FormStepper = ({ currentStep, steps }: FormStepperProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
        Inscription du Candidat
      </h1>
      <h2 className="text-center text-gray-600 mb-6">
        Étape {currentStep} sur {steps.length} -{" "}
        {steps.find((step) => step.id === currentStep)?.name}
      </h2>

      <ProgressSteps steps={steps} currentStep={currentStep} />
    </div>
  );
};

export default FormStepper;
