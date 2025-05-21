package ma.inpt.cedoc.model.DTOs.Candidature;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Builder;
import lombok.Data;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.ProfesseurSimpleDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.UtilisateurSimpleDTO;

@Data
@Builder
public class SujetResponseDTO {
    private Long id;
    private String intitule;
    private String description;
    private boolean estPublic;
    private boolean valide;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private UtilisateurSimpleDTO chefEquipe;
    private UtilisateurSimpleDTO directeurDeThese;
    private List<ProfesseurSimpleDTO> professeurs;

    public static class SujetResponseDTOBuilder {
        public SujetResponseDTOBuilder professeurs(List<ProfesseurSimpleDTO> professeurs) {
            this.professeurs = professeurs;
            return this;
        }
    }    
}

