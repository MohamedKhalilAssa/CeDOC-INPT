package ma.inpt.cedoc.service.Reinscription;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import ma.inpt.cedoc.model.entities.utilisateurs.ChefEquipeRole;
import ma.inpt.cedoc.model.entities.utilisateurs.DirecteurDeTheseRole;
import ma.inpt.cedoc.model.entities.utilisateurs.DirectionCedoc;
import ma.inpt.cedoc.model.enums.reinscription_enums.DemandeReinscriptionEnum;
import ma.inpt.cedoc.repositories.utilisateursRepositories.ChefEquipeRoleRepository;
import ma.inpt.cedoc.repositories.utilisateursRepositories.DirecteurDeTheseRoleRepository;
import ma.inpt.cedoc.repositories.utilisateursRepositories.DirectionCedocRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Reinscription.DemandeReinscriptionRequestDTO;
import ma.inpt.cedoc.model.DTOs.Reinscription.DemandeReinscriptionResponseDTO;
import ma.inpt.cedoc.model.DTOs.mapper.ReinscriptionMappers.DemandeReinscriptionMapper;
import ma.inpt.cedoc.model.entities.Reinscription.DemandeReinscription;
import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import ma.inpt.cedoc.repositories.ResinscriptionRepositories.DemandeReinscriptionRepository;
import ma.inpt.cedoc.repositories.utilisateursRepositories.DoctorantRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class DemandeResincriptionServiceImpl implements DemandeResincriptionService {
    private final DemandeReinscriptionMapper demandeReinscriptionMapper;
    private final DemandeReinscriptionRepository demandeReinscriptionRepository;
    private final DoctorantRepository doctorantRepository;
    private final DirecteurDeTheseRoleRepository directeurDeTheseRoleRepository;
    private final ChefEquipeRoleRepository chefEquipeRoleRepository;
    private final DirectionCedocRepository directionCedocRepository;
    private static final Logger logger = LoggerFactory.getLogger(DemandeResincriptionServiceImpl.class);

    public Page<DemandeReinscriptionResponseDTO> getAllDemandes(Pageable pageable) {
        Page<DemandeReinscription> demandes = demandeReinscriptionRepository.findAll(pageable);
        return demandes.map(demandeReinscriptionMapper::toResponseDTO);
    }

    @Override
    public Page<DemandeReinscriptionResponseDTO> getDemandesByDoctorantId(Long id, Pageable pageable) {
        Page<DemandeReinscription> demandes = demandeReinscriptionRepository.findByDemandeurId(id, pageable);
        return demandes.map(demandeReinscriptionMapper::toResponseDTO);
    }

    public List<DemandeReinscriptionResponseDTO> getDemandeBySujet(Long id) {
        List<DemandeReinscription> demandes = demandeReinscriptionRepository.findBySujetId(id);
        return demandes.stream()
                .map(demandeReinscriptionMapper::toResponseDTO)
                .toList();
    }

    // cette méthode va récupérer les demandes de réinscriptions dont le directeur
    // de thèse est responsable
    @Override
    @Transactional
    public Page<DemandeReinscriptionResponseDTO> getDemandesByDirecteurTheseId(Long id, Pageable pageable) {
        DirecteurDeTheseRole directeurDeThese = directeurDeTheseRoleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("directeur de thèse " + id + " n'est pas trouvé"));

        List<Long> sujetIds = directeurDeThese.getSujets().stream()
                .map(Sujet::getId)
                .toList();
        List<DemandeReinscriptionResponseDTO> demandes = new ArrayList<>();
        for (Long sujetId : sujetIds) {
            demandes.addAll(getDemandeBySujet(sujetId));
        }
        // manual pagination
        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), demandes.size());
        List<DemandeReinscriptionResponseDTO> pageContent = demandes.subList(start, end);

        return new PageImpl<>(pageContent, pageable, demandes.size());
    }

    // cette méthode va récupérer les demandes de réinscriptions des membres de sont équipes
    @Override
    @Transactional
    public Page<DemandeReinscriptionResponseDTO> getDemandesByChefEquipeId(Long id, Pageable pageable) {
        ChefEquipeRole chefEquipe = chefEquipeRoleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Chef d'équipe " + id + " n'est pas trouvé"));
        List<Doctorant> doctorants = chefEquipe.getEquipeDeRecherche().getDoctorants();
        List<DemandeReinscription> demandes = new ArrayList<>();
        for (Doctorant doctorant : doctorants) {
            demandes.addAll(doctorant.getDemandesReinscription());
        }
        List<DemandeReinscriptionResponseDTO> demandesDTO = demandes.stream()
                .map(demandeReinscriptionMapper::toResponseDTO)
                .toList();

        // manual pagination
        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), demandesDTO.size());
        List<DemandeReinscriptionResponseDTO> pageContent = demandesDTO.subList(start, end);

        return new PageImpl<>(pageContent, pageable, demandes.size());
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
        Doctorant doctorant = doctorantRepository.findByUtilisateurEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Doctorant " + email + " not found!"));
        newDemande.setDemandeur(doctorant); // parceque le personne qui crée cette demande là et le doctorant
                                            // authentifié à la platforme
        newDemande.setSujet(doctorant.getSujet());
        return demandeReinscriptionMapper.toResponseDTO(demandeReinscriptionRepository.save(newDemande));
    }

    @Transactional
    public DemandeReinscriptionResponseDTO editDemande(Long id, DemandeReinscriptionRequestDTO demandeDTO,
            String email) {
        DemandeReinscription demande = demandeReinscriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Demande Reinscription " + id + " not found"));
        Doctorant doctorant = doctorantRepository.findByUtilisateurEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Doctorant " + email + " not found!"));
        if (!doctorant.getId().equals(demande.getDemandeur().getId())) {
            throw new AccessDeniedException("Vous n'êtes pas autorisé à accéder à cette ressource.");
        }
        if (!demande.getStatus().equals(DemandeReinscriptionEnum.DECLAREE)){
            throw new RuntimeException("Vous ne pouvez plus modifier ce demande d'inscription");
        }
        demandeReinscriptionMapper.updateFromRequest(demandeDTO, demande);
        return demandeReinscriptionMapper.toResponseDTO(demandeReinscriptionRepository.save(demande));
    }

    @Transactional
    public void deleteDemande(Long id, String email) {
        DemandeReinscription demande = demandeReinscriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Demande Reinscription " + id + " not found"));
        Doctorant doctorant = doctorantRepository.findByUtilisateurEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Doctorant " + email + " not found!"));
        if (!doctorant.getId().equals(demande.getDemandeur().getId())) {
            throw new AccessDeniedException("Vous n'êtes pas autorisé à accéder à cette ressource.");
        }
        if (!demande.getStatus().equals(DemandeReinscriptionEnum.DECLAREE)){
            throw new RuntimeException("Vous ne pouvez plus supprimer ce demande d'inscription");
        }
        demandeReinscriptionRepository.deleteById(id);
    }

    @Override
    @Transactional
    public DemandeReinscriptionResponseDTO validerchef(Long id, String email) {
        DemandeReinscription demande = demandeReinscriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Demande Reinscription " + id + " not found"));
        ChefEquipeRole chefEquipeRole = chefEquipeRoleRepository.findByProfesseurUtilisateurEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Chef Equipe Role " + email + " not found"));

        if (!demande.getStatus().equals(DemandeReinscriptionEnum.VALIDEE_DIRECTEUR_THESE)){
            throw new RuntimeException("if faut que la demande soit en état : VALIDEE_DIRECTEUR_THESE, mais elle est : " + demande.getStatus());
        }
        demande.setStatus(DemandeReinscriptionEnum.VALIDEE_CHEF);
        demande.setChefEquipeValidateur(chefEquipeRole);
        return demandeReinscriptionMapper.toResponseDTO(demande);
    }

    @Override
    @Transactional
    public DemandeReinscriptionResponseDTO refuserchef(Long id, String email) {
        DemandeReinscription demande = demandeReinscriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Demande Reinscription " + id + " not found"));
        ChefEquipeRole chefEquipeRole = chefEquipeRoleRepository.findByProfesseurUtilisateurEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Chef Equipe Role " + email + " not found"));

        if (!demande.getStatus().equals(DemandeReinscriptionEnum.VALIDEE_DIRECTEUR_THESE)){
            throw new RuntimeException("if faut que la demande soit en état : VALIDEE_DIRECTEUR_THESE, mais elle est : " + demande.getStatus());
        }
        demande.setStatus(DemandeReinscriptionEnum.REFUSEE);
        demande.setChefEquipeValidateur(chefEquipeRole);
        return demandeReinscriptionMapper.toResponseDTO(demande);
    }

    @Override
    @Transactional
    public DemandeReinscriptionResponseDTO validerdirection(Long id, String email) {
        DemandeReinscription demande = demandeReinscriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Demande Reinscription " + id + " not found"));
        DirectionCedoc direction = directionCedocRepository.findByUtilisateurEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Direction Cedoc " + email + " not found"));

        if (!demande.getStatus().equals(DemandeReinscriptionEnum.VALIDEE_CHEF)){
            throw new RuntimeException("Il faut que la demande soit en état : VALIDEE_CHEF, mais elle est : "+demande.getStatus());
        }
        demande.setStatus(DemandeReinscriptionEnum.VALIDEE);
        demande.setDirectionCedocValidateur(direction);
        return demandeReinscriptionMapper.toResponseDTO(demande);
    }

    @Override
    @Transactional
    public DemandeReinscriptionResponseDTO refuserdirection(Long id, String email) {
        DemandeReinscription demande = demandeReinscriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Demande Reinscription " + id + " not found"));
        DirectionCedoc direction = directionCedocRepository.findByUtilisateurEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Direction Cedoc " + email + " not found"));

        if (!demande.getStatus().equals(DemandeReinscriptionEnum.VALIDEE_CHEF)){
            throw new RuntimeException("Il faut que la demande soit en état : VALIDEE_CHEF, mais elle est : "+demande.getStatus());
        }
        demande.setStatus(DemandeReinscriptionEnum.REFUSEE);
        demande.setDirectionCedocValidateur(direction);
        return demandeReinscriptionMapper.toResponseDTO(demande);
    }
}
