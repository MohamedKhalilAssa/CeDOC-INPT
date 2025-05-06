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
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DemandeResincriptionService {
    private final DemandeReinscriptionMapper demandeReinscriptionMapper;
    private final DemandeReinscriptionRepository demandeReinscriptionRepository;
    private final DoctorantRepository doctorantRepository;
    private final AvisReinscriptionRepository avisReinscriptionRepository;

    @GetMapping("/")
    public ResponseEntity<List<DemandeReinscriptionResponseDTO>> getAllDemandes() {
        List<DemandeReinscription> demandes = demandeReinscriptionRepository.findAll();
        List<DemandeReinscriptionResponseDTO> demandesDTO = demandes.stream()
                            .map((p) -> demandeReinscriptionMapper.toResponseDTO(p))
                            .collect(Collectors.toList());
        return ResponseEntity.ok(demandesDTO);
    }

    public ResponseEntity<DemandeReinscriptionResponseDTO> getDemande(Long id) {
        DemandeReinscription demande = demandeReinscriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Demande Reinscription " + id + " not found!"));
        return ResponseEntity.ok(demandeReinscriptionMapper.toResponseDTO(demande));
    }

    public DemandeReinscriptionResponseDTO createDemande(DemandeReinscriptionRequestDTO demandeDTO, String username) {
        DemandeReinscription newDemande = demandeReinscriptionMapper.toEntity(demandeDTO);
        newDemande.setDemandeur(doctorantRepository.findByEmail(username)); // parceque le personne qui crée cette demande là et le doctorant authentifié à la platforme
        demandeReinscriptionRepository.save(newDemande);
        return demandeReinscriptionMapper.toResponseDTO(newDemande);
    }

    public DemandeReinscriptionResponseDTO editDemande(Long id, DemandeReinscriptionRequestDTO demandeDTO) {
        DemandeReinscription demande = demandeReinscriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Demande Reinscription " + id + " not found"));
        demandeReinscriptionMapper.updateFromRequest(demandeDTO, demande);
        return demandeReinscriptionMapper.toResponseDTO(demandeReinscriptionRepository.save(demande));
    }

    public void deleteDemande(Long id) {
        demandeReinscriptionRepository.deleteById(id);
    }
}
