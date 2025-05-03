package ma.inpt.cedoc.model.DTOs.Utilisateurs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LieuDeNaissanceResponseDTO {

    private Long id;
    private String pays;

    private String ville;
}
