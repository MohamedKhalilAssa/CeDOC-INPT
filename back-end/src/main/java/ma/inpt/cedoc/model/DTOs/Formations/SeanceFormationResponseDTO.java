package ma.inpt.cedoc.model.DTOs.Formations;

import lombok.*;
import lombok.experimental.SuperBuilder;
import ma.inpt.cedoc.model.DTOs.Generic.BaseResponseDTO;
import ma.inpt.cedoc.model.enums.formation_enums.StatutFormationEnum;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class SeanceFormationResponseDTO extends BaseResponseDTO {


    private Integer duree;

    private String justificatifPdf;

    private StatutFormationEnum statut;

    private Long formationId;

    private Long declarantId;

    private Long valideParId;
}
