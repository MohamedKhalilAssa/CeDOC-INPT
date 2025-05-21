package ma.inpt.cedoc.service.Reinscription;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.utilisateurs.DirecteurDeThese;
import ma.inpt.cedoc.repositories.utilisateursRepositories.DirecteurDeTheseRepository;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Reinscription.DemandeReinscriptionRequestDTO;
import ma.inpt.cedoc.model.DTOs.Reinscription.DemandeReinscriptionResponseDTO;
import ma.inpt.cedoc.model.DTOs.mapper.ReinscriptionMappers.DemandeReinscriptionMapper;
import ma.inpt.cedoc.model.entities.Reinscription.DemandeReinscription;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import ma.inpt.cedoc.repositories.ResinscriptionRepositories.AvisReinscriptionRepository;
import ma.inpt.cedoc.repositories.ResinscriptionRepositories.DemandeReinscriptionRepository;
import ma.inpt.cedoc.repositories.utilisateursRepositories.DoctorantRepository;

@Service
@RequiredArgsConstructor
public class DemandeResincriptionServiceImpl implements DemandeResincriptionService {
    private final DemandeReinscriptionMapper demandeReinscriptionMapper;
    private final DemandeReinscriptionRepository demandeReinscriptionRepository;
    private final DoctorantRepository doctorantRepository;
    private final DirecteurDeTheseRepository directeurDeTheseRepository;

    public List<DemandeReinscriptionResponseDTO> getAllDemandes() {
        List<DemandeReinscription> demandes = demandeReinscriptionRepository.findAll();
        return demandes.stream()
                .map(demandeReinscriptionMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<DemandeReinscriptionResponseDTO> getDemandesByDoctorantId(Long id) {
        List<DemandeReinscription> demandes = demandeReinscriptionRepository.findByDemandeurId(id);
        return demandes.stream()
                .map(demandeReinscriptionMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    public List<DemandeReinscriptionResponseDTO> getDemandeBySujet(Long id){
        List<DemandeReinscription> demandes = demandeReinscriptionRepository.findBySujetId(id);
        return demandes.stream()
                .map(demandeReinscriptionMapper::toResponseDTO)
                .toList();
    }

    // cette méthode va récupérer les demandes de réinscriptions dont le directeur de thèse est responsable
    @Override
    public List<DemandeReinscriptionResponseDTO> getDemandesByDirecteurTheseId(Long id) {
        DirecteurDeThese directeurDeThese = directeurDeTheseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("directeur de thèse "+id+" n'est pas trouvé"));
        List<Long> sujetIds = directeurDeThese.getSujets().stream()
                .map(Sujet::getId)
                .toList();
        List<DemandeReinscriptionResponseDTO> demandes = new ArrayList<>();
        for (Long sujetId : sujetIds) {
            demandes.addAll(getDemandeBySujet(sujetId));
        }
        return demandes;
    }

    @Override
    public DemandeReinscriptionResponseDTO getDemandeById(Long id) {
        DemandeReinscription demande = demandeReinscriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Demande Reinscription " + id + " not found!"));
        return demandeReinscriptionMapper.toResponseDTO(demande);
    }

    @Transactional
    public DemandeReinscriptionResponseDTO createDemande(DemandeReinscriptionRequestDTO demandeDTO, String email) {
        DemandeReinscription newDemande = demandeReinscriptionMapper.toEntity(demandeDTO);
        Doctorant doctorant = doctorantRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Doctorant "+email+" not found!"));
        newDemande.setDemandeur(doctorant); // parceque le personne qui crée cette demande là et le doctorant
                                            // authentifié à la platforme
        return demandeReinscriptionMapper.toResponseDTO(demandeReinscriptionRepository.save(newDemande));
    }

    @Transactional
    public DemandeReinscriptionResponseDTO editDemande(Long id, DemandeReinscriptionRequestDTO demandeDTO,
            String email) {
        DemandeReinscription demande = demandeReinscriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Demande Reinscription " + id + " not found"));
        Doctorant doctorant = doctorantRepository.findByEmail(email)
                        .orElseThrow(() -> new ResourceNotFoundException("Doctorant " + email + " not found!"));
        if (!doctorant.getId().equals(demande.getDemandeur().getId())) {
            throw new AccessDeniedException("Vous n'êtes pas autorisé à accéder à cette ressource.");
        }
        demandeReinscriptionMapper.updateFromRequest(demandeDTO, demande);
        return demandeReinscriptionMapper.toResponseDTO(demandeReinscriptionRepository.save(demande));
    }

    @Transactional
    public void deleteDemande(Long id, String email) {
        DemandeReinscription demande = demandeReinscriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Demande Reinscription " + id + " not found"));
        Doctorant doctorant = doctorantRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Doctorant " + email + " not found!"));
        if (!doctorant.getId().equals(demande.getDemandeur().getId())) {
            throw new AccessDeniedException("Vous n'êtes pas autorisé à accéder à cette ressource.");
        }
        demandeReinscriptionRepository.deleteById(id);
    }
}
