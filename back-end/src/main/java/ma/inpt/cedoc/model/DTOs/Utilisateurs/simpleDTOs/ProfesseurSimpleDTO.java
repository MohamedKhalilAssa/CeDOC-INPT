package ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class ProfesseurSimpleDTO extends UtilisateurSimpleDTO {
    private String grade; // You can use `String` or `GradeProfesseurEnum` if preferred
}
