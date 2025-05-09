package ma.inpt.cedoc.service.AttestationService;

import java.util.List;

import ma.inpt.cedoc.model.DTOs.Attestation.AttestationAutomatiqueRequestDTO;
import ma.inpt.cedoc.model.DTOs.Attestation.AttestationAutomatiqueResponseDTO;
import ma.inpt.cedoc.model.DTOs.Attestation.AttestationAvecValidationRequestDTO;
import ma.inpt.cedoc.model.DTOs.Attestation.AttestationAvecValidationResponseDTO;
import ma.inpt.cedoc.model.entities.attestation.Attestation;

public interface AttestationService {

    /* ------------------ Save methods ------------------ */
    AttestationAutomatiqueResponseDTO saveAttestationAutomatique(AttestationAutomatiqueRequestDTO dto);

    AttestationAvecValidationResponseDTO saveAttestationAvecValidation(AttestationAvecValidationRequestDTO dto);

    /* ------------------ Get All ------------------ */
    List<Attestation> getAllAttestations();

    List<AttestationAutomatiqueResponseDTO> getAllAttestationsAutomatiques();

    List<AttestationAvecValidationResponseDTO> getAllAttestationsAvecValidation();

    /* ------------------ Find by Name ------------------ */
    List<AttestationAutomatiqueResponseDTO> findAutomatiqueByName(String name);

    List<AttestationAvecValidationResponseDTO> findAvecValidationByName(String name);

    /* ------------------ Find by ID ------------------ */
    AttestationAutomatiqueResponseDTO findAutomatiqueById(Long id);

    AttestationAvecValidationResponseDTO findAvecValidationById(Long id);

    /* ------------------ Delete ------------------ */
    void deleteAttestationAutomatiqueById(Long id);

    void deleteAttestationAvecValidationById(Long id);
}
