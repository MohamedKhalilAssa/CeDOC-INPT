package ma.inpt.cedoc.model.DTOs.Attestation;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import ma.inpt.cedoc.model.enums.doctorant_enums.StatutAttestationEnum;
import ma.inpt.cedoc.model.enums.doctorant_enums.TypeAttestationValidationEnum;

@Data
@EqualsAndHashCode(callSuper = true)
public class AttestationAvecValidationRequestDTO extends AttestationRequestDTO {

    @NotNull(message = "L'URL est obligatoire")
    private String url;

    @NotNull(message = "le type d'attestatioin est obligatoire")
    private TypeAttestationValidationEnum typeAttestationValidation;

    private StatutAttestationEnum statutAttestation = StatutAttestationEnum.NECESSITE_VALIDATION;
}
