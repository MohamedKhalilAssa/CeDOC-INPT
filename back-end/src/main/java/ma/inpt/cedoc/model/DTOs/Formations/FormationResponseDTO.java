package ma.inpt.cedoc.model.DTOs.Formations;

import java.time.ZonedDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.enums.formation_enums.ModuleEnum;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FormationResponseDTO {

    private Long id;

    private String formationName;

    private ModuleEnum module;

    private String intitule;

    private String nomFormateur;

    private String dateDebut;

    private Integer duree;

    private String lieu;

    private ZonedDateTime createdAt;

    private ZonedDateTime updatedAt;

    private List<Long> doctorantIds; // IDs of Doctorants (to avoid circular fetching)
}
