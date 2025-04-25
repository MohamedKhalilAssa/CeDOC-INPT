package ma.inpt.cedoc.model.entities.attestation;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import ma.inpt.cedoc.model.enums.doctorant_enums.StatutAttestationEnum;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.sql.Date;
import java.time.ZonedDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Table(name = "att_demande")
public class DemandeAttestation {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "date_demande")
    @NonNull
    private Date dateDemande;

    @Column(name = "statut_demande-att")
    @Enumerated(EnumType.STRING)
    private StatutAttestationEnum statutDemandeAttestation;

    @ManyToOne
    @JoinColumn(name = "attestation_id")
    private Attestation attestation;

    @ManyToOne
    @JoinColumn(name = "doctorant_id")
    private Doctorant doctorant;

    @Column(name = "created_at", updatable = false)
    @CreatedDate
    private ZonedDateTime createdAt;

    @Column(name = "updated_at", updatable = false)
    @CreatedDate
    private ZonedDateTime updatedAt;

}
