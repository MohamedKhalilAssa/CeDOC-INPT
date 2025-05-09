package ma.inpt.cedoc.service.DoctorantActionService;


import ma.inpt.cedoc.model.DTOs.DoctorantActions.PublicationRequestDTO;
import ma.inpt.cedoc.model.DTOs.DoctorantActions.PublicationResponseDTO;
import ma.inpt.cedoc.model.entities.DoctorantActions.Publication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface PublicationService {
    public List<PublicationResponseDTO> getAllPublications();
    public PublicationResponseDTO getPublicationBy(Long id);
    public PublicationResponseDTO addPublication(PublicationRequestDTO requestDTO, String email);
    public PublicationResponseDTO updatePublication(PublicationRequestDTO requestDTO, Long id, String email);
    public void deletePublication(Long id, String email);
    public PublicationResponseDTO validerPublication(Long id, String email);
    public PublicationResponseDTO refuserPublication(Long id, String email);
}
