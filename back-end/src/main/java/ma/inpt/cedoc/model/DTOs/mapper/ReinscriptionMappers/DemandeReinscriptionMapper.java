package ma.inpt.cedoc.model.DTOs.mapper.ReinscriptionMappers;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Reinscription.DemandeReinscriptionRequestDTO;
import ma.inpt.cedoc.model.DTOs.Reinscription.DemandeReinscriptionResponseDTO;
import ma.inpt.cedoc.model.entities.Reinscription.DemandeReinscription;
import ma.inpt.cedoc.repositories.candidatureRepositories.SujetRepository;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DemandeReinscriptionMapper {
    private final SujetRepository sujetRepository;

    public DemandeReinscription toEntity(DemandeReinscriptionRequestDTO dto){
        DemandeReinscription entity = new DemandeReinscription();
        entity.setAnnee(dto.getAnnee());
        entity.setRapportAvancement(dto.getRapportAvancement());
        entity.setPlanAction(dto.getPlanAction());
        entity.setResidance(dto.isResidance());
        entity.setAttestationHonneur(dto.getAttestationHonneur());
        entity.setCertificatTravail(dto.getCertificatTravail());
        entity.setDemandeDerogation(dto.getDemandeDerogation());
        entity.setSujet(sujetRepository.findById(dto.getSujetId())
                .orElseThrow(() -> new ResourceNotFoundException("Sujet non trouvé")));
        return entity;
    }

    public void updateFromRequest(DemandeReinscriptionRequestDTO dto, DemandeReinscription entity){
        entity.setAnnee(dto.getAnnee());
        entity.setRapportAvancement(dto.getRapportAvancement());
        entity.setPlanAction(dto.getPlanAction());
        entity.setResidance(dto.isResidance());
        entity.setAttestationHonneur(dto.getAttestationHonneur());
        entity.setCertificatTravail(dto.getCertificatTravail());
        entity.setDemandeDerogation(dto.getDemandeDerogation());
        entity.setSujet(sujetRepository.findById(dto.getSujetId())
                .orElseThrow(() -> new ResourceNotFoundException("Sujet non trouvé")));
    }

    public DemandeReinscriptionResponseDTO toResponseDTO(DemandeReinscription entity){
        DemandeReinscriptionResponseDTO responseDTO = new DemandeReinscriptionResponseDTO();
        responseDTO.setId(entity.getId());
        responseDTO.setAnnee(entity.getAnnee());
        responseDTO.setRapportAvancement(entity.getRapportAvancement());
        responseDTO.setPlanAction(entity.getPlanAction());
        responseDTO.setResidance(entity.isResidance());
        responseDTO.setAttestationHonneur(entity.getAttestationHonneur());
        responseDTO.setCertificatTravail(entity.getCertificatTravail());
        responseDTO.setDemandeDerogation(entity.getDemandeDerogation());

        responseDTO.setDemandeurId(entity.getDemandeur().getId());

        responseDTO.setSujetId(entity.getSujet().getId());

        responseDTO.setAvisReinscriptionId(entity.getAvisReinscription().getId());

        return responseDTO;
    }
}
