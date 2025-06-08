package ma.inpt.cedoc.repositories.model.DTOs.Formations;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import ma.inpt.cedoc.repositories.model.DTOs.Generic.BaseResponseDTO;
import ma.inpt.cedoc.repositories.model.enums.formation_enums.ModuleEnum;

@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class FormationResponseDTO extends BaseResponseDTO {

    private String formationName;

    private ModuleEnum module;

    private String intitule;

    private String nomFormateur;

    private String dateDebut;

    private Integer duree;

    private String lieu;

    private List<Long> doctorantIds; // IDs of Doctorants (to avoid circular fetching)
}
