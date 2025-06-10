package ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper;

import ma.inpt.cedoc.model.DTOs.Utilisateurs.EquipeRequestDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.EquipeResponseDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.EquipeSimpleDTO;
import ma.inpt.cedoc.model.entities.utilisateurs.EquipeDeRecherche;

public interface EquipeMapper {

    EquipeDeRecherche toEntity(EquipeRequestDTO dto);

    EquipeResponseDTO toResponseDTO(EquipeDeRecherche equipe);

    EquipeSimpleDTO toSimpleDTO(EquipeDeRecherche equipe);

    EquipeDeRecherche updateFromRequestDTO(EquipeDeRecherche equipe, EquipeRequestDTO dto);

}