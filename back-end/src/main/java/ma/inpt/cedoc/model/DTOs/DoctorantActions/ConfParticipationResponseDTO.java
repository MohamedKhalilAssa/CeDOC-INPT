package ma.inpt.cedoc.model.DTOs.DoctorantActions;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.enums.doctorant_enums.EtatEnum;
import org.springframework.boot.convert.DataSizeUnit;

import java.time.ZonedDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConfParticipationResponseDTO{
    private Long id;

    private String titre;

    private String conference;

    private ZonedDateTime date;

    private String justificatif;

    private EtatEnum status;
}
