package ma.inpt.cedoc.web.AttestationControllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Attestation.AttestationAutomatiqueResponseDTO;
import ma.inpt.cedoc.model.DTOs.Attestation.AttestationAvecValidationRequestDTO;
import ma.inpt.cedoc.model.DTOs.Attestation.AttestationAvecValidationResponseDTO;
import ma.inpt.cedoc.model.DTOs.Attestation.AttestationAutomatiqueRequestDTO;
import ma.inpt.cedoc.service.AttestationService.AttestationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attestations")
@RequiredArgsConstructor
public class AttestationController {

    private final AttestationService attestationService;

    /* ------------------ Save ------------------ */
    @PostMapping("/automatique")
    public ResponseEntity<AttestationAutomatiqueResponseDTO> createAttestationAutomatique(
            @RequestBody @Valid AttestationAutomatiqueRequestDTO dto) {
        var saved = attestationService.saveAttestationAutomatique(dto);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/avec-validation")
    public ResponseEntity<AttestationAvecValidationResponseDTO> createAttestationAvecValidation(
            @RequestBody @Valid AttestationAvecValidationRequestDTO dto) {
        var saved = attestationService.saveAttestationAvecValidation(dto);
        return ResponseEntity.ok(saved);
    }

    /* ------------------ Get All ------------------ */
    @GetMapping("/automatique")
    public ResponseEntity<List<AttestationAutomatiqueResponseDTO>> getAllAutomatique() {
        return ResponseEntity.ok(attestationService.getAllAttestationsAutomatiques());
    }

    @GetMapping("/avec-validation")
    public ResponseEntity<List<AttestationAvecValidationResponseDTO>> getAllAvecValidation() {
        return ResponseEntity.ok(attestationService.getAllAttestationsAvecValidation());
    }

    /* ------------------ Search by Name ------------------ */
    @GetMapping("/automatique/search")
    public ResponseEntity<List<AttestationAutomatiqueResponseDTO>> searchAutomatiqueByName(@RequestParam String name) {
        return ResponseEntity.ok(attestationService.findAutomatiqueByName(name));
    }

    @GetMapping("/avec-validation/search")
    public ResponseEntity<List<AttestationAvecValidationResponseDTO>> searchAvecValidationByName(@RequestParam String name) {
        return ResponseEntity.ok(attestationService.findAvecValidationByName(name));
    }

    /* ------------------ Find by ID ------------------ */
    @GetMapping("/automatique/{id}")
    public ResponseEntity<AttestationAutomatiqueResponseDTO> getAutomatiqueById(@PathVariable Long id) {
        return ResponseEntity.ok(attestationService.findAutomatiqueById(id));
    }

    @GetMapping("/avec-validation/{id}")
    public ResponseEntity<AttestationAvecValidationResponseDTO> getAvecValidationById(@PathVariable Long id) {
        return ResponseEntity.ok(attestationService.findAvecValidationById(id));
    }

    /* ------------------ Delete ------------------ */
    @DeleteMapping("/automatique/{id}")
    public ResponseEntity<String> removeAttestationAutomatique(@PathVariable Long id) {
        attestationService.deleteAttestationAutomatiqueById(id);
        return ResponseEntity.ok("Attestation supprimée avec succès");
    }

    @DeleteMapping("/avec-validation/{id}")
    public ResponseEntity<String> removeAttestationAvecValidation(@PathVariable Long id) {
        attestationService.deleteAttestationAvecValidationById(id);
        return ResponseEntity.ok("Attestation supprimée avec succès");
    }
}
