import { postFormData } from "@/Helpers/CRUDFunctions";
import { useAlert } from "@/Hooks/UseAlert";
import appConfig from "@/public/config";
import CVUploadForm from "@/Sections/Candidature/DossierCandidatureForm";
import EducationHistoryForm from "@/Sections/Candidature/EducationHistoryForm";
import FormNavigation from "@/Sections/Candidature/FormNavigation";
import FormStepper from "@/Sections/Candidature/FormStepper";
import PersonalInfoForm from "@/Sections/Candidature/PersonalInfoForm";
import ResearchInterestsForm from "@/Sections/Candidature/ResearchInterestsForm";
import StatusForm from "@/Sections/Candidature/StatusForm";
import TermsAndConditionsForm from "@/Sections/Candidature/TermsAndConditionsForm";
import { APIResponse } from "@/Types/GlobalTypes";
import { CandidatureRequestDTO } from "@/Types/UtilisateursTypes";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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
  const [globalError, setGlobalError] = useState<string | null>(null);
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
      dossierCandidature: null, // Research interests defaults
      selectedSujets: [],
      primaryResearchArea: "",
      keywords: "",
      researchStatement: "",

      // Terms defaults
      termsAgreement: false,
    },
  });
  const swal = useAlert();
  const navigate = useNavigate();
  const {
    handleSubmit,
    trigger,
    setValue,
    getValues,
    setError, // ✅ Now available
    clearErrors, // ✅ For clearing errors
  } = form;
  // Initialize keywords from form data if available
  useEffect(() => {
    // This is just to avoid the unused variable warning
    // The real usage of setValue happens in child components
  }, [getValues, setValue]);

  // Debug: Monitor current step changes and form values
  useEffect(() => {
    // console.log("Step changed to:", currentStep);
    // console.log("Form values on step change:", getValues());
  }, [currentStep, getValues]);
  const onSubmit = async (data: any) => {
    console.log("SUBMIT: ", data);
    setIsSubmitting(true);
    setGlobalError(null); // Clear previous global errors

    // Transform form data to match backend expectations
    const transformedData: CandidatureRequestDTO = {
      ...data,
      // Map selectedSujets to sujetsIds (backend expects this field name)
      sujetsIds: data.selectedSujets || [],
      // Remove selectedSujets as it's not expected by backend
    };

    // Remove undefined values
    Object.keys(transformedData).forEach(
      (key) =>
        (transformedData as any)[key] === undefined &&
        delete (transformedData as any)[key]
    );

    console.log("TRANSFORMED DATA: ", transformedData);

    // form submission using the new postFormData function
    try {
      const res: APIResponse | undefined = await postFormData(
        appConfig.API_PATHS.CANDIDATURE.postuler.path,
        transformedData
      );

      if (res) {
        swal.toast(
          res?.message || "Candidature soumise avec succès",
          "success"
        );
        setTimeout(() => {
          navigate(appConfig.FRONTEND_PATHS.GLOBAL.landingPage.path);
        }, 200);
        setCurrentStep(4); // Move to the final step (Status) only on success
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Form submission error:", err);

      if (err.errors && Array.isArray(err.errors)) {
        // Backend returned validation errors: map to form fields
        err.errors.forEach((e: { field: string; message: string }) => {
          console.log(
            "Setting error for field:",
            e.field,
            "message:",
            e.message
          );

          if (e.field === "global") {
            setGlobalError(e.message);
          } else {
            setError(e.field as any, {
              type: "server",
              message: e.message,
            });
          }
        });

        setCurrentStep(1); // Reset to first step on validation error
        swal.toast(
          "<h1>Erreur de validation</h1><p>Veuillez corriger les erreurs et réessayer</p>",
          "error"
        );
      } else {
        // General API error
        const errorMessage =
          err.message || err.errors || "Une erreur est survenue";
        setGlobalError(`Erreur de soumission: ${errorMessage}`);
        swal.error("Erreur de soumission", errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  }; // Function to handle moving to the next step
  const handleNext = async () => {
    // Clear previous errors before validation
    setGlobalError(null);

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
      // Clear errors when going back to avoid confusion
      clearStepErrors();
      setCurrentStep(currentStep - 1);
    }
  };

  // Clear errors when moving between steps
  const clearStepErrors = () => {
    clearErrors();
    setGlobalError(null);
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

      {/* Global Error Display */}
      {globalError && (
        <div className="max-w-4xl mx-auto mb-6">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Erreur de validation
                </h3>
                <div className="mt-2 text-sm text-red-700">{globalError}</div>
              </div>
              <div className="ml-auto pl-3">
                <button
                  type="button"
                  className="text-red-400 hover:text-red-600"
                  onClick={() => setGlobalError(null)}
                >
                  <span className="sr-only">Fermer</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
