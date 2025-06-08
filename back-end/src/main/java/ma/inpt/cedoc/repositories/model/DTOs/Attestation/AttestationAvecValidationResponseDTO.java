package ma.inpt.cedoc.repositories.model.DTOs.Attestation;

import lombok.*;
import lombok.experimental.SuperBuilder;
import ma.inpt.cedoc.repositories.model.enums.doctorant_enums.EtatAttestationEnum;
import ma.inpt.cedoc.repositories.model.enums.doctorant_enums.TypeAttestationValidationEnum;

@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class AttestationAvecValidationResponseDTO extends AttestationResponseDTO {

    private TypeAttestationValidationEnum typeAttestationValidation;

    private EtatAttestationEnum etatAttestation;

}
