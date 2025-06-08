package ma.inpt.cedoc.web.FormationControllers;

import java.util.List;

import ma.inpt.cedoc.model.DTOs.Formations.FormationResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Formations.SeanceFormationRequestDTO;
import ma.inpt.cedoc.model.DTOs.Formations.SeanceFormationResponseDTO;
import ma.inpt.cedoc.service.FormationService.SeanceFormationService;

@RestController
@RequestMapping("/api/formations/seances-formations")
@RequiredArgsConstructor
public class SeanceFormationController {

    private final SeanceFormationService seanceFormationService;


    @PostMapping
    @PreAuthorize("hasRole('DOCTORANT')")
    public ResponseEntity<SeanceFormationResponseDTO> createSeanceFormation(
            @RequestBody SeanceFormationRequestDTO dto) {
        SeanceFormationResponseDTO created = seanceFormationService.createSeanceFormation(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('RESPONSABLE_FORMATION')")
    public ResponseEntity<SeanceFormationResponseDTO> updateSeanceFormation(@PathVariable Long id,
            @RequestBody SeanceFormationRequestDTO dto) {
        SeanceFormationResponseDTO updated = seanceFormationService.updateSeanceFormation(id, dto);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SeanceFormationResponseDTO> getSeanceFormationById(@PathVariable Long id) {
        SeanceFormationResponseDTO response = seanceFormationService.getSeanceFormationById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<SeanceFormationResponseDTO>> getAllSeanceFormations() {
        List<SeanceFormationResponseDTO> list = seanceFormationService.getAllSeanceFormations();
        return ResponseEntity.ok(list);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('RESPONSABLE_FORMATION')")
    public ResponseEntity<Void> deleteSeanceFormation(@PathVariable Long id) {
        seanceFormationService.deleteSeanceFormation(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/sum-duree/by-formation-and-declarant")
    public ResponseEntity<Long> getSumDureeByFormationAndDeclarant(
            @RequestParam Long formationId,
            @RequestParam Long declarantId) {
        Long sum = seanceFormationService.getSumDureeByFormationAndDeclarant(formationId, declarantId);
        return ResponseEntity.ok(sum);
    }

    @GetMapping("/sum-duree/by-declarant")
    public ResponseEntity<Long> getSumDureeByDeclarant(
            @RequestParam Long declarantId) {
        Long sum = seanceFormationService.getSumDureeByDeclarant(declarantId);
        return ResponseEntity.ok(sum);
    }

    @GetMapping("/validated-formations/by-doctorant")
    @PreAuthorize("hasRole('DOCTORANT')")
    public ResponseEntity<List<FormationResponseDTO>> getValidatedFormationsByDoctorant(@RequestParam Long doctorantId) {
        List<FormationResponseDTO> formations = seanceFormationService.getValidatedFormationsByDoctorant(doctorantId);
        return ResponseEntity.ok(formations);
    }

    @GetMapping("/validated-sum-duree/by-doctorant")
    @PreAuthorize("hasRole('DOCTORANT')")
    public ResponseEntity<Long> getValidatedSumDuree(@RequestParam Long doctorantId) {
        Long sum = seanceFormationService.getValidatedSumDureeByDeclarant(doctorantId);
        return ResponseEntity.ok(sum);
    }


}
