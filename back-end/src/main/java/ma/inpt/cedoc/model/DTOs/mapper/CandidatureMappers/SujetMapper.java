package ma.inpt.cedoc.model.DTOs.mapper.CandidatureMappers;

import ma.inpt.cedoc.model.DTOs.Candidature.SujetRequestDTO;
import ma.inpt.cedoc.model.entities.candidature.Sujet;

public interface SujetMapper {
    Sujet toEntity(SujetRequestDTO dto);
}
