package ma.inpt.cedoc.model.DTOs.DoctorantActions;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.enums.doctorant_enums.EtatEnum;

import java.time.ZonedDateTime;

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
