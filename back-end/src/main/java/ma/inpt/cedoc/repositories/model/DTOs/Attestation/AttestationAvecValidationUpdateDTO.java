package ma.inpt.cedoc.repositories.model.DTOs.Attestation;

import lombok.Data;
import ma.inpt.cedoc.repositories.model.enums.doctorant_enums.EtatAttestationEnum;

@Data
public class AttestationAvecValidationUpdateDTO {

    private EtatAttestationEnum etatAttestation;
}
