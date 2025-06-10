package ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import ma.inpt.cedoc.model.DTOs.Generic.BaseResponseDTO;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class UtilisateurResponseDTO extends BaseResponseDTO {
    private String nom;
    private String prenom;
    private String email;
    private String telephone;
}
