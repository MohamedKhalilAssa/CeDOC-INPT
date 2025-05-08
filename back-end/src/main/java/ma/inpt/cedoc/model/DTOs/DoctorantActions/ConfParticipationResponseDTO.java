package ma.inpt.cedoc.model.DTOs.DoctorantActions;

import java.time.ZonedDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.enums.doctorant_enums.EtatEnum;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConfParticipationResponseDTO {
    private Long id;

    private String titre;

    private String conference;

    private ZonedDateTime date;

    private String justificatif;

    private EtatEnum status;
}
