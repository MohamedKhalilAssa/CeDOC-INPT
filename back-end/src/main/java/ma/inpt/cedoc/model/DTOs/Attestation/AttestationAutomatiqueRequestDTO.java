package ma.inpt.cedoc.model.DTOs.Attestation;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import ma.inpt.cedoc.model.enums.doctorant_enums.StatutAttestationEnum;
import ma.inpt.cedoc.model.enums.doctorant_enums.TypeAttestationAutoEnum;

@Builder
@Data
@EqualsAndHashCode(callSuper = true)
public class AttestationAutomatiqueRequestDTO extends AttestationRequestDTO {

    @NotNull
    private Doctorant doctorant;

    @NotNull(message = "le type d'attestatioin est obligatoire")
    private TypeAttestationAutoEnum typeAttestationAutomatique;

    private StatutAttestationEnum statutAttestation = StatutAttestationEnum.AUTOMATIQUE;

}
