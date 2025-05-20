package ma.inpt.cedoc.service.DoctorantActionService;

import java.util.List;

import ma.inpt.cedoc.model.DTOs.DoctorantActions.PublicationRequestDTO;
import ma.inpt.cedoc.model.DTOs.DoctorantActions.PublicationResponseDTO;

public interface PublicationService {
    public List<PublicationResponseDTO> getAllPublications();

    public List<PublicationResponseDTO> getMyPublications(String email);

    public PublicationResponseDTO getPublicationBy(Long id);

    public PublicationResponseDTO addPublication(PublicationRequestDTO requestDTO, String email);

    public PublicationResponseDTO updatePublication(PublicationRequestDTO requestDTO, Long id, String email);

    public void deletePublication(Long id, String email);

    public PublicationResponseDTO validerPublication(Long id, String email);

    public PublicationResponseDTO refuserPublication(Long id, String email);
}
