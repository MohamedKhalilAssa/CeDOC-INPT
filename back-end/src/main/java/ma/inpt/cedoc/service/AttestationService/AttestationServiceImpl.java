package ma.inpt.cedoc.service.AttestationService;

import java.util.List;
import java.util.stream.Collectors;

import ma.inpt.cedoc.model.DTOs.Attestation.AttestationAvecValidationRequestDTO;
import ma.inpt.cedoc.model.entities.attestation.AttestationAutomatique;
import ma.inpt.cedoc.model.entities.attestation.AttestationAvecValidation;
import ma.inpt.cedoc.repositories.AttestationRepositories.AttestationAutomatiqueRepository;
import ma.inpt.cedoc.repositories.AttestationRepositories.AttestationAvecValidationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Attestation.AttestationAutomatiqueRequestDTO;
import ma.inpt.cedoc.model.DTOs.Attestation.AttestationAutomatiqueResponseDTO;
import ma.inpt.cedoc.model.DTOs.Attestation.AttestationAvecValidationResponseDTO;
import ma.inpt.cedoc.model.DTOs.mapper.AttestationsMappers.AttestationMapper;
import ma.inpt.cedoc.model.entities.attestation.Attestation;


@Service
@RequiredArgsConstructor
@Transactional
public class AttestationServiceImpl implements AttestationService {

    private final AttestationAutomatiqueRepository attestationAutomatiqueRepository;
    private final AttestationAvecValidationRepository attestationAvecValidationRepository;
    private final AttestationMapper attestationMapper;

    /* ------------------ Save methods ------------------ */

    @Override
    public AttestationAutomatiqueResponseDTO saveAttestationAutomatique(AttestationAutomatiqueRequestDTO dto) {
        AttestationAutomatique attestation = attestationMapper.attestationAutomatiqueRequestDTOToAttestationAutomatique(dto);
        AttestationAutomatique saved = attestationAutomatiqueRepository.save(attestation);
        return attestationMapper.attestationAutomatiqueToAttestationAutomatiqueResponseDTO(saved);
    }

    @Override
    public AttestationAvecValidationResponseDTO saveAttestationAvecValidation(AttestationAvecValidationRequestDTO dto) {
        AttestationAvecValidation attestation = attestationMapper.attestationAvecValidationRequestDTOToAttestationAvecValidation(dto);
        AttestationAvecValidation saved = attestationAvecValidationRepository.save(attestation);
        return attestationMapper.attestationAvecValidationToAttestationAvecValidationResponseDTO(saved);
    }

    /* ------------------ Get all methods ------------------ */

    @Override
    public List<AttestationAutomatiqueResponseDTO> getAllAttestationsAutomatiques() {
        return attestationAutomatiqueRepository.findAll().stream()
                .map(attestationMapper::attestationAutomatiqueToAttestationAutomatiqueResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AttestationAvecValidationResponseDTO> getAllAttestationsAvecValidation() {
        return attestationAvecValidationRepository.findAll().stream()
                .map(attestationMapper::attestationAvecValidationToAttestationAvecValidationResponseDTO)
                .collect(Collectors.toList());
    }

    /* ------------------ Find by name methods ------------------ */

    @Override
    public List<AttestationAutomatiqueResponseDTO> findAutomatiqueByName(String name) {
        return attestationAutomatiqueRepository.findByTitreContainingIgnoreCase(name).stream()
                .map(attestationMapper::attestationAutomatiqueToAttestationAutomatiqueResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AttestationAvecValidationResponseDTO> findAvecValidationByName(String name) {
        return attestationAvecValidationRepository.findByTitreContainingIgnoreCase(name).stream()
                .map(attestationMapper::attestationAvecValidationToAttestationAvecValidationResponseDTO)
                .collect(Collectors.toList());
    }

    /* ------------------ Find by ID ------------------ */

    @Override
    public AttestationAutomatiqueResponseDTO findAutomatiqueById(Long id) {
        AttestationAutomatique attestation = attestationAutomatiqueRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Attestation non trouvée"));
        return attestationMapper.attestationAutomatiqueToAttestationAutomatiqueResponseDTO(attestation);
    }

    @Override
    public AttestationAvecValidationResponseDTO findAvecValidationById(Long id) {
        AttestationAvecValidation attestation = attestationAvecValidationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Attestation non trouvée"));
        return attestationMapper.attestationAvecValidationToAttestationAvecValidationResponseDTO(attestation);
    }

    /* ------------------ Delete ------------------ */

    @Override
    public void deleteAttestationAutomatiqueById(Long id) {
        if (!attestationAutomatiqueRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Attestation non trouvée pour suppression");
        }
        attestationAutomatiqueRepository.deleteById(id);
    }

    @Override
    public void deleteAttestationAvecValidationById(Long id) {
        if (!attestationAvecValidationRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Attestation non trouvée pour suppression");
        }
        attestationAvecValidationRepository.deleteById(id);
    }
}
