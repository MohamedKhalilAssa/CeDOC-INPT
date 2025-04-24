package ma.inpt.cedoc.model.entities.attestation;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.enums.doctorant_enums.TypeAttestationAutoEnum;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "attestation_auto")
@DiscriminatorValue("AUTOMATIQUE")
public class AttestationAutomatique extends Attestation {

    @Column(name = "type_attestation_auto")
    @Enumerated(EnumType.STRING)
    private TypeAttestationAutoEnum typeAttestationAuto;

}
