package ma.inpt.cedoc.web.FormationControllers;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

import ma.inpt.cedoc.model.DTOs.Formations.FormationResponseDTO;
import ma.inpt.cedoc.repositories.formationRepositories.SeanceFormationRepository;
import ma.inpt.cedoc.service.Global.FileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Formations.SeanceFormationRequestDTO;
import ma.inpt.cedoc.model.DTOs.Formations.SeanceFormationResponseDTO;
import ma.inpt.cedoc.service.FormationService.SeanceFormationService;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/formations/seances-formations")
@RequiredArgsConstructor
public class SeanceFormationController {

    private final SeanceFormationService seanceFormationService;
    private final SeanceFormationRepository seanceFormationRepository;
    private final FileService fileService;


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
    @PreAuthorize("hasAnyAuthority('DOCTORANT','RESPONSABLE_FORMATION')")
    public ResponseEntity<SeanceFormationResponseDTO> getSeanceFormationById(@PathVariable Long id) {
        SeanceFormationResponseDTO response = seanceFormationService.getSeanceFormationById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('RESPONSABLE_FORMATION')")
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
    @PreAuthorize("hasAnyAuthority('DOCTORANT','RESPONSABLE_FORMATION')")
    public ResponseEntity<Long> getValidatedDureeByFormationAndDoctorant(
            @RequestParam Long formationId,
            @RequestParam Long doctorantUtilisateurId
    ) {
        Long sum = seanceFormationService.getValidatedDureeByFormationAndDoctorant(formationId, doctorantUtilisateurId);
        return ResponseEntity.ok(sum);
    }

    @PreAuthorize("hasAnyAuthority('DOCTORANT','RESPONSABLE_FORMATION')")
    @GetMapping("/sum-duree/by-declarant")
    public ResponseEntity<Long> getSumDureeByDeclarant(
            @RequestParam Long declarantId) {
        Long sum = seanceFormationService.getSumDureeByDeclarant(declarantId);
        return ResponseEntity.ok(sum);
    }

    @PreAuthorize("hasAnyAuthority('DOCTORANT','RESPONSABLE_FORMATION')")
    @GetMapping("/validated/doctorant/{doctorantUtilisateurId}")
    public List<FormationResponseDTO> getValidatedFormations(@PathVariable Long doctorantUtilisateurId) {
        return seanceFormationService.getValidatedFormationsByDoctorant(doctorantUtilisateurId);
    }

    @GetMapping("/validated/duree/total")
    @PreAuthorize("hasAnyAuthority('DOCTORANT','RESPONSABLE_FORMATION')")
    public ResponseEntity<Long> getValidatedSumDuree(@RequestParam Long doctorantUtilisateurId) {
        Long sum = seanceFormationService.getValidatedSumDureeByDeclarant(doctorantUtilisateurId);
        return ResponseEntity.ok(sum);
    }

    @GetMapping("/doctorant/{doctorantUtilisateurId}")
    @PreAuthorize("hasAnyAuthority('DOCTORANT','RESPONSABLE_FORMATION')")
    public ResponseEntity<List<SeanceFormationResponseDTO>> getSeanceFormationByDoctorantUtilisateurId(@PathVariable Long doctorantUtilisateurId) {
        List<SeanceFormationResponseDTO> response = seanceFormationService.getDeclaredSeancesByDoctorantUtilisateurId(doctorantUtilisateurId);
        return ResponseEntity.ok(response);
    }


    @GetMapping("/test-seance/{id}")
    public ResponseEntity<?> testSeance(@PathVariable Long id) {
        return seanceFormationRepository.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(404).body("NOT FOUND"));
    }

    @PostMapping("/upload-pdf")
    @PreAuthorize("hasAuthority('DOCTORANT')")
    public ResponseEntity<?> uploadJustificatifPdf(@RequestParam("file") MultipartFile file) {
        try {
            // Optional: Validate PDF extension
            if (!file.getOriginalFilename().toLowerCase().endsWith(".pdf")) {
                return ResponseEntity.badRequest().body("Le fichier doit être un PDF.");
            }

            // Store file using existing fileService logic
            String fullPath = fileService.storeFile(file, "justificatifs");

            // Extract just the filename to build public path
            String filename = Paths.get(fullPath).getFileName().toString();
            String relativePath = "/uploads/justificatifs/" + filename;

            return ResponseEntity.ok(Map.of("path", relativePath));
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Erreur lors de l'upload du justificatif.");
        }
    }







}
