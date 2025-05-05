package ma.inpt.cedoc.model.DTOs.mapper.formationsMappers;

import org.mapstruct.*;

import ma.inpt.cedoc.model.DTOs.Formations.SeanceFormationRequestDTO;
import ma.inpt.cedoc.model.DTOs.Formations.SeanceFormationResponseDTO;
import ma.inpt.cedoc.model.entities.formation.SeanceFormation;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface SeanceFormationMapper {

//    @Mapping(target = "id", ignore = true)
//    @Mapping(target = "createdAt", ignore = true)
//    @Mapping(target = "updatedAt", ignore = true)
//    @Mapping(target = "formation", ignore = true) // Will be set manually later
//    @Mapping(target = "declarant", ignore = true) // Will be set manually later
//    @Mapping(target = "validePar", ignore = true) // Will be set manually later
    SeanceFormation seanceFormationRequestDTOToSeanceFormation(SeanceFormationRequestDTO dto);

//    @Mappings({
//            @Mapping(target = "formationId", expression = "java(mapFormationId(seanceFormation))"),
//            @Mapping(target = "declarantId", expression = "java(mapDeclarantId(seanceFormation))"),
//            @Mapping(target = "valideParId", expression = "java(mapValideParId(seanceFormation))")
//    })
    SeanceFormationResponseDTO seanceFormationToSeanceFormationResponseDTO(SeanceFormation seanceFormation);

//    @Mappings({
//            @Mapping(target = "id", ignore = true),
//            @Mapping(target = "createdAt", ignore = true),
//            @Mapping(target = "declarant", ignore = true),
//            @Mapping(target = "formation", ignore = true),
//            @Mapping(target = "updatedAt", ignore = true),
//            @Mapping(target = "validePar", ignore = true)
//    })
    void updateSeanceFormationFromDTO(SeanceFormationRequestDTO dto, @MappingTarget SeanceFormation entity);

    /*------------------------------------- HELPERS (if needed manually) ----------------------------------------*/
    default Long mapFormationId(SeanceFormation seanceFormation) {
        if (seanceFormation.getFormation() == null) {
            return null;
        }
        return seanceFormation.getFormation().getId();
    }

    default Long mapDeclarantId(SeanceFormation seanceFormation) {
        if (seanceFormation.getDeclarant() == null) {
            return null;
        }
        return seanceFormation.getDeclarant().getId();
    }

    default Long mapValideParId(SeanceFormation seanceFormation) {
        if (seanceFormation.getValidePar() == null) {
            return null;
        }
        return seanceFormation.getValidePar().getId();
    }
}
