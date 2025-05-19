package ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import ma.inpt.cedoc.model.DTOs.Utilisateurs.CandidatRequestDTO;
import ma.inpt.cedoc.model.DTOs.mapper.CandidatureMappers.CandidatureMapper;
import ma.inpt.cedoc.model.entities.utilisateurs.Candidat;

@Mapper(componentModel = "spring", uses = { UtilisateurMapper.class,
        CandidatureMapper.class }, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CandidatMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(source = "candidature", target = "candidature")
    Candidat toEntity(CandidatRequestDTO dto);
}
