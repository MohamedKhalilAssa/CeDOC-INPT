package ma.inpt.cedoc.repositories.model.DTOs.mapper.utilisateursMapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.repositories.model.DTOs.Candidature.SujetResponseDTO;
import ma.inpt.cedoc.repositories.model.DTOs.Utilisateurs.ChefSujetsResponseDTO;
import ma.inpt.cedoc.repositories.model.DTOs.Utilisateurs.UtilisateurResponseDTO;
import ma.inpt.cedoc.repositories.model.entities.utilisateurs.ChefEquipeRole;
import ma.inpt.cedoc.service.CandidatureSevices.SujetService;
import ma.inpt.cedoc.service.utilisateurServices.UtilisateurService;

@Component
@RequiredArgsConstructor
public class ChefEquipeMapperImpl {

    private final UtilisateurService utilisateurService;
    private final SujetService sujetService;

    /**
     * Convertit une entité ChefEquipeRole (anciennement ChefEquipe) en ChefSujetsResponseDTO.
     */
    public ChefSujetsResponseDTO toDto(ChefEquipeRole chefRole) {
        if (chefRole == null) {
            return null;
        }

        // 1) Récupérer le DTO complet de l’utilisateur (professeur derrière le rôle)
        UtilisateurResponseDTO chefDto =
            utilisateurService.getUtilisateurById(chefRole.getProfesseur().getId());

        // 2) Récupérer la liste de sujets gérés par ce chef (par son rôle)
        List<SujetResponseDTO> sujetsDuChef =
            sujetService.getSujetsByChefEquipeId(chefRole.getId());

        // 3) Construire et renvoyer le DTO final
        return ChefSujetsResponseDTO.builder()
                .chef(chefDto)
                .sujets(sujetsDuChef)
                .build();
    }

    /**
     * Convertit une liste de ChefEquipeRole en liste de ChefSujetsResponseDTO.
     */
    public List<ChefSujetsResponseDTO> toDtoList(List<ChefEquipeRole> chefs) {
        if (chefs == null) {
            return null;
        }
        return chefs.stream()
                    .map(this::toDto)
                    .collect(Collectors.toList());
    }
}
