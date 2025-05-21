package ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper;

import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.ProfesseurSimpleDTO;
import ma.inpt.cedoc.model.entities.utilisateurs.Professeur;

public interface ProfesseurMapper {
    ProfesseurSimpleDTO toSimpleDTO(Professeur p);
}
