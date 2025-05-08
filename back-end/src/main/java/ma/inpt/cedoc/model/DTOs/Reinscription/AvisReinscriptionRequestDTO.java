package ma.inpt.cedoc.model.DTOs.Reinscription;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.enums.reinscription_enums.AvancementEnum;
import ma.inpt.cedoc.model.enums.reinscription_enums.AvisEnum;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AvisReinscriptionRequestDTO {
    private String observation;

    private AvancementEnum etatAvancement;

    private AvisEnum avisFinal;

    private Long demandeReinscriptionId;
}
