package ma.inpt.cedoc.model.DTOs.mapper.CandidatureMappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.beans.factory.annotation.Autowired;

import ma.inpt.cedoc.model.DTOs.Candidature.CandidatureRequestDTO;
import ma.inpt.cedoc.model.entities.candidature.Candidature;
import ma.inpt.cedoc.model.entities.utilisateurs.Candidat;
import ma.inpt.cedoc.service.utilisateurServices.CandidatService;

@Mapper(componentModel = "spring", uses = {}, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class CandidatureMapper {

    @Autowired
    protected CandidatService candidatService;

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "sujets", ignore = true) // you can handle this separately if needed
    @Mapping(target = "candidat", source = "candidatId")
    public abstract Candidature toEntity(CandidatureRequestDTO dto);

    // Custom mapping to resolve candidatId → Candidat
    protected Candidat map(Long candidatId) {
        return candidatService.findFullCandidatById(candidatId);
    }
}
