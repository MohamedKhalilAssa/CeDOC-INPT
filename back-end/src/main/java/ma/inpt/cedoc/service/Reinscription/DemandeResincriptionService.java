package ma.inpt.cedoc.service.Reinscription;

import ma.inpt.cedoc.model.DTOs.Reinscription.DemandeReinscriptionRequestDTO;
import ma.inpt.cedoc.model.DTOs.Reinscription.DemandeReinscriptionResponseDTO;

import java.util.List;

public interface DemandeResincriptionService {

    public List<DemandeReinscriptionResponseDTO> getAllDemandes();
    public DemandeReinscriptionResponseDTO getDemande(Long id);
    public DemandeReinscriptionResponseDTO createDemande(DemandeReinscriptionRequestDTO demandeDTO, String username);
    public DemandeReinscriptionResponseDTO editDemande(Long id, DemandeReinscriptionRequestDTO demandeDTO);
    public void deleteDemande(Long id);
}
