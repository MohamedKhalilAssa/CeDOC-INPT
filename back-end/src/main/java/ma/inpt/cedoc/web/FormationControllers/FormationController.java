package ma.inpt.cedoc.web.FormationControllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Formations.FormationRequestDTO;
import ma.inpt.cedoc.model.DTOs.Formations.FormationResponseDTO;
import ma.inpt.cedoc.service.FormationService.FormationService;

@RestController
@RequestMapping("/formations")
@RequiredArgsConstructor
public class FormationController {

    private final FormationService formationService;

    @PostMapping
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
    public ResponseEntity<FormationResponseDTO> updateFormation(@PathVariable Long id,
            @RequestBody @Valid FormationRequestDTO formationRequestDTO) {
        FormationResponseDTO updatedFormation = formationService.updateFormation(id, formationRequestDTO);
        return ResponseEntity.ok(updatedFormation);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFormation(@PathVariable Long id) {
        formationService.deleteById(id);
        return ResponseEntity.ok("Formation supprimée avec succès");
    }

    @GetMapping("/by-doctorant")
    public ResponseEntity<List<FormationResponseDTO>> getFormationsByDoctorantId(@RequestParam Long doctorantId) {
        List<FormationResponseDTO> formations = formationService.findFormationsByDoctorantId(doctorantId);
        return ResponseEntity.ok(formations);
    }

}
