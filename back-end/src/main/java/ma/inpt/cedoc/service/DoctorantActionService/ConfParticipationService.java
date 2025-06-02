package ma.inpt.cedoc.service.DoctorantActionService;

import java.util.List;

import ma.inpt.cedoc.model.DTOs.DoctorantActions.ConfParticipationRequestDTO;
import ma.inpt.cedoc.model.DTOs.DoctorantActions.ConfParticipationResponseDTO;

public interface ConfParticipationService {
    public List<ConfParticipationResponseDTO> getAllConfParticipations();

    public List<ConfParticipationResponseDTO> getConfParticipationsByDoctorantId(Long id);

    public ConfParticipationResponseDTO getConfParticipationById(Long id);

    public ConfParticipationResponseDTO addConfParticipation(ConfParticipationRequestDTO requestDTO, String email);

    public ConfParticipationResponseDTO updateConfParticipation(ConfParticipationRequestDTO requestDTO, Long id,
            String email);

    public void deleteConfParticipation(Long id, String email);

    public ConfParticipationResponseDTO validerConfParticipation(Long id, String email);

    public ConfParticipationResponseDTO refuserConfParticipation(Long id, String email);
}
