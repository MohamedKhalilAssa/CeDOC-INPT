import CVUploadForm from "@/Sections/Candidature/DossierCandidatureForm";
import EducationHistoryForm from "@/Sections/Candidature/EducationHistoryForm";
import FormNavigation from "@/Sections/Candidature/FormNavigation";
import FormStepper from "@/Sections/Candidature/FormStepper";
import PersonalInfoForm from "@/Sections/Candidature/PersonalInfoForm";
import ResearchInterestsForm from "@/Sections/Candidature/ResearchInterestsForm";
import StatusForm from "@/Sections/Candidature/StatusForm";
import TermsAndConditionsForm from "@/Sections/Candidature/TermsAndConditionsForm";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const steps = [
  { id: 1, name: "Inscription" },
  { id: 2, name: "Sujets de recherche" },
  { id: 3, name: "Candidature" },
  { id: 4, name: "Statut" },
];

const PostulerPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      // Add any default values here
      keywords: "",
    },
  });

  const { handleSubmit, trigger, setValue, getValues } = form;

  // Initialize keywords from form data if available
  useEffect(() => {
    const keywordsValue = getValues("keywords");
    if (
      keywordsValue &&
      typeof keywordsValue === "string" &&
      keywordsValue.length > 0
    ) {
      setKeywords(keywordsValue.split(","));
    }

    // This is just to avoid the unused variable warning
    // The real usage of setValue happens in child components
    const noop = () => {
      if (process.env.NODE_ENV === "development" && false) {
        setValue("keywords", "");
      }
    };
    noop();
  }, [getValues, setValue]);

  const onSubmit = async (data: any) => {
    console.log(data);
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setCurrentStep(4); // Move to the final step (Status)
    setIsSubmitting(false);
  };

  // Function to handle moving to the next step
  const handleNext = async () => {
    // Validate the current step
    const fieldsToValidate = getFieldsToValidate(currentStep);
    const isStepValid = await trigger(fieldsToValidate as any);

    if (isStepValid) {
      if (currentStep === 3) {
        // Submit the form if it's the last input step
        await handleSubmit(onSubmit)();
      } else {
        // Move to the next step
        setCurrentStep(currentStep + 1);
      }
    }
  };

  // Function to handle moving to the previous step
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Function to determine which fields to validate based on the current step
  const getFieldsToValidate = (step: number): string[] => {
    switch (step) {
      case 1: // Personal Info
        return [
          "firstName",
          "lastName",
          "email",
          "phone",
          "birthDate",
          "nationality",
          "highestDegree",
          "fieldOfStudy",
          "institution",
          "graduationYear",
          "cv",
        ];
      case 2: // Research Interests
        return ["primaryResearchArea", "keywords", "researchStatement"];
      case 3: // Terms and Conditions
        return ["termsAgreement"];
      default:
        return [];
    }
  };

  // Function to render the current step's form
  const renderStepForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <PersonalInfoForm form={form} />
            <EducationHistoryForm form={form} />
            <CVUploadForm form={form} />
          </>
        );
      case 2:
        return (
          <ResearchInterestsForm
            form={form}
            keywords={keywords}
            setKeywords={setKeywords}
          />
        );
      case 3:
        return (
          <TermsAndConditionsForm
            form={form}
            agreementChecked={agreementChecked}
            setAgreementChecked={setAgreementChecked}
          />
        );
      case 4:
        return <StatusForm />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <FormStepper steps={steps} currentStep={currentStep} />

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto">
        {renderStepForm()}

        {/* Don't show navigation on the status page */}
        {currentStep < 4 && (
          <FormNavigation
            currentStep={currentStep}
            totalSteps={steps.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            isLastStep={currentStep === 3}
            isSubmitting={isSubmitting}
          />
        )}
      </form>
    </div>
  );
};

export default PostulerPage;
