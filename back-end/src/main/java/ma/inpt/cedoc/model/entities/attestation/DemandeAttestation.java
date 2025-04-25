package ma.inpt.cedoc.model.entities.attestation;

import java.sql.Date;
import java.time.ZonedDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import ma.inpt.cedoc.model.enums.doctorant_enums.StatutAttestationEnum;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Table(name = "demande_attestion")
public class DemandeAttestation {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "date_demande")
    @NonNull
    private Date dateDemande;

    @Column(name = "statut_demande_att")
    @Enumerated(EnumType.STRING)
    private StatutAttestationEnum statutDemandeAttestation;

    /* Relations start here */
    @ManyToOne
    @JoinColumn(name = "attestation_id")
    private Attestation attestation;

    @ManyToOne
    @JoinColumn(name = "doctorant_id")
    private Doctorant doctorant;

    /* Relations end here */

    /* Auditing */
    @Column(name = "created_at", updatable = false)
    @CreatedDate
    private ZonedDateTime createdAt;

    @Column(name = "updated_at", updatable = false)
    @CreatedDate
    private ZonedDateTime updatedAt;

}
