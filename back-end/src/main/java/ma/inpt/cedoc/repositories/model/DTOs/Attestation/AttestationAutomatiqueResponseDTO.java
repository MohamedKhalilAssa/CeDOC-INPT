package ma.inpt.cedoc.repositories.model.DTOs.Attestation;

import lombok.*;
import lombok.experimental.SuperBuilder;
import ma.inpt.cedoc.repositories.model.enums.doctorant_enums.TypeAttestationAutoEnum;

@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class AttestationAutomatiqueResponseDTO extends AttestationResponseDTO {

    private TypeAttestationAutoEnum typeAttestationAutomatique;

}
