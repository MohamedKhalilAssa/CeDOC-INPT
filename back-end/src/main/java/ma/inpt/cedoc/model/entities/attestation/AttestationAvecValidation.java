package ma.inpt.cedoc.model.entities.attestation;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.enums.doctorant_enums.EtatAttestationEnum;
import ma.inpt.cedoc.model.enums.doctorant_enums.TypeAttestationValidationEnum;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "att_avec_val")
public class AttestationAvecValidation extends Attestation {

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private TypeAttestationValidationEnum typeAttestationValidation;

    @Column(name = "etat")
    @Enumerated(EnumType.STRING)
    private EtatAttestationEnum etatAttestation;

}
