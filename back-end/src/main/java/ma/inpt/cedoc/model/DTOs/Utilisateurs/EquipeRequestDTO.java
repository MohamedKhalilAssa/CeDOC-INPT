package ma.inpt.cedoc.model.DTOs.Utilisateurs;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EquipeRequestDTO {

    @NotBlank(message = "Le nom de l'équipe est obligatoire")
    private String nomDeLequipe;

    @NotNull(message = "L'ID du chef d'équipe est obligatoire")
    private Long chefEquipeId;
}
