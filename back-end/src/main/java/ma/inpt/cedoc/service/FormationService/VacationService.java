package ma.inpt.cedoc.service.FormationService;

import ma.inpt.cedoc.model.DTOs.Formations.VacationRequestDTO;
import ma.inpt.cedoc.model.DTOs.Formations.VacationResponseDTO;

import java.util.List;

public interface VacationService {
    VacationResponseDTO create(VacationRequestDTO dto);
    VacationResponseDTO update(Long id, VacationRequestDTO dto);
    void delete(Long id);
    VacationResponseDTO get(Long id);
    List<VacationResponseDTO> getAll();
}
