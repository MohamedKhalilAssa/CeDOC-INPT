package ma.inpt.cedoc.service.FormationService;

import java.util.List;

import ma.inpt.cedoc.model.DTOs.Formations.FormationResponseDTO;
import ma.inpt.cedoc.model.DTOs.Formations.SeanceFormationRequestDTO;
import ma.inpt.cedoc.model.DTOs.Formations.SeanceFormationResponseDTO;

public interface SeanceFormationService {

    SeanceFormationResponseDTO createSeanceFormation(SeanceFormationRequestDTO dto);

    SeanceFormationResponseDTO updateSeanceFormation(Long id, SeanceFormationRequestDTO dto);

    SeanceFormationResponseDTO getSeanceFormationById(Long id);

    List<SeanceFormationResponseDTO> getAllSeanceFormations();

    void deleteSeanceFormation(Long id);

    Long getSumDureeByFormationAndDeclarant(Long formationId, Long declarantId);

    Long getSumDureeByDeclarant(Long declarantId);

    List<FormationResponseDTO> getValidatedFormationsByDoctorant(Long doctorantId);

    Long getValidatedSumDureeByDeclarant(Long doctorantId);
}
