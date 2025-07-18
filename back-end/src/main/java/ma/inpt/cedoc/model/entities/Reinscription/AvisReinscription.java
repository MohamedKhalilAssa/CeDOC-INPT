package ma.inpt.cedoc.model.entities.Reinscription;

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
import ma.inpt.cedoc.model.entities.utilisateurs.DirecteurDeTheseRole;
import ma.inpt.cedoc.model.enums.reinscription_enums.AvancementEnum;
import ma.inpt.cedoc.model.enums.reinscription_enums.AvisEnum;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "avis_reinscriptions")
@EntityListeners(AuditingEntityListener.class)
public class AvisReinscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "L'observation de AvisReinscription est obligatoire")
    private String observation;

    @NotNull(message = "L'état d'avancement est obligatoire")
    @Enumerated(EnumType.STRING)
    private AvancementEnum etatAvancement;

    @NotNull(message = "L'avis final est obligatoire")
    @Enumerated(EnumType.STRING)
    private AvisEnum avisFinal;

    @Column(name = "created_at", updatable = false)
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    private LocalDateTime updatedAt;

    // -------------- Relations ---------------------

    @OneToOne
    @JoinColumn(name = "demandeReinscription_id")
    private DemandeReinscription demandeReinscription;

    @ManyToOne
    @JoinColumn(name = "directeur_role_id")
    private DirecteurDeTheseRole directeurDeThese;
}
