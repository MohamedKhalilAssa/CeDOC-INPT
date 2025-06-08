package ma.inpt.cedoc.repositories.model.DTOs.Formations;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import ma.inpt.cedoc.repositories.model.DTOs.Generic.BaseResponseDTO;
import ma.inpt.cedoc.repositories.model.enums.formation_enums.StatutFormationEnum;

@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class SeanceFormationResponseDTO extends BaseResponseDTO {

    private Integer duree;

    private String justificatifPdf;

    private StatutFormationEnum statut;

    private Long formationId;

    private Long declarantId;

    private Long valideParId;
}
