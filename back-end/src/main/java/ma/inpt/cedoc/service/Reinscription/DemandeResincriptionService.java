package ma.inpt.cedoc.service.Reinscription;

import java.util.List;

import ma.inpt.cedoc.model.DTOs.Reinscription.DemandeReinscriptionRequestDTO;
import ma.inpt.cedoc.model.DTOs.Reinscription.DemandeReinscriptionResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface DemandeResincriptionService {

    public Page<DemandeReinscriptionResponseDTO> getAllDemandes(Pageable pageable);
    public Page<DemandeReinscriptionResponseDTO> getDemandesByDoctorantId(Long id, Pageable pageable);
    public Page<DemandeReinscriptionResponseDTO> getDemandesByDirecteurTheseId(Long id, Pageable pageable);
    public Page<DemandeReinscriptionResponseDTO> getDemandesByChefEquipeId(Long id, Pageable pageable);
    public DemandeReinscriptionResponseDTO getDemandeById(Long id);
    public DemandeReinscriptionResponseDTO createDemande(DemandeReinscriptionRequestDTO demandeDTO, String email);
    public DemandeReinscriptionResponseDTO editDemande(Long id, DemandeReinscriptionRequestDTO demandeDTO, String email);
    public void deleteDemande(Long id, String email);

    public DemandeReinscriptionResponseDTO validerchef(Long id, String email);

    public DemandeReinscriptionResponseDTO refuserchef(Long id, String email);

    public DemandeReinscriptionResponseDTO validerdirection(Long id, String email);

    public DemandeReinscriptionResponseDTO refuserdirection(Long id, String email);
}
