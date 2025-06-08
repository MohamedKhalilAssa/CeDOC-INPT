package ma.inpt.cedoc.web.Utilisateurs;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.NationaliteRequestDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.NationaliteResponseDTO;
import ma.inpt.cedoc.service.utilisateurServices.NationaliteService;

// TODO: Add security imports when implementing security annotations:
// import org.springframework.security.access.annotation.Secured;
// import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/nationalites")
@RequiredArgsConstructor
public class NationaliteController {

    private final NationaliteService nationaliteService;

    /* ------------------ Create ------------------ */
    // TODO: Add appropriate role-based security
    // @Secured("ADMIN") - Only administrators should create new nationalités
    @PostMapping
    public ResponseEntity<NationaliteResponseDTO> createNationalite(
            @RequestBody @Valid NationaliteRequestDTO requestDTO) {
        NationaliteResponseDTO created = nationaliteService.saveNationalite(requestDTO);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // TODO: Add appropriate role-based security
    // @Secured("ADMIN") - Only administrators should create multiple nationalités
    @PostMapping("/batch")
    public ResponseEntity<List<NationaliteResponseDTO>> createNationalites(
            @RequestBody @Valid List<NationaliteRequestDTO> requestDTOs) {
        List<NationaliteResponseDTO> created = nationaliteService.saveNationalites(requestDTOs);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    /* ------------------ Update ------------------ */
    // TODO: Add appropriate role-based security
    // @Secured("ADMIN") - Only administrators should update nationalités
    @PutMapping("/{id}")
    public ResponseEntity<NationaliteResponseDTO> updateNationalite(@PathVariable Long id,
            @RequestBody @Valid NationaliteRequestDTO requestDTO) {
        NationaliteResponseDTO updated = nationaliteService.updateNationalite(requestDTO, id);
        return ResponseEntity.ok(updated);
    }

    /* ------------------ Delete ------------------ */
    // TODO: Add appropriate role-based security
    // @Secured("ADMIN") - Only administrators should delete nationalités
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNationalite(@PathVariable Long id) {
        nationaliteService.deleteNationaliteById(id);
        return ResponseEntity.noContent().build();
    }

    // TODO: Add appropriate role-based security
    // @Secured("ADMIN") - Only administrators should delete all nationalités
    @DeleteMapping
    public ResponseEntity<Void> deleteAllNationalites() {
        nationaliteService.deleteAllNationalites();
        return ResponseEntity.noContent().build();
    }

    /* ------------------ Get ------------------ */
    // TODO: Public access or role-based security
    // @PreAuthorize("permitAll()") - Allow public read access to nationalités
    @GetMapping("/{id}")
    public ResponseEntity<NationaliteResponseDTO> getNationaliteById(@PathVariable Long id) {
        NationaliteResponseDTO nationalite = nationaliteService.getNationaliteById(id);
        return ResponseEntity.ok(nationalite);
    }

    // TODO: Public access or role-based security
    // @PreAuthorize("permitAll()") - Allow public read access to all nationalités
    @GetMapping
    public ResponseEntity<List<NationaliteResponseDTO>> getAllNationalites() {
        List<NationaliteResponseDTO> nationalites = nationaliteService.getAllNationalites();
        return ResponseEntity.ok(nationalites);
    }

    /* ------------------ Utility ------------------ */
    // TODO: Public access or role-based security
    // @PreAuthorize("permitAll()") - Allow public read access to check existence
    @GetMapping("/{id}/exists")
    public ResponseEntity<Boolean> checkIfNationaliteExists(@PathVariable Long id) {
        boolean exists = nationaliteService.existsById(id);
        return ResponseEntity.ok(exists);
    }
}
