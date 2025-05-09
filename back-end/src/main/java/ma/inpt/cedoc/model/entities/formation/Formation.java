package ma.inpt.cedoc.model.entities.formation;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import ma.inpt.cedoc.model.entities.utilisateurs.Professeur;
import ma.inpt.cedoc.model.enums.formation_enums.ModuleEnum;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.Date;
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
        private Long id;

        @NotBlank
        private String formationName;
        /* diagram: Module (enum) */
        @Enumerated(EnumType.STRING)
        @NotNull
        private ModuleEnum module;

        private String intitule;

        @NotBlank
        private String nomFormateur;

        @NotNull
        private LocalDate dateDebut;          // ISO‑8601 preferred; change to LocalDate if you can

        private Integer duree; // en heures

        private String lieu; // peut etre distanciel

        // for logging and administration purposes it will be filled by the system
        @Column(name = "created_at", updatable = false)
        @CreatedDate
        private LocalDateTime createdAt;

        @Column(name = "updated_at")
        @LastModifiedDate
        private LocalDateTime updatedAt;

        // ---------------------- Relations ----------------------------
        @OneToMany(mappedBy = "formation", cascade = CascadeType.ALL, orphanRemoval = true)
        private List<SeanceFormation> seanceFormationList;

        @ManyToOne
        private Professeur professeur;

        @ManyToMany
        @JoinTable(
                name = "doctorant_formation",
                joinColumns = @JoinColumn(name = "formation_id"),
                inverseJoinColumns = @JoinColumn(name = "doctorant_id")
        )
        @Column(name = "doctorants_cibles")
        private List<Doctorant> doctorantsCibles;

}
