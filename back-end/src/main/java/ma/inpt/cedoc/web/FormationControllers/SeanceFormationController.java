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
    @PreAuthorize("hasAuthority('DOCTORANT')")
    public ResponseEntity<SeanceFormationResponseDTO> createSeanceFormation(
            @RequestBody SeanceFormationRequestDTO dto) {
        SeanceFormationResponseDTO created = seanceFormationService.createSeanceFormation(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('RESPONSABLE_FORMATION')")
    public ResponseEntity<SeanceFormationResponseDTO> updateSeanceFormation(@PathVariable Long id,
            @RequestBody SeanceFormationRequestDTO dto) {
        SeanceFormationResponseDTO updated = seanceFormationService.updateSeanceFormation(id, dto);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('DOCTORANT')")
    public ResponseEntity<SeanceFormationResponseDTO> getSeanceFormationById(@PathVariable Long id) {
        SeanceFormationResponseDTO response = seanceFormationService.getSeanceFormationById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('DOCTORANT')")
    public ResponseEntity<List<SeanceFormationResponseDTO>> getAllSeanceFormations() {
        List<SeanceFormationResponseDTO> list = seanceFormationService.getAllSeanceFormations();
        return ResponseEntity.ok(list);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('RESPONSABLE_FORMATION')")
    public ResponseEntity<Void> deleteSeanceFormation(@PathVariable Long id) {
        seanceFormationService.deleteSeanceFormation(id);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/validated/duree")
    public ResponseEntity<Long> getValidatedDureeByFormationAndDoctorant(
            @RequestParam Long formationId,
            @RequestParam Long doctorantUtilisateurId
    ) {
        Long sum = seanceFormationService.getValidatedDureeByFormationAndDoctorant(formationId, doctorantUtilisateurId);
        return ResponseEntity.ok(sum);
    }


    @GetMapping("/sum-duree/by-declarant")
    public ResponseEntity<Long> getSumDureeByDeclarant(
            @RequestParam Long declarantId) {
        Long sum = seanceFormationService.getSumDureeByDeclarant(declarantId);
        return ResponseEntity.ok(sum);
    }

    @PreAuthorize("hasAuthority('DOCTORANT')")
    @GetMapping("/validated/doctorant/{doctorantUtilisateurId}")
    public List<FormationResponseDTO> getValidatedFormations(@PathVariable Long doctorantUtilisateurId) {
        return seanceFormationService.getValidatedFormationsByDoctorant(doctorantUtilisateurId);
    }

    @GetMapping("/validated/duree/total")
    @PreAuthorize("hasAuthority('DOCTORANT')")
    public ResponseEntity<Long> getValidatedSumDuree(@RequestParam Long doctorantUtilisateurId) {
        Long sum = seanceFormationService.getValidatedSumDureeByDeclarant(doctorantUtilisateurId);
        return ResponseEntity.ok(sum);
    }

    @GetMapping("/doctorant/{doctorantUtilisateurId}")
    @PreAuthorize("hasAuthority('DOCTORANT')")
    public ResponseEntity<List<SeanceFormationResponseDTO>> getSeanceFormationByDoctorantUtilisateurId(@PathVariable Long doctorantUtilisateurId) {
        List<SeanceFormationResponseDTO> response = seanceFormationService.getDeclaredSeancesByDoctorantUtilisateurId(doctorantUtilisateurId);
        return ResponseEntity.ok(response);
    }


}
