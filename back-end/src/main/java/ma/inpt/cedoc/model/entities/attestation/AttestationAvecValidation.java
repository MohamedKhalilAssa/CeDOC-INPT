package ma.inpt.cedoc.model.entities.attestation;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import ma.inpt.cedoc.model.enums.doctorant_enums.EtatAttestationEnum;
import ma.inpt.cedoc.model.enums.doctorant_enums.TypeAttestationValidationEnum;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("AVEC_VALIDATION")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class AttestationAvecValidation extends Attestation {

    @OneToOne
    @JoinColumn(name = "doctorant")
    @JsonBackReference
    private Doctorant doctorant;

    @Column(name = "type_attestation_validation")
    @Enumerated(EnumType.STRING)
    private TypeAttestationValidationEnum typeAttestationValidation;

    @Column(name = "etat_attestation_validation")
    @Enumerated(EnumType.STRING)
    private EtatAttestationEnum etatAttestation = EtatAttestationEnum.EN_ATTENTE;

}
