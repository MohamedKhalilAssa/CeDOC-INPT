package ma.inpt.cedoc.model.DTOs.mapper.DoctorantActionsMappers;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import ma.inpt.cedoc.model.DTOs.DoctorantActions.ConfParticipationRequestDTO;
import ma.inpt.cedoc.model.DTOs.DoctorantActions.ConfParticipationResponseDTO;
import ma.inpt.cedoc.model.entities.DoctorantActions.ConfParticipation;

@Mapper(componentModel = "spring")
public interface ConfParticipationMapper {
    public ConfParticipation toEntity(ConfParticipationRequestDTO confParticipationRequestDTO);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateFromRequest(ConfParticipationRequestDTO dto, @MappingTarget ConfParticipation confParticipation);

    public ConfParticipationResponseDTO toResponseDTO(ConfParticipation confParticipation);

}
