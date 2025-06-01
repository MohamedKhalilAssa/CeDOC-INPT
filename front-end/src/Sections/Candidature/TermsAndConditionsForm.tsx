import { UseFormReturn } from "react-hook-form";

interface TermsAndConditionsFormProps {
  form: UseFormReturn<any>;
  agreementChecked: boolean;
  setAgreementChecked: (value: boolean) => void;
}

const TermsAndConditionsForm = ({
  form,
  agreementChecked,
  setAgreementChecked,
}: TermsAndConditionsFormProps) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold text-blue-600 flex items-center mb-4">
        <span className="mr-2">
          <i className="fas fa-shield-alt text-blue-600"></i>
        </span>
        Termes et Conditions
      </h3>

      <div className="mb-4 p-4 border border-gray-200 rounded-md">
        <div className="mb-4 font-medium">Accord du Candidat</div>
        <p className="text-sm text-gray-600 mb-2">
          En soumettant cette candidature, vous acceptez que :
        </p>
        <ul className="text-sm text-gray-600 list-disc pl-5 mb-4">
          <li>Toutes les informations fournies sont exactes et complètes</li>
          <li>Vous avez lu et accepté les conditions de candidature</li>
          <li>
            Vos données personnelles puissent être traitées conformément à notre
            politique de confidentialité
          </li>
        </ul>

        <div className="flex items-center">
          <input
            id="terms"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            checked={agreementChecked}
            {...register("termsAgreement", {
              required: "Vous devez accepter les termes et conditions",
              onChange: (e) => {
                setAgreementChecked(e.target.checked);
              },
            })}
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
            J'accepte les termes et conditions
          </label>
        </div>
        {errors.termsAgreement && (
          <p className="mt-1 text-sm text-red-600">
            {errors.termsAgreement &&
            typeof errors.termsAgreement.message === "string"
              ? errors.termsAgreement.message
              : null}
          </p>
        )}
      </div>
    </div>
  );
};

export default TermsAndConditionsForm;
