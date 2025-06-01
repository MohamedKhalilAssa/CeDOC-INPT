package ma.inpt.cedoc.service.Reinscription;

import ma.inpt.cedoc.model.DTOs.Reinscription.AvisReinscriptionRequestDTO;
import ma.inpt.cedoc.model.DTOs.Reinscription.AvisReinscriptionResponseDTO;

import java.util.List;

public interface AvisReinscriptionService {

    public List<AvisReinscriptionResponseDTO> getAllAvis();
    public List<AvisReinscriptionResponseDTO> getAvisByDirecteurThese(Long id);
    public AvisReinscriptionResponseDTO getAvisById(Long id);
    public AvisReinscriptionResponseDTO createAvis(AvisReinscriptionRequestDTO requestDTO, String email);
    public AvisReinscriptionResponseDTO editAvis(AvisReinscriptionRequestDTO requestDTO, Long id , String email);
    public void deleteAvis(Long id, String email);
}
