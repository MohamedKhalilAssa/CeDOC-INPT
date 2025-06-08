package ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper;

import java.util.List;

import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.ProfesseurResponseDTO;
import ma.inpt.cedoc.model.entities.utilisateurs.Professeur;

public interface ProfesseurMapper {
    ProfesseurResponseDTO toSimpleDTO(Professeur p);

    ProfesseurResponseDTO toDto(Professeur p);

    List<ProfesseurResponseDTO> toDtoList(List<Professeur> professeurs);
}
