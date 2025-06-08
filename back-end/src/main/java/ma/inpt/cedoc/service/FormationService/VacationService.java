package ma.inpt.cedoc.service.FormationService;

import java.util.List;

import ma.inpt.cedoc.model.DTOs.Formations.VacationRequestDTO;
import ma.inpt.cedoc.model.DTOs.Formations.VacationResponseDTO;

public interface VacationService {
    VacationResponseDTO create(VacationRequestDTO dto);
    VacationResponseDTO update(Long id, VacationRequestDTO dto);
    void delete(Long id);
    VacationResponseDTO get(Long id);
    List<VacationResponseDTO> getAll();
}
