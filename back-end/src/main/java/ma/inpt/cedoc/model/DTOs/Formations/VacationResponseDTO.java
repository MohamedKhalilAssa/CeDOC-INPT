package ma.inpt.cedoc.model.DTOs.Formations;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.enums.formation_enums.StatutFormationEnum;
import ma.inpt.cedoc.model.enums.formation_enums.StatutVacationEnum;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VacationResponseDTO {

    private Long id;

    private String titreDuCours;

    private String etablissement;

    private LocalDate date;

    private String niveau;

    private Integer duree;

    private String justificatif;

    private StatutVacationEnum statut;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private Long doctorantId; // to avoid circular reference
}
