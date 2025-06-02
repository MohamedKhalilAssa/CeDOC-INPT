package ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper;

import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.ProfesseurResponseDTO;
import ma.inpt.cedoc.model.entities.utilisateurs.Professeur;

public interface ProfesseurMapper {
    ProfesseurResponseDTO toSimpleDTO(Professeur p);
}
