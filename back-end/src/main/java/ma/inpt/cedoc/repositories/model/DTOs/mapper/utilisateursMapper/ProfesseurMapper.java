package ma.inpt.cedoc.repositories.model.DTOs.mapper.utilisateursMapper;

import ma.inpt.cedoc.repositories.model.DTOs.Utilisateurs.simpleDTOs.ProfesseurResponseDTO;
import ma.inpt.cedoc.repositories.model.entities.utilisateurs.Professeur;

public interface ProfesseurMapper {
    ProfesseurResponseDTO toSimpleDTO(Professeur p);
}
