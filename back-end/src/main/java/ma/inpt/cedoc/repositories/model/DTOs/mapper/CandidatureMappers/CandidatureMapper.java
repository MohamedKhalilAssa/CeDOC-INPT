package ma.inpt.cedoc.repositories.model.DTOs.mapper.CandidatureMappers;

import ma.inpt.cedoc.repositories.model.DTOs.Candidature.CandidatureRequestDTO;
import ma.inpt.cedoc.repositories.model.DTOs.Candidature.CandidatureResponseDTO;
import ma.inpt.cedoc.repositories.model.entities.candidature.Candidature;
import ma.inpt.cedoc.repositories.model.entities.utilisateurs.Candidat;

public interface CandidatureMapper {
    Candidature toEntity(CandidatureRequestDTO dto);
    CandidatureResponseDTO toResponseDTO(Candidature entity);
    Candidat toCandidat(CandidatureRequestDTO dto);
}
