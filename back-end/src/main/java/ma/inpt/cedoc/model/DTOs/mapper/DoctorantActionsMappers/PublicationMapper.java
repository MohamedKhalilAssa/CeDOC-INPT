package ma.inpt.cedoc.model.DTOs.mapper.DoctorantActionsMappers;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.DoctorantActions.PublicationRequestDTO;
import ma.inpt.cedoc.model.DTOs.DoctorantActions.PublicationResponseDTO;
import ma.inpt.cedoc.model.entities.DoctorantActions.Publication;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PublicationMapper {
    public Publication toEntity(PublicationRequestDTO requestDTO){
        Publication entity = new Publication();
        entity.setTitre(requestDTO.getTitre());
        entity.setJournal(requestDTO.getJournal());
        entity.setDatePublication(requestDTO.getDatePublication());
        entity.setJustificatif(requestDTO.getJustificatif());
        entity.setAutresAuteurs(requestDTO.getAutresAuteurs());
        entity.setPrixIntitule(requestDTO.getPrixIntitule());
        return entity;
    }

    public void updateFromRequest(PublicationRequestDTO requestDTO, Publication entity){
        entity.setTitre(requestDTO.getTitre());
        entity.setJournal(requestDTO.getJournal());
        entity.setDatePublication(requestDTO.getDatePublication());
        entity.setJustificatif(requestDTO.getJustificatif());
        entity.setPrixIntitule(requestDTO.getPrixIntitule());
    }

    public PublicationResponseDTO toResponseDTO(Publication entity){
        PublicationResponseDTO dto = new PublicationResponseDTO();
        dto.setId(entity.getId());
        dto.setTitre(entity.getTitre());
        dto.setJournal(entity.getJournal());
        dto.setDatePublication(entity.getDatePublication());
        dto.setJustificatif(entity.getJustificatif());
        dto.setAutresAuteurs(entity.getAutresAuteurs());
        dto.setPrixIntitule(entity.getPrixIntitule());
        dto.setStatus(entity.getStatus());
        dto.setAuteurId(entity.getAuteur().getId());
        dto.setValidateurId(entity.getValidateur().getId());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }
}
