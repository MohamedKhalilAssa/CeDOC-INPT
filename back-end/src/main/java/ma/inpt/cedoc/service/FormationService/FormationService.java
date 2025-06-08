package ma.inpt.cedoc.service.FormationService;

import java.util.List;

import ma.inpt.cedoc.repositories.model.DTOs.Formations.FormationRequestDTO;
import ma.inpt.cedoc.repositories.model.DTOs.Formations.FormationResponseDTO;
import ma.inpt.cedoc.repositories.model.entities.formation.Formation;

public interface FormationService {

    FormationResponseDTO saveFormation(FormationRequestDTO dto);

    FormationResponseDTO saveFormationWithoutDto(Formation formation);

    void deleteById(Long id);

    List<FormationResponseDTO> findByName(String name);

    List<Formation> findByNameWithoutDto(String name);

    FormationResponseDTO updateFormation(Long id, FormationRequestDTO dto);

    List<FormationResponseDTO> findFormationsByDoctorantId(Long doctorantId);

    List<FormationResponseDTO> getAllFormations();

    FormationResponseDTO getById(Long id);
 }
