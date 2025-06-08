package ma.inpt.cedoc.repositories.model.DTOs.mapper.AttestationsMappers;

import org.mapstruct.*;

import ma.inpt.cedoc.repositories.model.DTOs.Attestation.*;
import ma.inpt.cedoc.repositories.model.entities.attestation.AttestationAutomatique;
import ma.inpt.cedoc.repositories.model.entities.attestation.AttestationAvecValidation;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AttestationMapper {

        // Mapping from AttestationAutomatiqueRequestDTO to AttestationAutomatique
        @Mapping(target = "id", ignore = true)
        @Mapping(target = "createdAt", ignore = true)
        @Mapping(target = "updatedAt", ignore = true)
        @Mapping(target = "demandeAttestations", ignore = true)
        @Mapping(source = "url", target = "url")
        @Mapping(source = "typeAttestationAutomatique", target = "typeAttestationAutomatique")
        @Mapping(source = "doctorantId", target = "doctorantId")
        AttestationAutomatique attestationAutomatiqueRequestDTOToAttestationAutomatique(
                        AttestationAutomatiqueRequestDTO dto);

        // Mapping from AttestationAvecValidationRequestDTO to Attestation
        @Mapping(target = "id", ignore = true)
        @Mapping(target = "createdAt", ignore = true)
        @Mapping(target = "updatedAt", ignore = true)
        @Mapping(target = "demandeAttestations", ignore = true)
        @Mapping(source = "url", target = "url")
        @Mapping(source = "typeAttestationValidation", target = "typeAttestationValidation")
        @Mapping(target = "etatAttestation", ignore = true)
        @Mapping(source = "doctorantId", target = "doctorantId")
        AttestationAvecValidation attestationAvecValidationRequestDTOToAttestationAvecValidation(
                        AttestationAvecValidationRequestDTO dto);

        // Mapping for automatic response

        AttestationAutomatiqueResponseDTO attestationAutomatiqueToAttestationAutomatiqueResponseDTO(
                        AttestationAutomatique attestation);

        // Mapping for validation-required response
        AttestationAvecValidationResponseDTO attestationAvecValidationToAttestationAvecValidationResponseDTO(
                        AttestationAvecValidation attestation);

        // Update an existing AttestationAvecValidation (used for PATCH/PUT)
        @Mapping(target = "id", ignore = true)
        @Mapping(target = "createdAt", ignore = true)
        @Mapping(target = "updatedAt", ignore = true)
        @Mapping(target = "demandeAttestations", ignore = true)
        @Mapping(target = "url", ignore = true)
        @Mapping(target = "typeAttestationValidation", ignore = true)
        void updateEtatAttestationAvecValidationFromDTO(AttestationAvecValidationUpdateDTO dto,
                        @MappingTarget AttestationAvecValidation entity);

        /*--------------------------------------------------------------------------HELPERS---------------------------------------------------------------------------------*/

        // Add any custom logic here, e.g., mapping utilisateurId to user entity if
        // needed
}
