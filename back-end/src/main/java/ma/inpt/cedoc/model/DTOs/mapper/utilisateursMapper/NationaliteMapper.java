package ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper;

import org.springframework.stereotype.Component;

import ma.inpt.cedoc.model.DTOs.Utilisateurs.NationaliteRequestDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.NationaliteResponseDTO;
import ma.inpt.cedoc.model.entities.utilisateurs.Nationalite;

@Component
public class NationaliteMapper {

    public Nationalite toEntity(NationaliteRequestDTO requestDTO) {
        Nationalite entity = new Nationalite();
        entity.setIntitule(requestDTO.getIntitule());
        return entity;
    }

    public void updateFromRequest(NationaliteRequestDTO requestDTO, Nationalite entity) {
        entity.setIntitule(requestDTO.getIntitule());
    }

    public NationaliteResponseDTO toResponseDTO(Nationalite entity) {
        return NationaliteResponseDTO.builder()
                .id(entity.getId())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .intitule(entity.getIntitule())
                .build();
    }
}
