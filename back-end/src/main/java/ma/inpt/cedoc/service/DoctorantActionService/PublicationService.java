package ma.inpt.cedoc.service.DoctorantActionService;

import java.util.List;

import ma.inpt.cedoc.model.DTOs.DoctorantActions.PublicationRequestDTO;
import ma.inpt.cedoc.model.DTOs.DoctorantActions.PublicationResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PublicationService {
    public Page<PublicationResponseDTO> getAllPublications(Pageable pageable);

    public Page<PublicationResponseDTO> getPublicationsByDoctorantId(Long id, Pageable pageable);

    public PublicationResponseDTO getPublicationById(Long id);

    public PublicationResponseDTO addPublication(PublicationRequestDTO requestDTO, String email);

    public PublicationResponseDTO updatePublication(PublicationRequestDTO requestDTO, Long id, String email);

    public void deletePublication(Long id, String email);

    public PublicationResponseDTO validerPublication(Long id, String email);

    public PublicationResponseDTO refuserPublication(Long id, String email);
}
