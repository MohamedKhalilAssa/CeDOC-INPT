interface ProgressStepsProps {
  steps: { id: number; name: string }[];
  currentStep: number;
}

const ProgressSteps = ({ steps, currentStep }: ProgressStepsProps) => {
  return (
    <div className="flex items-center justify-center my-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          {/* Step circle */}
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step.id <= currentStep
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {step.id}
          </div>

          {/* Step label */}
          <div className="hidden sm:block ml-2 mr-8 text-sm">{step.name}</div>

          {/* Connector line */}
          {index < steps.length - 1 && (
            <div
              className={`w-12 h-1 ${
                step.id < currentStep ? "bg-blue-600" : "bg-gray-300"
              } mr-4`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressSteps;
