package ma.inpt.cedoc.service.Reinscription;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Reinscription.AvisReinscriptionRequestDTO;
import ma.inpt.cedoc.model.DTOs.Reinscription.AvisReinscriptionResponseDTO;
import ma.inpt.cedoc.model.DTOs.mapper.ReinscriptionMappers.AvisResinscriptionMapper;
import ma.inpt.cedoc.model.entities.Reinscription.AvisReinscription;
import ma.inpt.cedoc.model.entities.utilisateurs.DirecteurDeThese;
import ma.inpt.cedoc.repositories.ResinscriptionRepositories.AvisReinscriptionRepository;
import ma.inpt.cedoc.repositories.utilisateursRepositories.DirecteurDeTheseRepository;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AvisReinscriptionServiceImpl implements AvisReinscriptionService {
    private final AvisReinscriptionRepository avisReinscriptionRepo;
    private final AvisResinscriptionMapper avisResinscriptionMapper;
    private final DirecteurDeTheseRepository directeurDeTheseRepo;

    public List<AvisReinscriptionResponseDTO> getAllAvis() {
        List<AvisReinscription> avis = avisReinscriptionRepo.findAll();
        return avis.stream()
                .map(avisResinscriptionMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    public AvisReinscriptionResponseDTO getAvis(Long id) {
        return avisResinscriptionMapper.toResponseDTO(avisReinscriptionRepo.findById(id).
                orElseThrow(() -> new ResourceNotFoundException("Avis with id "  + id + " not found")));
    }
    @Transactional
    public AvisReinscriptionResponseDTO createAvis(AvisReinscriptionRequestDTO requestDTO, String email) {
        DirecteurDeThese directeurDeThese = directeurDeTheseRepo.findByEmail(email).
                orElseThrow(() -> new ResourceNotFoundException("Directeur du thèse "+email+" n'est pas trouvé"));
        AvisReinscription avisReinscription = avisResinscriptionMapper.toEntity(requestDTO);
        avisReinscription.setDirecteurDeThese(directeurDeThese);
        return avisResinscriptionMapper.toResponseDTO(avisReinscriptionRepo.save(avisReinscription));
    }

    @Transactional
    public AvisReinscriptionResponseDTO editAvis(AvisReinscriptionRequestDTO requestDTO, Long id, String email) {
        AvisReinscription avisReinscription = avisReinscriptionRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Avis with id " + id + " not found"));
        avisResinscriptionMapper.updateFromRequest(requestDTO, avisReinscription);
        return avisResinscriptionMapper.toResponseDTO(avisReinscriptionRepo.save(avisReinscription));
    }

    @Transactional
    public void deleteAvis(Long id, String email) {
        avisReinscriptionRepo.deleteById(id);
    }
}
