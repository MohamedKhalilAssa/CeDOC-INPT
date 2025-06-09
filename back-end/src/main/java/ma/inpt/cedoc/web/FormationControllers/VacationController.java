package ma.inpt.cedoc.web.FormationControllers;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Formations.VacationRequestDTO;
import ma.inpt.cedoc.model.DTOs.Formations.VacationResponseDTO;
import ma.inpt.cedoc.service.FormationService.VacationService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/formations/vacations")
@RequiredArgsConstructor
public class VacationController {

    private final VacationService vacationService;

    @PostMapping
    @PreAuthorize("hasAuthority('DOCTORANT')")
    public VacationResponseDTO create(@RequestBody VacationRequestDTO vacationRequestDTO) {
        return vacationService.create(vacationRequestDTO);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('RESPONSABLE_FORMATION')")
    public VacationResponseDTO update(@PathVariable Long id, @RequestBody VacationRequestDTO vacationRequestDTO) {
        return vacationService.update(id, vacationRequestDTO);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        vacationService.delete(id);
    }

    @GetMapping("/{id}")
    public VacationResponseDTO get(@PathVariable Long id) {
        return vacationService.get(id);
    }

    @GetMapping
    public List<VacationResponseDTO> getAll() {
        return vacationService.getAll();
    }
}

