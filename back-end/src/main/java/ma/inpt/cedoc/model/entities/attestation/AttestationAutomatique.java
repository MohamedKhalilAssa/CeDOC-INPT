package ma.inpt.cedoc.model.entities.attestation;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import ma.inpt.cedoc.model.enums.doctorant_enums.TypeAttestationAutoEnum;

@Entity
@Data
@Builder
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("AUTOMATIQUE")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class AttestationAutomatique extends Attestation {

    @OneToOne
    @JoinColumn(name = "doctorant_utilisateur_id")
    @JsonBackReference
    private Doctorant doctorant;

    @Column(name = "type_attestation_auto")
    @Enumerated(EnumType.STRING)
    private TypeAttestationAutoEnum typeAttestationAutomatique;

}
