package ma.inpt.cedoc.model.entities.formation;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.enums.formation_enums.ModuleEnum;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.ZonedDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Table(name = "formations")
public class Formation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    /* diagram: Module (enum) */
    @Enumerated(EnumType.STRING)
    @NotNull
    private ModuleEnum module;

    @NotBlank
    private String intitule;

    @NotBlank
    private String nomFormateur;

    @NotBlank
    private String dateDebut;          // ISO‑8601 preferred; change to LocalDate if you can

    private Integer duree;             // en heures

    private String lieu;               // nullable si distance

    private Boolean distanciel;        // true = distanciel



    //    for logging and administration purposes it will be filled by the system
    @Column(name="created_at", updatable = false)
    @CreatedDate
    private ZonedDateTime createdAt;

    @Column(name="updated_at")
    @LastModifiedDate
    private ZonedDateTime updatedAt;

    // ---------------------- Relations ----------------------------
    @OneToMany(mappedBy = "formation",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<SeanceFormation> seanceFormationList;

    @OneToMany(mappedBy = "formation")
    private List<Propose> propositions;

}
