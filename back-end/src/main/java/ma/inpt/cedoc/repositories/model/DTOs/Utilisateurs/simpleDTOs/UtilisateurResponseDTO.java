package ma.inpt.cedoc.repositories.model.DTOs.Utilisateurs.simpleDTOs;

import lombok.*;
import lombok.experimental.SuperBuilder;
import ma.inpt.cedoc.repositories.model.DTOs.Generic.BaseResponseDTO;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class UtilisateurResponseDTO extends BaseResponseDTO {
    private String nom;
    private String prenom;
    private String email;
}

