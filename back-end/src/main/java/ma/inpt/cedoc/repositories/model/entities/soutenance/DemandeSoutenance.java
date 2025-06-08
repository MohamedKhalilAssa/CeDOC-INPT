package ma.inpt.cedoc.repositories.model.entities.soutenance;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.repositories.model.entities.utilisateurs.DirecteurDeTheseRole;
import ma.inpt.cedoc.repositories.model.entities.utilisateurs.DirectionCedoc;
import ma.inpt.cedoc.repositories.model.enums.doctorant_enums.DemandeSoutenanceEnum;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "demandes_soutenances")
@EntityListeners(AuditingEntityListener.class)
public class DemandeSoutenance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le mémoire de thèse est obligatoire")
    @Column(name = "memoire_de_these")
    private String memoireDeThese;

    @NotNull(message = "Le statut de la demande est obligatoire")
    @Enumerated(EnumType.STRING)
    @Column(name = "statut_demande")
    private DemandeSoutenanceEnum statutDemande;

    // for logging and administration purposes it will be filled by the system
    @Column(name = "created_at", updatable = false)
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "directeur_role_id")
    private DirecteurDeTheseRole directeurDeThese;

    @OneToOne
    @JoinColumn(name = "soutenance_id")
    private Soutenance soutenance;

    @ManyToOne
    @JoinColumn(name = "direction_cedoc_id")
    private DirectionCedoc directionCedoc;
}
