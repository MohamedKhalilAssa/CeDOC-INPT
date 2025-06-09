package ma.inpt.cedoc.web.FormationControllers;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

import ma.inpt.cedoc.service.Global.FileService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Formations.FormationRequestDTO;
import ma.inpt.cedoc.model.DTOs.Formations.FormationResponseDTO;
import ma.inpt.cedoc.model.entities.formation.Formation;
import ma.inpt.cedoc.service.FormationService.FormationService;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/formations")
@RequiredArgsConstructor
public class FormationController {

    private final FormationService formationService;
    private final FileService fileService;

    @PostMapping
    @PreAuthorize("hasAuthority('RESPONSABLE_FORMATION')")
    public ResponseEntity<FormationResponseDTO> createFormation(
            @RequestBody @Valid FormationRequestDTO formationRequestDTO) {
        FormationResponseDTO savedFormation = formationService.saveFormation(formationRequestDTO);
        return ResponseEntity.ok(savedFormation);
    }

    @GetMapping("/search")
    public ResponseEntity<List<FormationResponseDTO>> searchByName(@RequestParam String name) {
        List<FormationResponseDTO> formations = formationService.findByName(name);
        return ResponseEntity.ok(formations);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('RESPONSABLE_FORMATION')")
    public ResponseEntity<FormationResponseDTO> updateFormation(@PathVariable Long id,
            @RequestBody @Valid FormationRequestDTO formationRequestDTO) {
        FormationResponseDTO updatedFormation = formationService.updateFormation(id, formationRequestDTO);
        return ResponseEntity.ok(updatedFormation);
    }

//    @PostMapping("/raw")
//    @PreAuthorize("hasRole('RESPONSABLE_FORMATION')")
//    public ResponseEntity<?> createFormationWithoutDto(@RequestBody Formation formation) {
//        FormationResponseDTO savedFormation = formationService.saveFormationWithoutDto(formation);
//        return ResponseEntity.ok(savedFormation);
//
//    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('RESPONSABLE_FORMATION')")
    public ResponseEntity<String> deleteFormation(@PathVariable Long id) {
        formationService.deleteById(id);
        return ResponseEntity.ok("Formation supprimée avec succès");
    }

    @GetMapping("/by-doctorant")
    public ResponseEntity<List<FormationResponseDTO>> getFormationsByDoctorantId(@RequestParam Long doctorantId) {
        List<FormationResponseDTO> formations = formationService.findFormationsByDoctorantId(doctorantId);
        return ResponseEntity.ok(formations);
    }

    @GetMapping
    public ResponseEntity<List<FormationResponseDTO>> getAllFormations(){
        List<FormationResponseDTO> formations = formationService.getAllFormations();
        return ResponseEntity.ok(formations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FormationResponseDTO> getAllFormations(@PathVariable Long id){
        FormationResponseDTO formation = formationService.getById(id);
        return ResponseEntity.ok(formation);
    }

    @PostMapping("/upload-image")
    public ResponseEntity<Map<String, String>> uploadFormationImage(@RequestParam("image") MultipartFile file) {
        try {
            if (!fileService.isValidExtension(file, "jpg", "jpeg", "png", "webp")) {
                return ResponseEntity.badRequest().body(Map.of("error", "Format d'image invalide."));
            }

            String path = fileService.storeFile(file, "formations");
            String filename = Paths.get(path).getFileName().toString();

            // Return full relative path (for frontend display)
            return ResponseEntity.ok(Map.of("path", "/uploads/formations/" + filename));
        } catch (IOException e) {
            return ResponseEntity.status(500).body(Map.of("error", "Erreur lors du téléversement."));
        }
    }



}