package ma.inpt.cedoc.service.FormationService;

import ma.inpt.cedoc.model.DTOs.FormationDtos.FormationResponseDTO;
import ma.inpt.cedoc.model.DTOs.Formations.FormationRequestDTO;
import ma.inpt.cedoc.model.entities.formation.Formation;

import java.util.List;

public interface FormationService {

    FormationResponseDTO saveFormation(FormationRequestDTO dto);

    FormationResponseDTO saveFormationWithoutDto(Formation formation);

    void deleteById(Long id);

    List<FormationResponseDTO> findByName(String name);

    List<Formation> findByNameWithoutDto(String name);

    FormationResponseDTO updateFormation(Long id, FormationRequestDTO dto);

    List<FormationResponseDTO> findFormationsByDoctorantId(Long doctorantId);
}
