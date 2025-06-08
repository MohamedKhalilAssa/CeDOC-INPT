package ma.inpt.cedoc.model.DTOs.Formations;

import lombok.*;
import lombok.experimental.SuperBuilder;
import ma.inpt.cedoc.model.DTOs.Generic.BaseResponseDTO;
import ma.inpt.cedoc.model.enums.formation_enums.StatutFormationEnum;
import ma.inpt.cedoc.model.enums.formation_enums.StatutVacationEnum;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.Date;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class VacationResponseDTO extends BaseResponseDTO {


    private String titreDuCours;

    private String etablissement;

    private LocalDate date;

    private String niveau;

    private Integer duree;

    private String justificatif;

    private StatutVacationEnum statut;


    private Long doctorantId; // to avoid circular reference
}
