package ma.inpt.cedoc.model.entities.attestation;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Table(name = "attestation")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type_attestation", discriminatorType = DiscriminatorType.STRING)
@DiscriminatorValue("DEFAULT")
public class Attestation {

    @Id
    @GeneratedValue
    private long id;

    @Column(name = "url", nullable = false)
    private String url;

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
