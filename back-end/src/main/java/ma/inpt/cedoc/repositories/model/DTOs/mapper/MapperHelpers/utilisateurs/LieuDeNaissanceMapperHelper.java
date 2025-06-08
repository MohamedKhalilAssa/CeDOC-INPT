package ma.inpt.cedoc.repositories.model.DTOs.mapper.MapperHelpers.utilisateurs;

import org.mapstruct.Named;
import org.springframework.stereotype.Component;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.repositories.model.DTOs.Utilisateurs.LieuDeNaissanceRequestDTO;
import ma.inpt.cedoc.repositories.model.DTOs.Utilisateurs.LieuDeNaissanceResponseDTO;
import ma.inpt.cedoc.repositories.model.entities.utilisateurs.LieuDeNaissance;
import ma.inpt.cedoc.repositories.utilisateursRepositories.LieuDeNaissanceRepository;

@Component
@RequiredArgsConstructor
public class LieuDeNaissanceMapperHelper {
    private final LieuDeNaissanceRepository repository;

    @Named("mapLieuDeNaissance")
    public LieuDeNaissance map(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Lieu de naissance introuvable"));
    }

    /**
     * Converts LieuDeNaissanceRequestDTO to LieuDeNaissance entity
     */
    public LieuDeNaissance toEntity(LieuDeNaissanceRequestDTO requestDTO) {
        if (requestDTO == null) {
            return null;
        }

        LieuDeNaissance lieuDeNaissance = new LieuDeNaissance();
        lieuDeNaissance.setPays(requestDTO.getPays());
        lieuDeNaissance.setVille(requestDTO.getVille());
        return lieuDeNaissance;
    }

    /**
     * Converts LieuDeNaissance entity to LieuDeNaissanceResponseDTO
     */
    public LieuDeNaissanceResponseDTO toResponseDTO(LieuDeNaissance lieuDeNaissance) {
        if (lieuDeNaissance == null) {
            return null;
        }

        return LieuDeNaissanceResponseDTO.builder()
                .id(lieuDeNaissance.getId())
                .createdAt(lieuDeNaissance.getCreatedAt())
                .updatedAt(lieuDeNaissance.getUpdatedAt())
                .pays(lieuDeNaissance.getPays())
                .ville(lieuDeNaissance.getVille())
                .build();
    }

    /**
     * Updates an existing LieuDeNaissance entity with data from
     * LieuDeNaissanceRequestDTO
     */
    public void updateEntityFromDTO(LieuDeNaissanceRequestDTO requestDTO, LieuDeNaissance existingEntity) {
        if (requestDTO == null || existingEntity == null) {
            return;
        }

        existingEntity.setPays(requestDTO.getPays());
        existingEntity.setVille(requestDTO.getVille());
    }
}