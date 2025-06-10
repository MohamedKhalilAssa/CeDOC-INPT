package ma.inpt.cedoc.web.AttestationControllers;

import com.lowagie.text.DocumentException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.inpt.cedoc.Exceptions.UserNotFoundException;
import ma.inpt.cedoc.model.DTOs.Attestation.*;
import ma.inpt.cedoc.model.enums.doctorant_enums.TypeAttestationAutoEnum;
import ma.inpt.cedoc.model.enums.doctorant_enums.TypeAttestationValidationEnum;
import ma.inpt.cedoc.service.AttestationService.AttestationService;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/attestations")
@RequiredArgsConstructor
@Slf4j
public class AttestationController {

    private final AttestationService attestationService;

    /* ------------------ Save ------------------ */
    @PostMapping("/automatique/generate-send")
    public ResponseEntity<AttestationAutomatiqueResponseDTO> generateAndSendAttestation(
            @RequestBody AttestationAutomatiqueRequestDTO request,
            @AuthenticationPrincipal Object principal) {
        try {
            String username;
            if (principal instanceof UserDetails) {
                username = ((UserDetails) principal).getUsername();
            } else if (principal instanceof Principal) {
                username = ((Principal) principal).getName();
            } else {
                username = principal.toString();
            }
            AttestationAutomatiqueResponseDTO response = attestationService
                    .generateAndSendAttestationAutomatique(request.getTypeAttestationAutomatique(), username);

            return ResponseEntity.ok(response);
        } catch (UserNotFoundException e) {
            log.error("User not found: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(AttestationAutomatiqueResponseDTO.builder()
                            .success(false)
                            .message("Utilisateur non trouvé")
                            .build());
        } catch (Exception e) {
            log.error("Error generating attestation: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(AttestationAutomatiqueResponseDTO.builder()
                            .success(false)
                            .message("Erreur lors de la génération de l'attestation")
                            .build());
        }
    }

    @PostMapping("/avec-validation")
    public ResponseEntity<AttestationAvecValidationResponseDTO> requestAttestationAvecValidation(
            @RequestBody DoctorantRequestDTO request) {
        var saved = attestationService.requestAttestationAvecValidation(request);
        return ResponseEntity.ok(saved);
    }

    /* ------------------ Generate ------------------ */

    @GetMapping("/automatique/generate")
    public ResponseEntity<byte[]> generateAttestationAutomatique(@RequestBody DoctorantRequestDTO request) {
        try {
            Map<String, Object> data = new HashMap<>();
            data.put("fullName", request.getUtilisateur().getNom() + " " + request.getUtilisateur().getPrenom());
            data.put("cne", request.getCne());
            data.put("cin", request.getCin());
            data.put("birthDate", request.getUtilisateur().getDateNaissance());
            data.put("birthPlace", request.getUtilisateur().getLieuDeNaissance());
            data.put("firstEnrollmentDate", request.getFirstEnrollmentDate());
            data.put("researchTeam", request.getResearchTeamId());
            data.put("currentYear", request.getCurrentYear());
            data.put("currentLevel", request.getCurrentLevel());
            data.put("cycle", request.getCycle());

            byte[] pdfBytes = attestationService.generateAttestationAutomatique(data);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "attestation.pdf");
            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);

        } catch (IOException | DocumentException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

//    @GetMapping("/avec-validation/generate")
//    public ResponseEntity<byte[]> generateAttestationAvecValidation(
//            @RequestParam Long doctorantId,
//            @RequestParam TypeAttestationValidationEnum typeAttestationValidation
//    ) {
//        try {
//            byte[] pdfBytes = attestationService.generateAttestationAvecValidation(doctorantId, typeAttestationValidation);
//
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.APPLICATION_PDF);
//            headers.setContentDisposition(ContentDisposition.attachment()
//                    .filename("attestationAvecValidation.pdf")
//                    .build());
//
//            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(null);
//        }
//    }

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
    @PreAuthorize("hasRole('ADMIN')")
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
