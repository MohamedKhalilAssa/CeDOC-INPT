package ma.inpt.cedoc.model.DTOs.Attestation;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import ma.inpt.cedoc.model.enums.doctorant_enums.StatutAttestationEnum;
import ma.inpt.cedoc.model.enums.doctorant_enums.TypeAttestationValidationEnum;

@Data
@Builder
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
public class AttestationAvecValidationRequestDTO extends AttestationRequestDTO {

    @NotNull(message = "il faut ajouter le doctorant")
    private Doctorant doctorant;

    @NotNull(message = "le type d'attestatioin est obligatoire")
    private TypeAttestationValidationEnum typeAttestationValidation;

    private StatutAttestationEnum statutAttestation = StatutAttestationEnum.NECESSITE_VALIDATION;
}
