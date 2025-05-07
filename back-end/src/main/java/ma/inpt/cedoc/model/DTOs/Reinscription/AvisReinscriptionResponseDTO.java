package ma.inpt.cedoc.model.DTOs.Reinscription;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Generic.BaseResponseDTO;
import ma.inpt.cedoc.model.enums.reinscription_enums.AvancementEnum;
import ma.inpt.cedoc.model.enums.reinscription_enums.AvisEnum;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AvisReinscriptionResponseDTO extends BaseResponseDTO {

    private String observation;

    private AvancementEnum etatAvancement;

    private AvisEnum avisFinal;

    private Long demandeReinscriptionId;

    private Long directeurDeTheseId;
}
