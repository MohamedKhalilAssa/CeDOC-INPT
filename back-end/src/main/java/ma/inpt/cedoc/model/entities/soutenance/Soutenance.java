package ma.inpt.cedoc.model.entities.soutenance;

import java.time.LocalDate;
import java.time.ZonedDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.entities.utilisateurs.DirecteurDeThese;
import ma.inpt.cedoc.model.enums.doctorant_enums.StatutSoutenanceEnum;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Table(name = "Soutenance")
public class Soutenance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @FutureOrPresent(message = "La date de soutenance doit être aujourd'hui ou dans le futur")
    @Column(name = "date_soutenance")
    private LocalDate dateSoutenance;

    @NotBlank(message = "Le lieu de soutenance est obligatoire")
    @Column(name = "location")
    private String location;

    @NotNull(message = "Le statut de la soutenance est obligatoire")
    @Enumerated(EnumType.STRING)
    @Column(name = "statut_soutenance")
    private StatutSoutenanceEnum statutSoutenance;

    //    for logging and administration purposes it will be filled by the system
    @Column(name="created_at", updatable = false)
    @CreatedDate
    private ZonedDateTime createdAt;

    @Column(name="updated_at")
    @LastModifiedDate
    private ZonedDateTime updatedAt;

    @OneToOne(mappedBy = "soutenance")
    private DemandeSoutenance demandeSoutenance;
}
