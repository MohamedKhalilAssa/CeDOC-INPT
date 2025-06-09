package ma.inpt.cedoc.model.DTOs.mapper.AttestationsMappers;

import org.springframework.stereotype.Component;
import ma.inpt.cedoc.model.DTOs.Attestation.*;
import ma.inpt.cedoc.model.entities.attestation.*;

@Component
public class AttestationMapperImpl implements AttestationMapper {

    @Override
    public AttestationAutomatique attestationAutomatiqueRequestDTOToAttestationAutomatique(
            AttestationAutomatiqueRequestDTO dto) {
        if (dto == null) return null;

        AttestationAutomatique attestationAutomatique = new AttestationAutomatique();
        attestationAutomatique.setTypeAttestationAutomatique(dto.getTypeAttestationAutomatique());
        attestationAutomatique.setStatutAttestation(dto.getStatutAttestation());
        attestationAutomatique.setDoctorant(dto.getDoctorant());
        return attestationAutomatique;
    }

    @Override
    public AttestationAvecValidation attestationAvecValidationRequestDTOToAttestationAvecValidation(
            AttestationAvecValidationRequestDTO dto) {
        if (dto == null) return null;

        AttestationAvecValidation attestationAvecValidation = new AttestationAvecValidation();
//        attestationAvecValidation.setUrl(dto.getUrl());
        attestationAvecValidation.setTypeAttestationValidation(dto.getTypeAttestationValidation());
        attestationAvecValidation.setStatutAttestation(dto.getStatutAttestation());
        attestationAvecValidation.setDoctorant(dto.getDoctorant());
        return attestationAvecValidation;
    }

    @Override
    public AttestationAutomatiqueResponseDTO attestationAutomatiqueToAttestationAutomatiqueResponseDTO(
            AttestationAutomatique attestation) {
        if (attestation == null) return null;

        AttestationAutomatiqueResponseDTO dto = new AttestationAutomatiqueResponseDTO();
        dto.setId(attestation.getId());
        dto.setTypeAttestationAutomatique(attestation.getTypeAttestationAutomatique());
        dto.setStatutAttestation(attestation.getStatutAttestation());
        dto.setDoctorant(attestation.getDoctorant());
        dto.setDateDemande(attestation.getDateDemande());
        dto.setCreatedAt(attestation.getCreatedAt());
        dto.setUpdatedAt(attestation.getUpdatedAt());
        return dto;
    }

    @Override
    public AttestationAvecValidationResponseDTO attestationAvecValidationToAttestationAvecValidationResponseDTO(
            AttestationAvecValidation attestation) {
        if (attestation == null) return null;

        AttestationAvecValidationResponseDTO dto = new AttestationAvecValidationResponseDTO();
        dto.setId(attestation.getId());
        dto.setTypeAttestationValidation(attestation.getTypeAttestationValidation());
        dto.setStatutAttestation(attestation.getStatutAttestation());
        dto.setEtatAttestation(attestation.getEtatAttestation());
        dto.setDoctorant(attestation.getDoctorant());
        dto.setDateDemande(attestation.getDateDemande());
        dto.setCreatedAt(attestation.getCreatedAt());
        dto.setUpdatedAt(attestation.getUpdatedAt());
        return dto;
    }

    @Override
    public void updateEtatAttestationAvecValidationFromDTO(AttestationAvecValidationUpdateDTO dto,
                                                           AttestationAvecValidation entity) {
        if (dto != null && entity != null) {
            entity.setEtatAttestation(dto.getEtatAttestation());
        }
    }
}
