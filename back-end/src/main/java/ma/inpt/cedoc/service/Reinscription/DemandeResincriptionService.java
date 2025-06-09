package ma.inpt.cedoc.service.Reinscription;

import java.util.List;

import ma.inpt.cedoc.model.DTOs.Reinscription.DemandeReinscriptionRequestDTO;
import ma.inpt.cedoc.model.DTOs.Reinscription.DemandeReinscriptionResponseDTO;

public interface DemandeResincriptionService {

    public List<DemandeReinscriptionResponseDTO> getAllDemandes();
    public List<DemandeReinscriptionResponseDTO> getDemandesByDoctorantId(Long id);
    public List<DemandeReinscriptionResponseDTO> getDemandesByDirecteurTheseId(Long id);
    public DemandeReinscriptionResponseDTO getDemandeById(Long id);
    public DemandeReinscriptionResponseDTO createDemande(DemandeReinscriptionRequestDTO demandeDTO, String email);
    public DemandeReinscriptionResponseDTO editDemande(Long id, DemandeReinscriptionRequestDTO demandeDTO, String email);
    public void deleteDemande(Long id, String email);
}
