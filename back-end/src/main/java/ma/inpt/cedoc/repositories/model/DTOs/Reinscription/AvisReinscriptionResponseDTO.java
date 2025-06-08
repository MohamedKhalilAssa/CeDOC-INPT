package ma.inpt.cedoc.repositories.model.DTOs.Reinscription;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.repositories.model.DTOs.Generic.BaseResponseDTO;
import ma.inpt.cedoc.repositories.model.enums.reinscription_enums.AvancementEnum;
import ma.inpt.cedoc.repositories.model.enums.reinscription_enums.AvisEnum;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class AvisReinscriptionResponseDTO extends BaseResponseDTO {

    private String observation;

    private AvancementEnum etatAvancement;

    private AvisEnum avisFinal;

    private Long demandeReinscriptionId;

    private Long directeurDeTheseId;
}
