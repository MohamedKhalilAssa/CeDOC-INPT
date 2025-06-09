package ma.inpt.cedoc.model.DTOs.Attestation;

import lombok.Data;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;

@Data
public class AttestationRequestDTO {

    private Doctorant doctorant;
}
