package ma.inpt.cedoc.web.AttestationControllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Attestation.*;
import ma.inpt.cedoc.model.enums.doctorant_enums.TypeAttestationAutoEnum;
import ma.inpt.cedoc.model.enums.doctorant_enums.TypeAttestationValidationEnum;
import ma.inpt.cedoc.service.AttestationService.AttestationService;
import org.springframework.http.*;
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

    /* ------------------ Generate ------------------ */

    @GetMapping("/automatique/generate")
    public ResponseEntity<byte[]> generateAttestationAutomatique(
            @RequestParam Long doctorantId,
            @RequestParam TypeAttestationAutoEnum typeAttestationAuto
    ) {
        try {
            byte[] pdfBytes = attestationService.generateAttestationAutomatique(doctorantId, typeAttestationAuto);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDisposition(ContentDisposition.attachment()
                    .filename("attestationAutomatique.pdf")
                    .build());

            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    @GetMapping("/avec-validation/generate")
    public ResponseEntity<byte[]> generateAttestationAvecValidation(
            @RequestParam Long doctorantId,
            @RequestParam TypeAttestationValidationEnum typeAttestationValidation
    ) {
        try {
            byte[] pdfBytes = attestationService.generateAttestationAvecValidation(doctorantId, typeAttestationValidation);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDisposition(ContentDisposition.attachment()
                    .filename("attestationAvecValidation.pdf")
                    .build());

            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
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

    /* ------------------ Search by Type ------------------ */
    @GetMapping("/automatique/search")
    public ResponseEntity<List<AttestationAutomatiqueResponseDTO>> searchAutomatiqueByName(@RequestParam TypeAttestationAutoEnum typeAttestationAuto) {
        return ResponseEntity.ok(attestationService.findAutomatiqueByType(typeAttestationAuto));
    }

    @GetMapping("/avec-validation/search")
    public ResponseEntity<List<AttestationAvecValidationResponseDTO>> searchAvecValidationByName(@RequestParam TypeAttestationValidationEnum typeAttestationValidation) {
        return ResponseEntity.ok(attestationService.findAvecValidationByType(typeAttestationValidation));
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

    /* ------------------ Update ------------------ */
    @PatchMapping("/avec-validation/{id}/etat")
    public ResponseEntity<AttestationAvecValidationResponseDTO> updateEtat(
            @PathVariable Long id,
            @RequestBody AttestationAvecValidationUpdateDTO dto) {
        return ResponseEntity.ok(attestationService.updateEtatAttestationAvecValidation(id, dto));
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
