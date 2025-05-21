package ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class UtilisateurSimpleDTO {
    private Long id;
    private String nom;
    private String prenom;
    private String email;
}

