package ma.inpt.cedoc.web.FormationControllers;

import jakarta.validation.Valid;
import ma.inpt.cedoc.model.DTOs.Formations.FormationResponseDTO;
import ma.inpt.cedoc.model.DTOs.Formations.FormationRequestDTO;
import ma.inpt.cedoc.model.entities.formation.Formation;
import ma.inpt.cedoc.model.DTOs.auth.AuthenticationResponse;
import ma.inpt.cedoc.service.FormationService.FormationServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/formations")
@RequiredArgsConstructor
public class FormationController {

    private final FormationServiceImpl formationServiceImpl;

    @PostMapping
    public ResponseEntity<?> createFormation(@RequestBody @Valid FormationRequestDTO formationRequestDTO) {
        try {
            FormationResponseDTO savedFormation = formationServiceImpl.saveFormation(formationRequestDTO);
            return ResponseEntity.ok(savedFormation);
        } catch (ResponseStatusException e) {
            return handleResponseStatusException(e);
        } catch (Exception e) {
            return handleException(e, HttpStatus.BAD_REQUEST, "Erreur lors de la création de la formation");
        }
    }

    @PostMapping("/raw")
    public ResponseEntity<?> createFormationWithoutDto(@RequestBody Formation formation) {
        try {
            FormationResponseDTO savedFormation = formationServiceImpl.saveFormationWithoutDto(formation);
            return ResponseEntity.ok(savedFormation);
        } catch (ResponseStatusException e) {
            return handleResponseStatusException(e);
        } catch (Exception e) {
            return handleException(e, HttpStatus.BAD_REQUEST, "Erreur lors de la création brute de la formation");
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchByName(@RequestParam String name) {
        try {
            List<FormationResponseDTO> formations = formationServiceImpl.findByName(name);
            return ResponseEntity.ok(formations);
        } catch (ResponseStatusException e) {
            return handleResponseStatusException(e);
        } catch (Exception e) {
            return handleException(e, HttpStatus.INTERNAL_SERVER_ERROR, "Erreur lors de la recherche de formation");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateFormation(@PathVariable Long id, @RequestBody @Valid FormationRequestDTO formationRequestDTO) {
        try {
            FormationResponseDTO updatedFormation = formationServiceImpl.updateFormation(id, formationRequestDTO);
            return ResponseEntity.ok(updatedFormation);
        } catch (ResponseStatusException e) {
            return handleResponseStatusException(e);
        } catch (Exception e) {
            return handleException(e, HttpStatus.BAD_REQUEST, "Erreur lors de la mise à jour de la formation");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFormation(@PathVariable Long id) {
        try {
            formationServiceImpl.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (ResponseStatusException e) {
            return handleResponseStatusException(e);
        } catch (Exception e) {
            return handleException(e, HttpStatus.INTERNAL_SERVER_ERROR, "Erreur lors de la suppression de la formation");
        }
    }

    @GetMapping("/by-doctorant")
    public ResponseEntity<?> getFormationsByDoctorant(@RequestParam Long doctorantId) {
        try {
            List<FormationResponseDTO> formations = formationServiceImpl.findFormationsByDoctorantId(doctorantId);
            return ResponseEntity.ok(formations);
        } catch (ResponseStatusException e) {
            return handleResponseStatusException(e);
        } catch (Exception e) {
            return handleException(e, HttpStatus.INTERNAL_SERVER_ERROR, "Erreur lors de la récupération des formations du doctorant");
        }
    }

    // --- Helper methods ---

    private ResponseEntity<AuthenticationResponse> handleException(Exception e, HttpStatus status, String defaultMessage) {
        return ResponseEntity.status(status).body(
                AuthenticationResponse.builder()
                        .statusCode(status.value())
                        .message(defaultMessage + ": " + e.getMessage())
                        .build()
        );
    }

    private ResponseEntity<AuthenticationResponse> handleResponseStatusException(ResponseStatusException e) {
        return ResponseEntity.status(e.getStatusCode()).body(
                AuthenticationResponse.builder()
                        .statusCode(e.getStatusCode().value())
                        .message(e.getReason())
                        .build()
        );
    }

}
