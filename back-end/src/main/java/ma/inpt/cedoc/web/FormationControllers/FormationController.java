package ma.inpt.cedoc.web.FormationControllers;


import ma.inpt.cedoc.model.DTOs.FormationDtos.FormationResponseDTO;
import ma.inpt.cedoc.model.DTOs.Formations.FormationRequestDTO;
import ma.inpt.cedoc.model.entities.formation.Formation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

        import java.util.List;

@RequestMapping("/formations")
public interface FormationController {

    @PostMapping
    ResponseEntity<FormationResponseDTO> createFormation(@RequestBody FormationRequestDTO formationRequestDTO);

    @PostMapping("/raw")
    ResponseEntity<FormationResponseDTO> createFormationWithoutDto(@RequestBody Formation formation);

    @GetMapping("/search")
    ResponseEntity<List<FormationResponseDTO>> searchByName(@RequestParam String name);

    @PutMapping("/{id}")
    ResponseEntity<FormationResponseDTO> updateFormation(@PathVariable Long id, @RequestBody FormationRequestDTO formationRequestDTO);

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteFormation(@PathVariable Long id);

    @GetMapping("/by-doctorant")
    ResponseEntity<List<FormationResponseDTO>> getFormationsByDoctorant(@RequestParam Long doctorantId);

}
