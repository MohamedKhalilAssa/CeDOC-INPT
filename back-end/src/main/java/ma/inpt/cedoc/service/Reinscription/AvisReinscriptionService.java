package ma.inpt.cedoc.service.Reinscription;

import ma.inpt.cedoc.model.DTOs.Reinscription.AvisReinscriptionRequestDTO;
import ma.inpt.cedoc.model.DTOs.Reinscription.AvisReinscriptionResponseDTO;

import java.util.List;

public interface AvisReinscriptionService {

    public List<AvisReinscriptionResponseDTO> getAllAvis();
    public AvisReinscriptionResponseDTO getAvis(Long id);
    public AvisReinscriptionResponseDTO createAvis(String email, AvisReinscriptionRequestDTO requestDTO);
    public AvisReinscriptionResponseDTO editAvis(AvisReinscriptionRequestDTO requestDTO, Long id);
    public void deleteAvis(Long id);
}
