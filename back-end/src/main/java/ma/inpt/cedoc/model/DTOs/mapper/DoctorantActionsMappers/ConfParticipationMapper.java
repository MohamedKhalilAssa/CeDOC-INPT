package ma.inpt.cedoc.model.DTOs.mapper.DoctorantActionsMappers;

import org.mapstruct.*;

import ma.inpt.cedoc.model.DTOs.DoctorantActions.ConfParticipationRequestDTO;
import ma.inpt.cedoc.model.DTOs.DoctorantActions.ConfParticipationResponseDTO;
import ma.inpt.cedoc.model.entities.DoctorantActions.ConfParticipation;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ConfParticipationMapper {
    public ConfParticipation toEntity(ConfParticipationRequestDTO confParticipationRequestDTO);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateFromRequest(ConfParticipationRequestDTO dto, @MappingTarget ConfParticipation confParticipation);

    public ConfParticipationResponseDTO toResponseDTO(ConfParticipation confParticipation);

}
