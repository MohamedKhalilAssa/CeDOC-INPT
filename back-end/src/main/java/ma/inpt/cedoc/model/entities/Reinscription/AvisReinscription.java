package ma.inpt.cedoc.model.entities.Reinscription;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.entities.utilisateurs.DirecteurDeThese;
import ma.inpt.cedoc.model.enums.reinscription_enums.AvancementEnum;
import ma.inpt.cedoc.model.enums.reinscription_enums.AvisEnum;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "avis_reinscriptions")
public class AvisReinscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "L'observation de AvisReinscription est obligatoire")
    private String observation;

    @NotNull(message = "L'état d'avancement est obligatoire")
    private AvancementEnum etatAvancement;

    @NotNull(message = "L'avis final est obligatoire")
    private AvisEnum avisFinal;

    @OneToOne
    @JoinColumn(name = "demandeReinscription_id")
    private DemandeReinscription demandeReinscription;

    @ManyToOne
    @JoinColumn(name = "directeur_these_id")
    private DirecteurDeThese directeurDeThese;
}
