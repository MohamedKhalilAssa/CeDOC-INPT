package ma.inpt.cedoc.service.AttestationService;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.repositories.AttestationRepositories.AttestationAutomatiqueRepository;
import ma.inpt.cedoc.repositories.AttestationRepositories.AttestationAvecValidationRepository;
import ma.inpt.cedoc.repositories.model.DTOs.Attestation.*;
import ma.inpt.cedoc.repositories.model.DTOs.mapper.AttestationsMappers.AttestationMapper;
import ma.inpt.cedoc.repositories.model.entities.attestation.Attestation;
import ma.inpt.cedoc.repositories.model.entities.attestation.AttestationAutomatique;
import ma.inpt.cedoc.repositories.model.entities.attestation.AttestationAvecValidation;
import ma.inpt.cedoc.repositories.model.enums.doctorant_enums.TypeAttestationAutoEnum;
import ma.inpt.cedoc.repositories.model.enums.doctorant_enums.TypeAttestationValidationEnum;

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
        AttestationAutomatique attestation = attestationMapper
                .attestationAutomatiqueRequestDTOToAttestationAutomatique(dto);
        AttestationAutomatique saved = attestationAutomatiqueRepository.save(attestation);
        return attestationMapper.attestationAutomatiqueToAttestationAutomatiqueResponseDTO(saved);
    }

    @Override
    public AttestationAvecValidationResponseDTO saveAttestationAvecValidation(AttestationAvecValidationRequestDTO dto) {
        AttestationAvecValidation attestation = attestationMapper
                .attestationAvecValidationRequestDTOToAttestationAvecValidation(dto);
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

    // @Override
    public List<Attestation> getAllAttestations() {
        return List.of();
        // return
        // attestationRepository.findAll().stream().map(attestationMapper::attestationToAttestationResponseDTO)
        // .collect(Collectors.toList());
        // ;
    }

    @Override
    public List<AttestationAvecValidationResponseDTO> getAllAttestationsAvecValidation() {
        return attestationAvecValidationRepository.findAll().stream()
                .map(attestationMapper::attestationAvecValidationToAttestationAvecValidationResponseDTO)
                .collect(Collectors.toList());
    }

    /* ------------------ Find by type methods ------------------ */

    @Override
    public List<AttestationAutomatiqueResponseDTO> findAutomatiqueByType(
            TypeAttestationAutoEnum typeAttestationAutomatique) {
        return attestationAutomatiqueRepository.findByTypeAttestationAutomatique(typeAttestationAutomatique).stream()
                .map(attestationMapper::attestationAutomatiqueToAttestationAutomatiqueResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AttestationAvecValidationResponseDTO> findAvecValidationByType(
            TypeAttestationValidationEnum typeAttestationValidation) {
        return attestationAvecValidationRepository.findByTypeAttestationValidation(typeAttestationValidation).stream()
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

    /* ------------------ Update ------------------ */

    @Override
    public AttestationAvecValidationResponseDTO updateEtatAttestationAvecValidation(Long id,
            AttestationAvecValidationUpdateDTO dto) {
        AttestationAvecValidation entity = attestationAvecValidationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Attestation not found"));
        attestationMapper.updateEtatAttestationAvecValidationFromDTO(dto, entity);
        AttestationAvecValidation updated = attestationAvecValidationRepository.save(entity);
        return attestationMapper.attestationAvecValidationToAttestationAvecValidationResponseDTO(updated);
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
