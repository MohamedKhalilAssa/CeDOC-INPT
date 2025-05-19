package ma.inpt.cedoc.model.DTOs.mapper.formationsMappers;

import org.mapstruct.*;

import ma.inpt.cedoc.model.DTOs.Formations.VacationRequestDTO;
import ma.inpt.cedoc.model.DTOs.Formations.VacationResponseDTO;
import ma.inpt.cedoc.model.entities.formation.Vacation;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface VacationMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "doctorant", ignore = true) // Set manually in Service
    Vacation vacationRequestDTOToVacation(VacationRequestDTO dto);

    @Mapping(target = "doctorantId", expression = "java(mapDoctorantId(vacation))")
    VacationResponseDTO vacationToVacationResponseDTO(Vacation vacation);

    @Mapping(target = "id", ignore = true)
    void updateVacationFromDTO(VacationRequestDTO dto, @MappingTarget Vacation vacation);


    /* --------------------------HELPERS--------------------------------*/

    default Long mapDoctorantId(Vacation vacation) {
        if (vacation.getDoctorant() == null) {
            return null;
        }
        return vacation.getDoctorant().getId();
    }
}

