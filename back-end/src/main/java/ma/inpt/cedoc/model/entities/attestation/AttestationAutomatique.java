package ma.inpt.cedoc.model.entities.attestation;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.enums.doctorant_enums.TypeAttestationAutoEnum;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "att_auto")
public class AttestationAutomatique extends Attestation {

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private TypeAttestationAutoEnum typeAttestationAuto;

}
