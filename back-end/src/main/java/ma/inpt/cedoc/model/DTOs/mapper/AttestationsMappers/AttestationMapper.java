package ma.inpt.cedoc.model.DTOs.mapper.AttestationsMappers;

import org.mapstruct.*;

import ma.inpt.cedoc.model.DTOs.Attestation.*;
import ma.inpt.cedoc.model.entities.attestation.Attestation;
import ma.inpt.cedoc.model.entities.attestation.AttestationAutomatique;
import ma.inpt.cedoc.model.entities.attestation.AttestationAvecValidation;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface AttestationMapper {

        // Mapping from AttestationAutomatiqueRequestDTO to AttestationAutomatique
        @Mapping(target = "id", ignore = true)
        @Mapping(target = "createdAt", ignore = true)
        @Mapping(target = "updatedAt", ignore = true)
        @Mapping(target = "demandeAttestations", ignore = true)
        @Mapping(target = "titre", ignore = true)
        @Mapping(target = "url", ignore = true)
        @Mapping(target = "typeAttestationAuto", ignore = true)

        AttestationAutomatique attestationAutomatiqueRequestDTOToAttestationAutomatique(
                        AttestationAutomatiqueRequestDTO dto);

        // Mapping from AttestationAvecValidationRequestDTO to AttestationAvecValidation
        @Mapping(target = "id", ignore = true)
        @Mapping(target = "createdAt", ignore = true)
        @Mapping(target = "updatedAt", ignore = true)
        @Mapping(target = "demandeAttestations", ignore = true)
        @Mapping(target = "titre", ignore = true)
        @Mapping(target = "url", ignore = true)
        @Mapping(target = "typeAttestationValidation", ignore = true)
        @Mapping(target = "etatAttestation", ignore = true)
        AttestationAvecValidation attestationAvecValidationRequestDTOToAttestationAvecValidation(
                        AttestationAvecValidationRequestDTO dto);

        // Mapping for automatic response

        AttestationAutomatiqueResponseDTO attestationAutomatiqueToAttestationAutomatiqueResponseDTO(
                        AttestationAutomatique attestation);

        // Mapping for validation-required response
        AttestationAvecValidationResponseDTO attestationAvecValidationToAttestationAvecValidationResponseDTO(
                        AttestationAvecValidation attestation);

        // Mapping from Attestation to AttestationResponseDTO

        AttestationResponseDTO attestationToAttestationResponseDTO(Attestation attestation);

        // Update an existing AttestationAutomatique (used for PATCH/PUT)
        // @Mapping(target = "id", ignore = true)
        // @Mapping(target = "createdAt", ignore = true)
        // @Mapping(target = "updatedAt", ignore = true)
        void updateAttestationAutomatiqueFromDTO(AttestationAutomatiqueRequestDTO dto,
                        @MappingTarget AttestationAutomatique entity);

        // Update an existing AttestationAvecValidation (used for PATCH/PUT)
        // @Mapping(target = "id", ignore = true)
        // @Mapping(target = "createdAt", ignore = true)
        // @Mapping(target = "updatedAt", ignore = true)
        void updateAttestationAvecValidationFromDTO(AttestationAutomatiqueRequestDTO dto,
                        @MappingTarget AttestationAvecValidation entity);

        /*--------------------------------------------------------------------------HELPERS---------------------------------------------------------------------------------*/

        // Add any custom logic here, e.g., mapping utilisateurId to user entity if
        // needed
}
