package ma.inpt.cedoc.service.DoctorantActionService;

import ma.inpt.cedoc.model.DTOs.DoctorantActions.ConfParticipationRequestDTO;
import ma.inpt.cedoc.model.DTOs.DoctorantActions.ConfParticipationResponseDTO;
import ma.inpt.cedoc.model.DTOs.DoctorantActions.PublicationRequestDTO;
import ma.inpt.cedoc.model.DTOs.DoctorantActions.PublicationResponseDTO;

import java.util.List;

public interface ConfParticipationService {
    public List<ConfParticipationResponseDTO> getAllConfParticipations();
    public ConfParticipationResponseDTO getConfParticipationBy(Long id);
    public ConfParticipationResponseDTO addConfParticipation(ConfParticipationRequestDTO requestDTO, String email);
    public ConfParticipationResponseDTO updateConfParticipation(ConfParticipationRequestDTO requestDTO, Long id, String email);
    public void deleteConfParticipation(Long id, String email);
    public ConfParticipationResponseDTO validerConfParticipation(Long id, String email);
    public ConfParticipationResponseDTO refuserConfParticipation(Long id, String email);
}
