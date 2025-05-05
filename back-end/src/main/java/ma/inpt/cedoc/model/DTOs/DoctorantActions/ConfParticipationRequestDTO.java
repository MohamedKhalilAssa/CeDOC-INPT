package ma.inpt.cedoc.model.DTOs.DoctorantActions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.Annotations.FieldMatcher.FieldMatch;
import ma.inpt.cedoc.model.enums.doctorant_enums.EtatEnum;

import java.time.ZonedDateTime;
import java.util.List;

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
