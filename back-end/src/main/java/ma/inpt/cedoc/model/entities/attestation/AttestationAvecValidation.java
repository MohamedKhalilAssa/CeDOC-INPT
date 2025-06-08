package ma.inpt.cedoc.model.entities.attestation;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.enums.doctorant_enums.EtatAttestationEnum;
import ma.inpt.cedoc.model.enums.doctorant_enums.TypeAttestationValidationEnum;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("AVEC_VALIDATION")
public class AttestationAvecValidation extends Attestation {

    @Column(name = "type_attestation_validation")
    @Enumerated(EnumType.STRING)
    private TypeAttestationValidationEnum typeAttestationValidation;

    @Column(name = "etat_attestation_validation")
    @Enumerated(EnumType.STRING)
    private EtatAttestationEnum etatAttestation = EtatAttestationEnum.EN_ATTENTE;

}
