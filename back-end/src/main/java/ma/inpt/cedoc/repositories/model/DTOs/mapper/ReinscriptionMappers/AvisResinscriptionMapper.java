package ma.inpt.cedoc.repositories.model.DTOs.mapper.ReinscriptionMappers;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.repositories.ResinscriptionRepositories.DemandeReinscriptionRepository;
import ma.inpt.cedoc.repositories.model.DTOs.Reinscription.AvisReinscriptionRequestDTO;
import ma.inpt.cedoc.repositories.model.DTOs.Reinscription.AvisReinscriptionResponseDTO;
import ma.inpt.cedoc.repositories.model.entities.Reinscription.AvisReinscription;

import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AvisResinscriptionMapper {
    private final DemandeReinscriptionRepository demandeReinscriptionRepository;

    public AvisReinscription toEntity(AvisReinscriptionRequestDTO requestDTO) {
        AvisReinscription entity = new AvisReinscription();
        entity.setObservation(requestDTO.getObservation());
        entity.setEtatAvancement(requestDTO.getEtatAvancement());
        entity.setAvisFinal(requestDTO.getAvisFinal());
        entity.setDemandeReinscription(demandeReinscriptionRepository.findById(requestDTO.getDemandeReinscriptionId())
                .orElseThrow(() -> new ResourceNotFoundException("Demande Reinscription n'est pas trouvé")));
        return entity;
    }

    public void updateFromRequest(AvisReinscriptionRequestDTO requestDTO, AvisReinscription entity) {
        entity.setObservation(requestDTO.getObservation());
        entity.setEtatAvancement(requestDTO.getEtatAvancement());
        entity.setAvisFinal(requestDTO.getAvisFinal());
    }

    public AvisReinscriptionResponseDTO toResponseDTO(AvisReinscription entity) {
        AvisReinscriptionResponseDTO dto = new AvisReinscriptionResponseDTO();
        dto.setId(entity.getId());
        dto.setObservation(entity.getObservation());
        dto.setEtatAvancement(entity.getEtatAvancement());
        dto.setAvisFinal(entity.getAvisFinal());
        dto.setDirecteurDeTheseId(entity.getDirecteurDeThese().getId());
        dto.setDemandeReinscriptionId(entity.getDemandeReinscription().getId());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }
}
