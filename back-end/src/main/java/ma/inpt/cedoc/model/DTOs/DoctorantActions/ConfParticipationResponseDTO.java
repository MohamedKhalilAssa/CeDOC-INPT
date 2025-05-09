package ma.inpt.cedoc.model.DTOs.DoctorantActions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Generic.BaseResponseDTO;

import java.time.ZonedDateTime;

@Data
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
