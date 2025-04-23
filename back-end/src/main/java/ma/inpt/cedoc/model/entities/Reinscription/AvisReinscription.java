package ma.inpt.cedoc.model.entities.Reinscription;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import ma.inpt.cedoc.model.enums.reinscription_enums.AvancementEnum;
import ma.inpt.cedoc.model.enums.reinscription_enums.AvisEnum;

@Entity

public class AvisReinscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "L'observation de AvisReinscription")
    private String observation;

    @NotNull(message = "L'état d'avancement est obligatoire")
    private AvancementEnum etatAvancement;

    @NotNull(message = "L'avis final est obligatoire")
    private AvisEnum avisFinal;
}
