package ma.inpt.cedoc.service.AttestationService;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import ma.inpt.cedoc.model.DTOs.Attestation.*;
import ma.inpt.cedoc.model.entities.attestation.Attestation;
import ma.inpt.cedoc.model.enums.doctorant_enums.TypeAttestationAutoEnum;
import ma.inpt.cedoc.model.enums.doctorant_enums.TypeAttestationValidationEnum;

public interface AttestationService {

    /* ------------------ Save & Send methods ------------------ */
    public AttestationAutomatiqueResponseDTO generateAndSendAttestationAutomatique(TypeAttestationAutoEnum type, String email) throws IOException;

    AttestationAvecValidationResponseDTO requestAttestationAvecValidation(DoctorantRequestDTO request);

    /* ------------------ Generate methods ------------------ */
    byte[] generateAttestationAutomatique(Map<String, Object> data) throws IOException;

    byte[] generateAttestationAvecValidation(Map<String, Object> data) throws IOException;

    /* ------------------ Get All ------------------ */
    List<Attestation> getAllAttestations();

    List<AttestationAutomatiqueResponseDTO> getAllAttestationsAutomatiques();

    List<AttestationAvecValidationResponseDTO> getAllAttestationsAvecValidation();

    /* ------------------ Find by Type ------------------ */
    List<AttestationAutomatiqueResponseDTO> findAutomatiqueByType(TypeAttestationAutoEnum typeAttestationAutomatique);

    List<AttestationAvecValidationResponseDTO> findAvecValidationByType(TypeAttestationValidationEnum typeAttestationValidation);

    /* ------------------ Find by ID ------------------ */
    AttestationAutomatiqueResponseDTO findAutomatiqueById(Long id);

    AttestationAvecValidationResponseDTO findAvecValidationById(Long id);

    /* ------------------ Update ------------------ */

    AttestationAvecValidationResponseDTO updateEtatAttestationAvecValidation(Long id, AttestationAvecValidationUpdateDTO dto);


    /* ------------------ Delete ------------------ */
    void deleteAttestationAutomatiqueById(Long id);

    void deleteAttestationAvecValidationById(Long id);
}
