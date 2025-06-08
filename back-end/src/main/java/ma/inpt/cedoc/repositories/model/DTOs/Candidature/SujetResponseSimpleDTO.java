package ma.inpt.cedoc.repositories.model.DTOs.Candidature;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SujetResponseSimpleDTO {
    private Long id;
    private String intitule;
    private String description;
    private boolean estPublic;
    private boolean valide;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private long chefEquipe;
    private Long directeurDeThese; // Can be null, so use Long instead of long
    private List<Long> professeurs;

    public static class SujetResponseSimpleDTOBuilder {
        public SujetResponseSimpleDTOBuilder professeurs(List<Long> professeurs) {
            this.professeurs = professeurs;
            return this;
        }
    }
}
