package ma.inpt.cedoc.model.DTOs.Formations;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;

import lombok.*;
import lombok.experimental.SuperBuilder;
import ma.inpt.cedoc.model.DTOs.Generic.BaseResponseDTO;
import ma.inpt.cedoc.model.enums.formation_enums.ModuleEnum;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class FormationResponseDTO extends BaseResponseDTO {


    private String formationName;

    private ModuleEnum module;

    private String intitule;

    private String nomFormateur;

    private String dateDebut;

    private Integer duree;

    private String lieu;

    private String details;

    private String image;

    private List<Long> doctorantIds; // IDs of Doctorants (to avoid circular fetching)


}
