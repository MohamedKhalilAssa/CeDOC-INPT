package ma.inpt.cedoc.repositories.model.DTOs.Utilisateurs;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import ma.inpt.cedoc.repositories.model.DTOs.Candidature.SujetResponseDTO;

@Builder
@Data
@AllArgsConstructor
public class ChefSujetsResponseDTO {
    private UtilisateurResponseDTO chef;
    private List<SujetResponseDTO> sujets;
}
