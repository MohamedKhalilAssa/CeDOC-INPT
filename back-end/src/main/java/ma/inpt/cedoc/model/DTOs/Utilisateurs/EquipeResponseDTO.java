package ma.inpt.cedoc.model.DTOs.Utilisateurs;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import ma.inpt.cedoc.model.DTOs.Generic.BaseResponseDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.ProfesseurResponseDTO;

@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class EquipeResponseDTO extends BaseResponseDTO {

    private String nomDeLequipe;

    // Chef d'équipe information
    private String nomCompletChef;
    private Long chefEquipeId;

    // Liste des membres (professeurs)
    private List<ProfesseurResponseDTO> membres;

    // Statistiques
    private int nombreMembres;
    private int nombreDoctorants;
}
