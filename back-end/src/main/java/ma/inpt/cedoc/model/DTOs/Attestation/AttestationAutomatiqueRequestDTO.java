package ma.inpt.cedoc.model.DTOs.Attestation;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import ma.inpt.cedoc.model.enums.doctorant_enums.TypeAttestationAutoEnum;

@Data
public class AttestationAutomatiqueRequestDTO {

    @NotNull(message = "le type d'attestatioin est obligatoire")
    private TypeAttestationAutoEnum typeAttestationAutomatique;
}
