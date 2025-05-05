package ma.inpt.cedoc.model.DTOs.Attestation;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import ma.inpt.cedoc.model.enums.doctorant_enums.TypeAttestationValidationEnum;

@Data
public class AttestationAvecValidationRequestDTO {

    @NotNull(message = "le type d'attestatioin est obligatoire")
    private TypeAttestationValidationEnum typeAttestationValidation;
}
