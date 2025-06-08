package ma.inpt.cedoc.repositories.model.DTOs.mapper.CandidatureMappers;

import ma.inpt.cedoc.repositories.model.DTOs.Candidature.SujetRequestDTO;
import ma.inpt.cedoc.repositories.model.DTOs.Candidature.SujetResponseDTO;
import ma.inpt.cedoc.repositories.model.DTOs.Candidature.SujetResponseSimpleDTO;
import ma.inpt.cedoc.repositories.model.entities.candidature.Sujet;

public interface SujetMapper {
    Sujet toEntity(SujetRequestDTO dto);

    SujetResponseDTO toResponseDTO(Sujet sujet);

    SujetResponseSimpleDTO toSimpleResponseDTO(Sujet sujet);
}
