package ma.inpt.cedoc.model.DTOs.mapper.formationsMappers;

import java.util.stream.Collectors;

import org.mapstruct.*;

import ma.inpt.cedoc.model.DTOs.Formations.FormationRequestDTO;
import ma.inpt.cedoc.model.DTOs.Formations.FormationResponseDTO;
import ma.inpt.cedoc.model.entities.formation.Formation;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR, unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE)
public interface FormationMapper {

    // Mapping from FormationRequestDTO to Formation
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "seanceFormationList", ignore = true)
    @Mapping(target = "professeur", ignore = true)
    @Mapping(target = "doctorantsCibles", ignore = true)
    Formation formationRequestDTOToFormation(FormationRequestDTO formationRequestDTO);

    // Mapping fromFormation to FormationResponseDTO
    @Mappings({
            @Mapping(target = "doctorantIds", expression = "java(mapDoctorantIds(formation))")
    })
    FormationResponseDTO formationToFormationResponseDTO(Formation formation);

    @Mapping(target = "id", ignore = true) // don't override the ID
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "doctorantsCibles", ignore = true)
    @Mapping(target = "professeur", ignore = true)
    @Mapping(target = "seanceFormationList", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateFormationFromDTO(FormationRequestDTO dto, @MappingTarget Formation entity);

    /*--------------------------------------------------------------------------HELPERS---------------------------------------------------------------------------------*/

    default java.util.List<Long> mapDoctorantIds(Formation formation) {
        if (formation.getDoctorantsCibles() == null) {
            return java.util.Collections.emptyList();
        }
        return formation.getDoctorantsCibles()
                .stream()
                .map(doctorant -> doctorant.getId())
                .collect(Collectors.toList());
    }
}
