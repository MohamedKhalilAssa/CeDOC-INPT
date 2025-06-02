package ma.inpt.cedoc.model.DTOs.Candidature;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Builder;
import lombok.Data;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.ProfesseurResponseDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.UtilisateurResponseDTO;

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

    private UtilisateurResponseDTO chefEquipe;
    private UtilisateurResponseDTO directeurDeThese;
    private List<ProfesseurResponseDTO> professeurs;

    public static class SujetResponseDTOBuilder {
        public SujetResponseDTOBuilder professeurs(List<ProfesseurResponseDTO> professeurs) {
            this.professeurs = professeurs;
            return this;
        }
    }    
}

