package ma.inpt.cedoc.model.DTOs.mapper.formationsMappers;

import java.util.stream.Collectors;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import ma.inpt.cedoc.model.DTOs.Formations.FormationRequestDTO;
import ma.inpt.cedoc.model.DTOs.Formations.FormationResponseDTO;
import ma.inpt.cedoc.model.entities.formation.Formation;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface FormationMapper {

    // Mapping from FormationRequestDTO to Formation
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "seanceFormationList", ignore = true)
    @Mapping(target = "professeur", ignore = true)
    @Mapping(target = "Doctorants_cibles", ignore = true)
    Formation formationRequestDTOToFormation(FormationRequestDTO formationRequestDTO);

    // Mapping from Formation to FormationResponseDTO
    @Mappings({
            @Mapping(target = "doctorantIds", expression = "java(mapDoctorantIds(formation))")
    })
    FormationResponseDTO formationToFormationResponseDTO(Formation formation);

    /*--------------------------------------------------------------------------HELPERS---------------------------------------------------------------------------------*/

    default java.util.List<Long> mapDoctorantIds(Formation formation) {
        if (formation.getDoctorants_cibles() == null) {
            return java.util.Collections.emptyList();
        }
        return formation.getDoctorants_cibles()
                .stream()
                .map(doctorant -> doctorant.getId())
                .collect(Collectors.toList());
    }
}
