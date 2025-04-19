package ma.inpt.cedoc.model.entities.soutenance;

import java.time.LocalDate;

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

    @ManyToOne
    @JoinColumn(name = "directeur_de_these_id", nullable = false)
    private DirecteurDeThese directeurDeThese;

}
