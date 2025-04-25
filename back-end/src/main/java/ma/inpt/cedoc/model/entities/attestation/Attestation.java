package ma.inpt.cedoc.model.entities.attestation;

import java.time.ZonedDateTime;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
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
<<<<<<< HEAD
    private Long id;
=======
    private long id;
>>>>>>> 594332442f0ab8c62878fd12f9e1d5ca2e87dc37

    @Column(name = "url", nullable = false)
    private String url;

    @OneToMany(mappedBy = "attestation_id")
    private List<DemandeAttestation> demandeAttestations;

    @Column(name = "created_at", updatable = false)
    @CreatedDate
    private ZonedDateTime createdAt;

    @Column(name = "updated_at", updatable = false)
    @CreatedDate
    private ZonedDateTime updatedAt;
}
