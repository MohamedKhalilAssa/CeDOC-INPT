package ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import ma.inpt.cedoc.model.enums.utilisateur_enums.GradeProfesseurEnum;

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class ProfesseurResponseDTO extends UtilisateurResponseDTO {
    private GradeProfesseurEnum grade;
}
