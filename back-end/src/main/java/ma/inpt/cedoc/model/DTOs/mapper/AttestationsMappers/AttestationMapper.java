package ma.inpt.cedoc.model.DTOs.mapper.AttestationsMappers;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

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
        @Mapping(target = "validated", ignore = true) // set manually in service
        @Mapping(target = "demandeAttestation", ignore = true) // assuming user is resolved separately
        AttestationAutomatique attestationAutomatiqueRequestDTOToAttestationAutomatique(
                        AttestationAutomatiqueRequestDTO dto);

        // Mapping from AttestationAvecValidationRequestDTO to AttestationAvecValidation
        @Mapping(target = "id", ignore = true)
        @Mapping(target = "createdAt", ignore = true)
        @Mapping(target = "updatedAt", ignore = true)
        @Mapping(target = "validated", ignore = true) // set manually in service
        @Mapping(target = "demandeAttestation", ignore = true) // assuming user is resolved separately
        AttestationAvecValidation attestationAvecValidationRequestDTOToAttestationAvecValidation(
                        AttestationAvecValidationRequestDTO dto);

        // Mapping for automatic response
        AttestationAutomatiqueResponseDTO attestationAutomatiqueToAttestationAutomatiqueResponseDTO(
                        AttestationAutomatique attestation);

        // Mapping for validation-required response
        AttestationAvecValidationResponseDTO attestationAvecValidationToAttestationAvecValidationResponseDTO(
                        AttestationAvecValidation attestation);

                        
        AttestationResponseDTO attestationToAttestationResponseDTO(Attestation attestation);

        // Update an existing AttestationAutomatique (used for PATCH/PUT)
        @Mapping(target = "id", ignore = true)
        @Mapping(target = "createdAt", ignore = true)
        @Mapping(target = "updatedAt", ignore = true)
        @Mapping(target = "validated", ignore = true)
        @Mapping(target = "utilisateur", ignore = true)
        void updateAttestationAutomatiqueFromDTO(AttestationAutomatiqueRequestDTO dto,
                        @MappingTarget AttestationAutomatique entity);

        // Update an existing AttestationAvecValidation (used for PATCH/PUT)
        @Mapping(target = "id", ignore = true)
        @Mapping(target = "createdAt", ignore = true)
        @Mapping(target = "updatedAt", ignore = true)
        @Mapping(target = "validated", ignore = true)
        @Mapping(target = "utilisateur", ignore = true)
        void updateAttestationAvecValidationFromDTO(AttestationAutomatiqueRequestDTO dto,
                        @MappingTarget AttestationAvecValidation entity);

        /*--------------------------------------------------------------------------HELPERS---------------------------------------------------------------------------------*/

        // Add any custom logic here, e.g., mapping utilisateurId to user entity if
        // needed
}
