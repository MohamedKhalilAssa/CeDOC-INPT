package ma.inpt.cedoc.model.entities.attestation;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;

import lombok.*;
import ma.inpt.cedoc.model.enums.doctorant_enums.StatutAttestationEnum;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.*;

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

    @Column(name = "url", nullable = true)
    private String url;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut_attestation")
    private StatutAttestationEnum statutAttestation;

    @Column(name = "doctorant_id")
    private Long doctorantId;

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
