package ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EquipeSimpleDTO {
    private Long id;
    private String nom;
}
