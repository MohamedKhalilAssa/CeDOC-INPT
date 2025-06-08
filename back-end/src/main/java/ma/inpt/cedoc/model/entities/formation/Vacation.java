package ma.inpt.cedoc.model.entities.formation;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import ma.inpt.cedoc.model.enums.formation_enums.StatutFormationEnum;
import ma.inpt.cedoc.model.enums.formation_enums.StatutVacationEnum;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.Date;

@Entity
@Table(name = "vacations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Vacation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String titreDuCours;

    @NotBlank
    private String etablissement;

    @NotNull
    private LocalDate date;      // diagram: Date

    @NotBlank
    private String niveau;

    private Integer duree;                 // durée en heures (INT)

    /*Justificatif (lien ou nom de fichier)*/
    private String justificatif;

    @Enumerated(EnumType.STRING)
    @NotNull
    private StatutVacationEnum statut;    // DÉCLARÉE | VALIDÉE | REFUSÉE

    /*Audit*/
    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    // ---------------------- Relations ----------------------------
    @ManyToOne(optional = false)                 // 1 doctorant → * vacations optional = false ⇢ la vacation doit toujours être rattachée à un doctorant.
    @JoinColumn(name = "doctorant_id")
    private Doctorant doctorant;
}
