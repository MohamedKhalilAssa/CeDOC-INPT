package ma.inpt.cedoc.model.DTOs.mapper.CandidatureMappers;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.beans.factory.annotation.Autowired;

import ma.inpt.cedoc.model.DTOs.Candidature.SujetRequestDTO;
import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.utilisateurs.ChefEquipe;
import ma.inpt.cedoc.model.entities.utilisateurs.DirecteurDeThese;
import ma.inpt.cedoc.model.entities.utilisateurs.Professeur;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class SujetMapper {

    @Autowired
    protected ProfesseurService professeurService;

    @Autowired
    protected ChefEquipeService chefEquipeService;

    @Autowired
    protected DirecteurDeTheseService directeurDeTheseService;

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "valide", ignore = true)
    @Mapping(target = "estPublic", ignore = true)
    @Mapping(target = "candidatures", ignore = true)
    @Mapping(target = "doctorants", ignore = true)
    @Mapping(target = "demandesReinscription", ignore = true)
    @Mapping(target = "professeurs", source = "professeursIds")
    @Mapping(target = "chefEquipe", source = "chefEquipeId")
    @Mapping(target = "directeurDeThese", source = "directeurDeTheseId")
    public abstract Sujet toEntity(SujetRequestDTO dto);

    protected List<Professeur> mapProfesseurs(List<Long> ids) {
        return professeurService.findAllByIds(ids);
    }

    protected ChefEquipe mapChefEquipe(Long id) {
        return chefEquipeService.findById(id);
    }

    protected DirecteurDeThese mapDirecteurDeThese(Long id) {
        if (id == null) return null;
        return directeurDeTheseService.findById(id);
    }
}
