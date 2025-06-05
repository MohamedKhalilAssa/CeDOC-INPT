package ma.inpt.cedoc.service.Reinscription;

import java.util.List;
import java.util.stream.Collectors;

import ma.inpt.cedoc.model.enums.reinscription_enums.AvisEnum;
import ma.inpt.cedoc.model.enums.reinscription_enums.DemandeReinscriptionEnum;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Reinscription.AvisReinscriptionRequestDTO;
import ma.inpt.cedoc.model.DTOs.Reinscription.AvisReinscriptionResponseDTO;
import ma.inpt.cedoc.model.DTOs.mapper.ReinscriptionMappers.AvisResinscriptionMapper;
import ma.inpt.cedoc.model.entities.Reinscription.AvisReinscription;
import ma.inpt.cedoc.model.entities.Reinscription.DemandeReinscription;
import ma.inpt.cedoc.model.entities.utilisateurs.DirecteurDeTheseRole;
import ma.inpt.cedoc.model.entities.utilisateurs.Professeur;
import ma.inpt.cedoc.repositories.ResinscriptionRepositories.AvisReinscriptionRepository;
import ma.inpt.cedoc.repositories.ResinscriptionRepositories.DemandeReinscriptionRepository;
import ma.inpt.cedoc.repositories.utilisateursRepositories.DirecteurDeTheseRoleRepository;
import ma.inpt.cedoc.service.utilisateurServices.ProfesseurService;

@Service
@RequiredArgsConstructor
public class AvisReinscriptionServiceImpl implements AvisReinscriptionService {
    private final AvisReinscriptionRepository avisReinscriptionRepo;
    private final AvisResinscriptionMapper avisResinscriptionMapper;
    private final DirecteurDeTheseRoleRepository directeurDeTheseRepo;
    private final DemandeReinscriptionRepository demandeReinscriptionRepository;

    public List<AvisReinscriptionResponseDTO> getAllAvis() {
        List<AvisReinscription> avis = avisReinscriptionRepo.findAll();
        return avis.stream()
                .map(avisResinscriptionMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AvisReinscriptionResponseDTO> getAvisByDirecteurThese(Long id) {
        DirecteurDeTheseRole directeurDeThese = directeurDeTheseRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Directeur de these "+id+" n'est pas trouvé"));
        List<AvisReinscription> avisList = directeurDeThese.getAvisReinscriptionList();
        return avisList.stream()
                .map(avisResinscriptionMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    public AvisReinscriptionResponseDTO getAvisById(Long id) {
        return avisResinscriptionMapper.toResponseDTO(avisReinscriptionRepo.findById(id).
                orElseThrow(() -> new ResourceNotFoundException("Avis with id "  + id + " not found")));
    }

    @Transactional
    public AvisReinscriptionResponseDTO createAvis(AvisReinscriptionRequestDTO requestDTO, String email) {

        DirecteurDeTheseRole directeurDeThese = directeurDeTheseRepo.findByProfesseurEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Directeur du thèse "+email+" n'est pas trouvé"));

        // vérifier si le directeur de these est responsable de cette demande ou pas (est ce qu'il est responsable pour ce sujet là)
        DemandeReinscription demandeResincription = demandeReinscriptionRepository.findById(requestDTO.getDemandeReinscriptionId())
                .orElseThrow(() -> new ResourceNotFoundException("DemandeReinscription n'existe pas "));
        if (!directeurDeThese.getSujets().contains(demandeResincription.getSujet())){
            throw new AccessDeniedException("Vous n'êtes pas autorisé à réviser ce demande de réinscription");
        }
        //--------------------------------------------------------------------------
        AvisReinscription avisReinscription = avisResinscriptionMapper.toEntity(requestDTO);
        avisReinscription.setDirecteurDeThese(directeurDeThese);
        if (avisReinscription.getAvisFinal().equals(AvisEnum.NON_FAVORABLE)){
            demandeResincription.setStatus(DemandeReinscriptionEnum.REFUSEE);
        }else{
            demandeResincription.setStatus(DemandeReinscriptionEnum.VALIDEE_DIRECTEUR_THESE);
        }
        return avisResinscriptionMapper.toResponseDTO(avisReinscriptionRepo.save(avisReinscription));
    }

    @Transactional
    public AvisReinscriptionResponseDTO editAvis(AvisReinscriptionRequestDTO requestDTO, Long id, String email) {
        AvisReinscription avisReinscription = avisReinscriptionRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Avis with id " + id + " not found"));

        // après la validation du chef d'équpie ou la direction vous ne pouvez pas faire des changements
        if (!avisReinscription.getDemandeReinscription().getStatus().equals(DemandeReinscriptionEnum.VALIDEE_DIRECTEUR_THESE)){
            throw new RuntimeException("vous ne pouvez plus modifier cet avis");
        }

        DirecteurDeTheseRole directeurDeThese = directeurDeTheseRepo.findByProfesseurEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Directeur du thèse "+email+" n'est pas trouvé"));

        if (!avisReinscription.getDirecteurDeThese().equals(directeurDeThese)){
            throw new AccessDeniedException("Vous n'avez pas accès à modifier cet avis de réinscription");
        }

        avisResinscriptionMapper.updateFromRequest(requestDTO, avisReinscription);
        if (avisReinscription.getAvisFinal().equals(AvisEnum.NON_FAVORABLE)){
            avisReinscription.getDemandeReinscription().setStatus(DemandeReinscriptionEnum.REFUSEE);
        }else{
            avisReinscription.getDemandeReinscription().setStatus(DemandeReinscriptionEnum.VALIDEE_DIRECTEUR_THESE);
        }
        return avisResinscriptionMapper.toResponseDTO(avisReinscriptionRepo.save(avisReinscription));
    }

    @Transactional
    public void deleteAvis(Long id, String email) {
        AvisReinscription avisReinscription = avisReinscriptionRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Avis with id " + id + " not found"));

        // après la validation du chef d'équpie ou la direction vous ne pouvez pas faire des changements
        if (!avisReinscription.getDemandeReinscription().getStatus().equals(DemandeReinscriptionEnum.VALIDEE_DIRECTEUR_THESE)){
            throw new RuntimeException("vous ne pouvez plus supprimer cet avis");
        }

        DirecteurDeTheseRole directeurDeThese = directeurDeTheseRepo.findByProfesseurEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Directeur du thèse "+email+" n'est pas trouvé"));

        if (!avisReinscription.getDirecteurDeThese().equals(directeurDeThese)){
            throw new AccessDeniedException("Vous n'avez pas accès à modifier cet avis de réinscription");
        }

        avisReinscriptionRepo.deleteById(id);
    }
}
