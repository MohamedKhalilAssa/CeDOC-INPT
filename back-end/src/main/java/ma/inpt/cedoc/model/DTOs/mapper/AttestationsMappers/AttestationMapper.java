package ma.inpt.cedoc.model.DTOs.mapper.AttestationsMappers;

import ma.inpt.cedoc.model.entities.attestation.AttestationAutomatique;
import ma.inpt.cedoc.model.entities.attestation.AttestationAvecValidation;
import org.mapstruct.*;
import ma.inpt.cedoc.model.DTOs.Attestation.AttestationAvecValidationRequestDTO;
import ma.inpt.cedoc.model.DTOs.Attestation.AttestationAutomatiqueRequestDTO;
import ma.inpt.cedoc.model.DTOs.Attestation.AttestationAutomatiqueResponseDTO;
import ma.inpt.cedoc.model.DTOs.Attestation.AttestationAvecValidationResponseDTO;


@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface AttestationMapper {

    // Mapping from AttestationAutomatiqueRequestDTO to AttestationAutomatique
//    @Mapping(target = "id", ignore = true)
//    @Mapping(target = "createdAt", ignore = true)
//    @Mapping(target = "updatedAt", ignore = true)
    AttestationAutomatique attestationAutomatiqueRequestDTOToAttestationAutomatique(AttestationAutomatiqueRequestDTO dto);

    // Mapping from AttestationAvecValidationRequestDTO to AttestationAvecValidation
//    @Mapping(target = "id", ignore = true)
//    @Mapping(target = "createdAt", ignore = true)
//    @Mapping(target = "updatedAt", ignore = true)
    AttestationAvecValidation attestationAvecValidationRequestDTOToAttestationAvecValidation(AttestationAvecValidationRequestDTO dto);

    // Mapping for automatic response
    AttestationAutomatiqueResponseDTO attestationAutomatiqueToAttestationAutomatiqueResponseDTO(AttestationAutomatique attestation);

    // Mapping for validation-required response
    AttestationAvecValidationResponseDTO attestationAvecValidationToAttestationAvecValidationResponseDTO(AttestationAvecValidation attestation);

    // Update an existing AttestationAutomatique (used for PATCH/PUT)
//    @Mapping(target = "id", ignore = true)
//    @Mapping(target = "createdAt", ignore = true)
//    @Mapping(target = "updatedAt", ignore = true)
    void updateAttestationAutomatiqueFromDTO(AttestationAutomatiqueRequestDTO dto, @MappingTarget AttestationAutomatique entity);

    // Update an existing AttestationAvecValidation (used for PATCH/PUT)
//    @Mapping(target = "id", ignore = true)
//    @Mapping(target = "createdAt", ignore = true)
//    @Mapping(target = "updatedAt", ignore = true)
    void updateAttestationAvecValidationFromDTO(AttestationAutomatiqueRequestDTO dto, @MappingTarget AttestationAvecValidation entity);

    /*--------------------------------------------------------------------------HELPERS---------------------------------------------------------------------------------*/

    // Add any custom logic here, e.g., mapping utilisateurId to user entity if needed
}

