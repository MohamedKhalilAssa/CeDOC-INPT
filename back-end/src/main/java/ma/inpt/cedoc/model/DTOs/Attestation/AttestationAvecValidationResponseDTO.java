package ma.inpt.cedoc.model.DTOs.Attestation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import ma.inpt.cedoc.model.enums.doctorant_enums.EtatAttestationEnum;
import ma.inpt.cedoc.model.enums.doctorant_enums.StatutAttestationEnum;
import ma.inpt.cedoc.model.enums.doctorant_enums.TypeAttestationValidationEnum;

@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class AttestationAvecValidationResponseDTO extends AttestationResponseDTO {

    private StatutAttestationEnum statutAttestation;

    private TypeAttestationValidationEnum typeAttestation;

    private EtatAttestationEnum etatAttestation;

}
