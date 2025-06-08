package ma.inpt.cedoc.repositories.model.DTOs.mapper.DoctorantActionsMappers;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.repositories.model.DTOs.DoctorantActions.ConfParticipationRequestDTO;
import ma.inpt.cedoc.repositories.model.DTOs.DoctorantActions.ConfParticipationResponseDTO;
import ma.inpt.cedoc.repositories.model.entities.DoctorantActions.ConfParticipation;

@Component
@RequiredArgsConstructor
public class ConfParticipationMapper {
    public ConfParticipation toEntity(ConfParticipationRequestDTO requestDTO) {
        ConfParticipation confParticipation = new ConfParticipation();
        confParticipation.setTitre(requestDTO.getTitre());
        confParticipation.setConference(requestDTO.getConference());
        confParticipation.setDate(requestDTO.getDate());
        confParticipation.setLieu(requestDTO.getLieu());
        confParticipation.setJustificatif(requestDTO.getJustificatif());
        confParticipation.setAutresParticipants(requestDTO.getAutresParticipants());
        return confParticipation;
    }

    public void updateFromRequest(ConfParticipationRequestDTO requestDTO, ConfParticipation confParticipation) {
        confParticipation.setTitre(requestDTO.getTitre());
        confParticipation.setConference(requestDTO.getConference());
        confParticipation.setDate(requestDTO.getDate());
        confParticipation.setLieu(requestDTO.getLieu());
        confParticipation.setJustificatif(requestDTO.getJustificatif());
        confParticipation.setAutresParticipants(requestDTO.getAutresParticipants());
    }

    public ConfParticipationResponseDTO toResponseDTO(ConfParticipation confParticipation) {
        ConfParticipationResponseDTO responseDTO = new ConfParticipationResponseDTO();
        responseDTO.setId(confParticipation.getId());
        responseDTO.setTitre(confParticipation.getTitre());
        responseDTO.setConference(confParticipation.getConference());
        responseDTO.setDate(confParticipation.getDate());
        responseDTO.setLieu(confParticipation.getLieu());
        responseDTO.setJustificatif(confParticipation.getJustificatif());
        responseDTO.setAutresParticipants(confParticipation.getAutresParticipants());
        responseDTO.setParticipantId(confParticipation.getParticipant().getId());
        responseDTO.setValidateurId(confParticipation.getValidateur().getId());
        responseDTO.setCreatedAt(confParticipation.getCreatedAt());
        responseDTO.setUpdatedAt(confParticipation.getUpdatedAt());
        return responseDTO;
    }
}
