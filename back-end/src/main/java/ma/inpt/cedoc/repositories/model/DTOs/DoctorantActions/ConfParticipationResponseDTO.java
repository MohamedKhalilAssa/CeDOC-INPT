package ma.inpt.cedoc.repositories.model.DTOs.DoctorantActions;

import java.time.ZonedDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.repositories.model.DTOs.Generic.BaseResponseDTO;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class ConfParticipationResponseDTO extends BaseResponseDTO {

    private Long id;

    private String titre;

    private String conference;

    private ZonedDateTime date;

    private String lieu;

    private String justificatif;

    private String autresParticipants;

    private Long participantId;

    private Long validateurId;
}
