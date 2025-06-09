package ma.inpt.cedoc.model.entities.attestation;

import java.time.LocalDateTime;
import java.util.List;

import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.enums.doctorant_enums.StatutAttestationEnum;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Table(name = "attestations")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type_attestation", discriminatorType = DiscriminatorType.STRING)
@DiscriminatorValue("DEFAULT")
public abstract class Attestation {

    @Id
    @GeneratedValue
    private long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut_attestation")
    private StatutAttestationEnum statutAttestation;

    @ManyToOne
    @JoinColumn(name = "doctorant")
    private Doctorant doctorant;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime dateDemande;

    @OneToMany(mappedBy = "attestation")
    private List<DemandeAttestation> demandeAttestations;

    // for logging and administration purposes it will be filled by the system
    @Column(name = "created_at", updatable = false)
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    private LocalDateTime updatedAt;
}
