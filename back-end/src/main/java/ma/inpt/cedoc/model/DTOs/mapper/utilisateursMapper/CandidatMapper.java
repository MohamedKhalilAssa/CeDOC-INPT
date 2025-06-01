package ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper;

import ma.inpt.cedoc.model.DTOs.Utilisateurs.CandidatRequestDTO;
import ma.inpt.cedoc.model.entities.utilisateurs.Candidat;

public interface CandidatMapper {
    Candidat toEntity(CandidatRequestDTO dto);
    
}
