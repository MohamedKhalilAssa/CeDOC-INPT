package ma.inpt.cedoc.service.Reinscription;

import java.util.List;

import ma.inpt.cedoc.model.DTOs.Reinscription.AvisReinscriptionRequestDTO;
import ma.inpt.cedoc.model.DTOs.Reinscription.AvisReinscriptionResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AvisReinscriptionService {

    public Page<AvisReinscriptionResponseDTO> getAllAvis(Pageable pageable);
    public Page<AvisReinscriptionResponseDTO> getAvisByDirecteurThese(Long id, Pageable pageable);
    public AvisReinscriptionResponseDTO getAvisById(Long id);
    public AvisReinscriptionResponseDTO createAvis(AvisReinscriptionRequestDTO requestDTO, String email);
    public AvisReinscriptionResponseDTO editAvis(AvisReinscriptionRequestDTO requestDTO, Long id , String email);
    public void deleteAvis(Long id, String email);
}
