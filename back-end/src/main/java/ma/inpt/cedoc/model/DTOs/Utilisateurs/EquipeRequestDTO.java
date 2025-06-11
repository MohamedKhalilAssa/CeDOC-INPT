package ma.inpt.cedoc.model.DTOs.Utilisateurs;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EquipeRequestDTO {

    @NotBlank(message = "Le nom de l'équipe est obligatoire")
    private String nomDeLequipe;

    @NotNull(message = "L'ID du chef d'équipe est obligatoire")
    private Long chefEquipeId;

    /**
     * Liste des IDs des professeurs membres de l'équipe
     * (n'inclut pas le chef d'équipe qui est défini séparément)
     */
    private List<Long> membreIds;

    /**
     * Liste des IDs des doctorants rattachés à l'équipe
     */
    private List<Long> doctorantIds;
}
