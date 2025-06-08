package ma.inpt.cedoc.repositories.model.entities.formation;

import java.time.ZonedDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.repositories.model.entities.utilisateurs.Doctorant;
import ma.inpt.cedoc.repositories.model.entities.utilisateurs.ResponsableDeFormationRole;
import ma.inpt.cedoc.repositories.model.enums.formation_enums.StatutFormationEnum;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "seances_formations")
public class SeanceFormation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer duree; // durée en minutes ou heures ? (INT in diagram)

    /*lien du justificatif PDF */
    @NotBlank
    @Pattern(regexp = "^.+\\.pdf$", message = "Le justificatif doit être un fichier PDF")
    private String justificatifPdf;

    @Enumerated(EnumType.STRING)
    @NotNull
    private StatutFormationEnum statut; // DÉCLARÉE | VALIDÉE | REFUSÉE

    /* Audit */
    @CreatedDate
    @Column(updatable = false)
    private ZonedDateTime createdAt;

    @LastModifiedDate
    private ZonedDateTime updatedAt;

    // ---------------------- Relations ----------------------------

    @ManyToOne
    @JoinColumn(name = "formation_id", nullable = false)
    private Formation formation;

    @ManyToOne(optional = false) // déclare
    @JoinColumn(name = "doctorant_id")
    private Doctorant declarant; // 1 doctorant → * séances

    @ManyToOne(optional = false) // valide
    @JoinColumn(name = "responsable_id")
    private ResponsableDeFormationRole validePar; // 1 resp.→ * séances

}
