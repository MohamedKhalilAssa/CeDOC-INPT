package ma.inpt.cedoc.service.FormationService;

import ma.inpt.cedoc.model.DTOs.Formations.SeanceFormationRequestDTO;
import ma.inpt.cedoc.model.DTOs.Formations.SeanceFormationResponseDTO;

import java.util.List;

public interface SeanceFormationService {

    SeanceFormationResponseDTO createSeanceFormation(SeanceFormationRequestDTO dto);

    SeanceFormationResponseDTO updateSeanceFormation(Long id, SeanceFormationRequestDTO dto);

    SeanceFormationResponseDTO getSeanceFormationById(Long id);

    List<SeanceFormationResponseDTO> getAllSeanceFormations();

    void deleteSeanceFormation(Long id);

    Long getSumDureeByFormationAndDeclarant(Long formationId, Long declarantId);

    Long getSumDureeByDeclarant(Long declarantId);

}
