package ma.inpt.cedoc.model.entities.attestation;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import org.springframework.data.annotation.CreatedDate;

import java.time.ZonedDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "attestation")
public class Attestation {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "url", nullable = false)
    private String url;

    @OneToMany(
            mappedBy = "attestation_id"
    )
    private List<DemandeAttestation> demandeAttestations;

    @Column(name = "created_at", updatable = false)
    @CreatedDate
    private ZonedDateTime createdAt;

    @Column(name = "updated_at", updatable = false)
    @CreatedDate
    private ZonedDateTime updatedAt;
}
