package ma.inpt.cedoc.service.DoctorantActionService;

import java.util.List;

import ma.inpt.cedoc.model.DTOs.DoctorantActions.ConfParticipationRequestDTO;
import ma.inpt.cedoc.model.DTOs.DoctorantActions.ConfParticipationResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ConfParticipationService {
    public Page<ConfParticipationResponseDTO> getAllConfParticipations(Pageable pageable);

    public Page<ConfParticipationResponseDTO> getConfParticipationsByDoctorantId(Long id, Pageable pageable);

    public ConfParticipationResponseDTO getConfParticipationById(Long id);

    public ConfParticipationResponseDTO addConfParticipation(ConfParticipationRequestDTO requestDTO, String email);

    public ConfParticipationResponseDTO updateConfParticipation(ConfParticipationRequestDTO requestDTO, Long id,
            String email);

    public void deleteConfParticipation(Long id, String email);

    public ConfParticipationResponseDTO validerConfParticipation(Long id, String email);

    public ConfParticipationResponseDTO refuserConfParticipation(Long id, String email);
}
