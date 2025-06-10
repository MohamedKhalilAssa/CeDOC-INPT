package ma.inpt.cedoc.model.DTOs.mapper.CandidatureMappers;

import ma.inpt.cedoc.model.DTOs.Candidature.CandidatureRequestDTO;
import ma.inpt.cedoc.model.DTOs.Candidature.CandidatureResponseDTO;
import ma.inpt.cedoc.model.entities.candidature.Candidature;
import ma.inpt.cedoc.model.entities.utilisateurs.Candidat;

public interface CandidatureMapper {
    Candidature toEntity(CandidatureRequestDTO dto);
    CandidatureResponseDTO toResponseDTO(Candidature entity);
    CandidatureResponseDTO toResponseDTOSafe(Candidature entity);
    Candidat toCandidat(CandidatureRequestDTO dto);
}
