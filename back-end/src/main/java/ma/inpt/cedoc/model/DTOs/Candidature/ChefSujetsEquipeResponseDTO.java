package ma.inpt.cedoc.model.DTOs.Candidature;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChefSujetsEquipeResponseDTO {
    private String intituleSujet;
    private String nomCompletChef;
    private String equipeIntitule;
    private Long equipeId;
}
