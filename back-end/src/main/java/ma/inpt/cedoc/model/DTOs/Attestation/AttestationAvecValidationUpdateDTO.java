package ma.inpt.cedoc.model.DTOs.Attestation;

import lombok.Data;
import ma.inpt.cedoc.model.enums.doctorant_enums.EtatAttestationEnum;

@Data
public class AttestationAvecValidationUpdateDTO {

    private EtatAttestationEnum etatAttestation;
}
