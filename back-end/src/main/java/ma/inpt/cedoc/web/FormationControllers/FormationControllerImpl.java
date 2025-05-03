package ma.inpt.cedoc.web.FormationControllers;

import ma.inpt.cedoc.model.DTOs.FormationDtos.FormationResponseDTO;
import ma.inpt.cedoc.model.DTOs.Formations.FormationRequestDTO;
import ma.inpt.cedoc.model.entities.formation.Formation;
import ma.inpt.cedoc.service.FormationService.FormationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class FormationControllerImpl implements FormationController {

    private final FormationService formationService;

    public FormationControllerImpl(FormationService formationService) {
        this.formationService = formationService;
    }

    @Override
    public ResponseEntity<FormationResponseDTO> createFormation(FormationRequestDTO formationRequestDTO) {
        var savedFormation = formationService.saveFormation(formationRequestDTO);
        return ResponseEntity.ok(savedFormation);
    }

    @Override
    public ResponseEntity<FormationResponseDTO> createFormationWithoutDto(Formation formation) {
        var savedFormation = formationService.saveFormationWithoutDto(formation);
        return ResponseEntity.ok(savedFormation);
    }

    @Override
    public ResponseEntity<List<FormationResponseDTO>> searchByName(String name) {
        List<FormationResponseDTO> formations = formationService.findByName(name);
        return ResponseEntity.ok(formations);
    }

    @Override
    public ResponseEntity<FormationResponseDTO> updateFormation(Long id, FormationRequestDTO formationRequestDTO) {
        FormationResponseDTO updatedFormation = formationService.updateFormation(id, formationRequestDTO);
        return ResponseEntity.ok(updatedFormation);
    }

    @Override
    public ResponseEntity<Void> deleteFormation(Long id) {
        formationService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<List<FormationResponseDTO>> getFormationsByDoctorant(Long doctorantId) {
        List<FormationResponseDTO> formations = formationService.findFormationsByDoctorantId(doctorantId);
        return ResponseEntity.ok(formations);
    }
}
