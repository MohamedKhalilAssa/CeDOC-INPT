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
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const form = useForm({
    mode: "onTouched", // Validate after field is touched/blurred
    defaultValues: {
      // Personal Info defaults
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      genre: "",
      etatCivilEnum: "",
      dateNaissance: null,
      nationaliteId: "",
      lieuDeNaissanceId: "",

      // Education defaults
      diplome: "",
      typeEtablissement: "",
      mentionDiplome: "",
      mentionBac: "",
      specialite: "",
      intitulePFE: "",

      // File upload defaults
      dossierCandidature: null,

      // Research interests defaults
      primaryResearchArea: "",
      keywords: "",
      researchStatement: "",

      // Terms defaults
      termsAgreement: false,
    },
  });

  const { handleSubmit, trigger, setValue, getValues, control } = form;
  // Initialize keywords from form data if available
  useEffect(() => {
    // This is just to avoid the unused variable warning
    // The real usage of setValue happens in child components
  }, [getValues, setValue]);

  // Debug: Monitor current step changes and form values
  useEffect(() => {
    console.log("Step changed to:", currentStep);
    console.log("Form values on step change:", getValues());
  }, [currentStep, getValues]);

  const onSubmit = async (data: any) => {
    console.log(data);
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setCurrentStep(4); // Move to the final step (Status)
    setIsSubmitting(false);
  }; // Function to handle moving to the next step
  const handleNext = async () => {
    // Debug: Log current form values
    console.log("Current form values before validation:", getValues());

    // Get the fields to validate for the current step
    const fieldsToValidate = getFieldsToValidate(currentStep);

    // Validate the current step's fields
    const isStepValid = await trigger(fieldsToValidate as any);

    if (!isStepValid) {
      // If validation fails, don't proceed to next step
      console.log("Validation failed for step", currentStep);
      return;
    }

    console.log("Step", currentStep, "validation passed");

    // Mark current step as completed
    setCompletedSteps((prev) => new Set([...prev, currentStep]));

    if (currentStep === 3) {
      // Final submission - validate all steps and submit
      const allFields = getFieldsToValidate(1)
        .concat(getFieldsToValidate(2))
        .concat(getFieldsToValidate(3));

      const isFormValid = await trigger(allFields as any);

      if (isFormValid) {
        await handleSubmit(onSubmit)();
      }
    } else {
      // Move to the next step
      setCurrentStep(currentStep + 1);
    }
  }; // Function to handle moving to the previous step
  const handlePrevious = () => {
    if (currentStep > 1) {
      // Debug: Log current form values when going back
      console.log("Going back from step", currentStep, "to", currentStep - 1);
      console.log("Current form values:", getValues());

      // Don't clear errors when going back - let user see what needs fixing
      setCurrentStep(currentStep - 1);
    }
  };

  // Function to determine which fields to validate based on the current step
  const getFieldsToValidate = (step: number): string[] => {
    switch (step) {
      case 1: // Personal Info
        return [
          "nom",
          "prenom",
          "email",
          "telephone",
          "genre",
          "etatCivilEnum",
          "dateNaissance",
          "nationaliteId",
          "lieuDeNaissanceId",
          "diplome",
          "typeEtablissement",
          "mentionDiplome",
          "mentionBac",
          "specialite",
          "intitulePFE",
          "dossierCandidature",
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
        return <ResearchInterestsForm form={form} />;
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
