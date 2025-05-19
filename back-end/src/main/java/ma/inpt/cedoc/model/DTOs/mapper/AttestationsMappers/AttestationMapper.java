package ma.inpt.cedoc.model.DTOs.mapper.AttestationsMappers;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

import ma.inpt.cedoc.model.DTOs.Attestation.AttestationAutomatiqueRequestDTO;
import ma.inpt.cedoc.model.DTOs.Attestation.AttestationAutomatiqueResponseDTO;
import ma.inpt.cedoc.model.DTOs.Attestation.AttestationAvecValidationRequestDTO;
import ma.inpt.cedoc.model.DTOs.Attestation.AttestationAvecValidationResponseDTO;
import ma.inpt.cedoc.model.DTOs.Attestation.AttestationAvecValidationUpdateDTO;
import ma.inpt.cedoc.model.entities.attestation.AttestationAutomatique;
import ma.inpt.cedoc.model.entities.attestation.AttestationAvecValidation;

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
