package ma.inpt.cedoc.model.DTOs.mapper.AttestationsMappers;

import ma.inpt.cedoc.model.DTOs.Attestation.*;
import ma.inpt.cedoc.model.entities.attestation.AttestationAutomatique;
import ma.inpt.cedoc.model.entities.attestation.AttestationAvecValidation;

public interface AttestationMapper {

        AttestationAutomatique attestationAutomatiqueRequestDTOToAttestationAutomatique(
                AttestationAutomatiqueRequestDTO dto);

        AttestationAvecValidation attestationAvecValidationRequestDTOToAttestationAvecValidation(
                AttestationAvecValidationRequestDTO dto);

        AttestationAutomatiqueResponseDTO attestationAutomatiqueToAttestationAutomatiqueResponseDTO(
                AttestationAutomatique attestation);

        AttestationAvecValidationResponseDTO attestationAvecValidationToAttestationAvecValidationResponseDTO(
                AttestationAvecValidation attestation);

        void updateEtatAttestationAvecValidationFromDTO(
                AttestationAvecValidationUpdateDTO dto,
                AttestationAvecValidation entity);
}
