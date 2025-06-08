package ma.inpt.cedoc.web.FormationControllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.repositories.model.DTOs.Formations.SeanceFormationRequestDTO;
import ma.inpt.cedoc.repositories.model.DTOs.Formations.SeanceFormationResponseDTO;
import ma.inpt.cedoc.service.FormationService.SeanceFormationService;

@RestController
@RequestMapping("/api/seances-formations")
@RequiredArgsConstructor
public class SeanceFormationController {

    private final SeanceFormationService seanceFormationService;

    @PostMapping
    public ResponseEntity<SeanceFormationResponseDTO> createSeanceFormation(
            @RequestBody SeanceFormationRequestDTO dto) {
        SeanceFormationResponseDTO created = seanceFormationService.createSeanceFormation(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
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

}
