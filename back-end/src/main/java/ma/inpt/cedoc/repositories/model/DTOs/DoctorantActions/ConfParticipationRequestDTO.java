package ma.inpt.cedoc.repositories.model.DTOs.DoctorantActions;

import java.time.ZonedDateTime;

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

    private String lieu;

    private String justificatif;

    private String autresParticipants;
}
