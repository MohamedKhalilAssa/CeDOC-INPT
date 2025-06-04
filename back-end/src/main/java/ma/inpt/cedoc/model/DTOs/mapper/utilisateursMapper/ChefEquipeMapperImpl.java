package ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Candidature.SujetResponseDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.ChefSujetsResponseDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.UtilisateurResponseDTO;
import ma.inpt.cedoc.model.entities.utilisateurs.ChefEquipe;
import ma.inpt.cedoc.service.CandidatureSevices.SujetService;
import ma.inpt.cedoc.service.utilisateurServices.UtilisateurService;

@Component
@RequiredArgsConstructor
public class ChefEquipeMapperImpl {

    private final UtilisateurService utilisateurService;
    private final SujetService sujetService;

    /**
     * Convertit une entité ChefEquipe en ChefSujetsResponseDTO existant.
     */
    public ChefSujetsResponseDTO toDto(ChefEquipe chef) {
        if (chef == null) {
            return null;
        }

        // 1) Récupérer le DTO complet de l'utilisateur (chef) via UtilisateurService
        UtilisateurResponseDTO chefDto = utilisateurService.getUtilisateurById(chef.getId());

        // 2) Récupérer la liste de sujets du chef (DTO) via SujetService
        List<SujetResponseDTO> sujetsDuChef = sujetService.getSujetsByChefEquipeId(chef.getId());

        // 3) Construire et renvoyer le DTO existant
        return ChefSujetsResponseDTO.builder()
                .chef(chefDto)
                .sujets(sujetsDuChef)
                .build();
    }

    /**
     * Convertit une liste de ChefEquipe en liste de ChefSujetsResponseDTO.
     */
    public List<ChefSujetsResponseDTO> toDtoList(List<ChefEquipe> chefs) {
        if (chefs == null) {
            return null;
        }
        return chefs.stream()
                    .map(this::toDto)
                    .collect(Collectors.toList());
    }
}
