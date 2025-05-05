package ma.inpt.cedoc.service.AttestationService;

import ma.inpt.cedoc.model.DTOs.Attestation.AttestationAutomatiqueResponseDTO;
import ma.inpt.cedoc.model.DTOs.Attestation.AttestationAvecValidationRequestDTO;
import ma.inpt.cedoc.model.DTOs.Attestation.AttestationAvecValidationResponseDTO;
import ma.inpt.cedoc.model.DTOs.Attestation.AttestationAutomatiqueRequestDTO;
import java.util.List;

public interface AttestationService {


    /* ------------------ Save methods ------------------ */
    AttestationAutomatiqueResponseDTO saveAttestationAutomatique(AttestationAutomatiqueRequestDTO dto);

    AttestationAvecValidationResponseDTO saveAttestationAvecValidation(AttestationAvecValidationRequestDTO dto);

    /* ------------------ Get All ------------------ */
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
