package ma.inpt.cedoc.model.DTOs.Formations;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.enums.formation_enums.StatutFormationEnum;

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

    private Date date;

    private String niveau;

    private Integer duree;

    private String justificatif;

    private StatutFormationEnum statut;

    private ZonedDateTime createdAt;

    private ZonedDateTime updatedAt;

    private Long doctorantId; // to avoid circular reference
}
