package ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import ma.inpt.cedoc.model.DTOs.Utilisateurs.EquipeRequestDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.EquipeResponseDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.EquipeSimpleDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.ProfesseurResponseDTO;
import ma.inpt.cedoc.model.entities.utilisateurs.EquipeDeRecherche;
import ma.inpt.cedoc.model.entities.utilisateurs.Professeur;

@Component
public class EquipeMapperImpl implements EquipeMapper {

    public EquipeDeRecherche toEntity(EquipeRequestDTO dto) {
        EquipeDeRecherche equipe = new EquipeDeRecherche();
        equipe.setNomDeLequipe(dto.getNomDeLequipe());
        // Note: chefEquipe, membres, and doctorants will be set in the service layer
        // based on the IDs provided in the DTO (chefEquipeId, membreIds, doctorantIds)
        return equipe;
    }

    public EquipeResponseDTO toResponseDTO(EquipeDeRecherche equipe) {
        if (equipe == null) {
            return null;
        }

        // Get chef name
        String nomCompletChef = null;
        Long chefEquipeId = null;
        if (equipe.getChefEquipe() != null &&
                equipe.getChefEquipe().getProfesseur() != null &&
                equipe.getChefEquipe().getProfesseur().getUtilisateur() != null) {
            var utilisateur = equipe.getChefEquipe().getProfesseur().getUtilisateur();
            nomCompletChef = utilisateur.getPrenom() + " " + utilisateur.getNom();
            chefEquipeId = equipe.getChefEquipe().getId();
        }

        // Convert members to DTOs
        List<ProfesseurResponseDTO> membres = null;
        if (equipe.getMembres() != null) {
            membres = equipe.getMembres().stream()
                    .map(this::convertProfesseurToDTO)
                    .collect(Collectors.toList());
        }

        return EquipeResponseDTO.builder()
                .id(equipe.getId())
                .nomDeLequipe(equipe.getNomDeLequipe())
                .createdAt(equipe.getCreatedAt())
                .updatedAt(equipe.getUpdatedAt())
                .nomCompletChef(nomCompletChef)
                .chefEquipeId(chefEquipeId)
                .membres(membres)
                .nombreMembres(equipe.getMembres() != null ? equipe.getMembres().size() : 0)
                .nombreDoctorants(equipe.getDoctorants() != null ? equipe.getDoctorants().size() : 0)
                .build();
    }

    public EquipeSimpleDTO toSimpleDTO(EquipeDeRecherche equipe) {
        if (equipe == null) {
            return null;
        }

        return EquipeSimpleDTO.builder()
                .id(equipe.getId())
                .nom(equipe.getNomDeLequipe())
                .build();
    }

    public EquipeDeRecherche updateFromRequestDTO(EquipeDeRecherche equipe, EquipeRequestDTO dto) {
        if (dto.getNomDeLequipe() != null) {
            equipe.setNomDeLequipe(dto.getNomDeLequipe());
        }
        // Note: chefEquipe, membres, and doctorants will be updated in the service layer if needed
        // based on the IDs provided in the DTO (chefEquipeId, membreIds, doctorantIds)
        return equipe;
    }

    private ProfesseurResponseDTO convertProfesseurToDTO(Professeur professeur) {
        if (professeur == null || professeur.getUtilisateur() == null) {
            return null;
        }

        var utilisateur = professeur.getUtilisateur();
        return ProfesseurResponseDTO.builder()
                .id(professeur.getId())
                .nom(utilisateur.getNom())
                .prenom(utilisateur.getPrenom())
                .email(utilisateur.getEmail())
                .telephone(utilisateur.getTelephone())
                .grade(professeur.getGrade())
                .build();
    }
}
