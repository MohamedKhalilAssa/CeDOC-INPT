package ma.inpt.cedoc.model.DTOs.Formations;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.enums.formation_enums.StatutFormationEnum;

import java.time.ZonedDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SeanceFormationResponseDTO {

    private Long id;

    private Integer duree;

    private String justificatifPdf;

    private StatutFormationEnum statut;

    private ZonedDateTime createdAt;

    private ZonedDateTime updatedAt;

    private Long formationId;

    private Long declarantId;

    private Long valideParId;
}
