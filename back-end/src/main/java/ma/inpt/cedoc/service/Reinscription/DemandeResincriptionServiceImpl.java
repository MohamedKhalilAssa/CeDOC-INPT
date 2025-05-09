package ma.inpt.cedoc.service.Reinscription;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Reinscription.DemandeReinscriptionRequestDTO;
import ma.inpt.cedoc.model.DTOs.Reinscription.DemandeReinscriptionResponseDTO;
import ma.inpt.cedoc.model.DTOs.mapper.ReinscriptionMappers.DemandeReinscriptionMapper;
import ma.inpt.cedoc.model.entities.Reinscription.DemandeReinscription;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import ma.inpt.cedoc.repositories.ResinscriptionRepositories.AvisReinscriptionRepository;
import ma.inpt.cedoc.repositories.ResinscriptionRepositories.DemandeReinscriptionRepository;
import ma.inpt.cedoc.repositories.utilisateursRepositories.DoctorantRepository;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DemandeResincriptionServiceImpl implements DemandeResincriptionService {
    private final DemandeReinscriptionMapper demandeReinscriptionMapper;
    private final DemandeReinscriptionRepository demandeReinscriptionRepository;
    private final DoctorantRepository doctorantRepository;
    private final AvisReinscriptionRepository avisReinscriptionRepository;

    public List<DemandeReinscriptionResponseDTO> getAllDemandes() {
        List<DemandeReinscription> demandes = demandeReinscriptionRepository.findAll();
        List<DemandeReinscriptionResponseDTO> demandesDTO = demandes.stream()
                            .map((p) -> demandeReinscriptionMapper.toResponseDTO(p))
                            .collect(Collectors.toList());
        return demandesDTO;
    }

    public DemandeReinscriptionResponseDTO getDemande(Long id) {
        DemandeReinscription demande = demandeReinscriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Demande Reinscription " + id + " not found!"));
        return demandeReinscriptionMapper.toResponseDTO(demande);
    }

    @Transactional
    public DemandeReinscriptionResponseDTO createDemande(DemandeReinscriptionRequestDTO demandeDTO, String email) {
        DemandeReinscription newDemande = demandeReinscriptionMapper.toEntity(demandeDTO);
        Doctorant doctorant = doctorantRepository.findByEmail(email).
                orElseThrow(() -> new ResourceNotFoundException("Doctorant " + email + " not found!"));
        newDemande.setDemandeur(doctorant); // parceque le personne qui crée cette demande là et le doctorant authentifié à la platforme
        return demandeReinscriptionMapper.toResponseDTO(demandeReinscriptionRepository.save(newDemande));
    }

    @Transactional
    public DemandeReinscriptionResponseDTO editDemande(Long id, DemandeReinscriptionRequestDTO demandeDTO, String email) {
        DemandeReinscription demande = demandeReinscriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Demande Reinscription " + id + " not found"));
        demandeReinscriptionMapper.updateFromRequest(demandeDTO, demande);
        return demandeReinscriptionMapper.toResponseDTO(demandeReinscriptionRepository.save(demande));
    }

    @Transactional
    public void deleteDemande(Long id, String email) {
        demandeReinscriptionRepository.deleteById(id);
    }
}
