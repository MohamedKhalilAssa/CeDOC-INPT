package ma.inpt.cedoc.model.entities.soutenance;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.entities.utilisateurs.DirecteurDeThese;
import ma.inpt.cedoc.model.enums.doctorant_enums.DemandeSoutenanceEnum;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "demande_soutenance")
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

    @ManyToOne
    @JoinColumn(name = "directeur_de_these_id", nullable = false)
    private DirecteurDeThese directeurDeThese;

    @OneToOne
    @JoinColumn(name = "soutenance_id")
    private Soutenance soutenance;
}
