package ma.inpt.cedoc.model.DTOs.DoctorantActions;

import java.time.ZonedDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConfParticipationRequestDTO {
    private String titre;

    private String conference;

    private ZonedDateTime date;

    private String justificatif;

    private List<String> participantsEmails;
}
