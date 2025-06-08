package ma.inpt.cedoc.service.DoctorantActionService;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.repositories.DoctorantActionsRepositories.ConfParticipationRepository;
import ma.inpt.cedoc.repositories.model.DTOs.DoctorantActions.ConfParticipationRequestDTO;
import ma.inpt.cedoc.repositories.model.DTOs.DoctorantActions.ConfParticipationResponseDTO;
import ma.inpt.cedoc.repositories.model.DTOs.mapper.DoctorantActionsMappers.ConfParticipationMapper;
import ma.inpt.cedoc.repositories.model.entities.DoctorantActions.ConfParticipation;
import ma.inpt.cedoc.repositories.model.entities.utilisateurs.DirectionCedoc;
import ma.inpt.cedoc.repositories.model.entities.utilisateurs.Doctorant;
import ma.inpt.cedoc.repositories.model.enums.doctorant_enums.EtatEnum;
import ma.inpt.cedoc.repositories.utilisateursRepositories.DirectionCedocRepository;
import ma.inpt.cedoc.repositories.utilisateursRepositories.DoctorantRepository;

@Service
@RequiredArgsConstructor
public class ConfParticipationServiceImpl implements ConfParticipationService {
    private final ConfParticipationRepository confParticipationRepository;
    private final ConfParticipationMapper confParticipationMapper;
    private final DoctorantRepository doctorantRepository;
    private final DirectionCedocRepository directionCedocRepository;

    @Override
    public List<ConfParticipationResponseDTO> getAllConfParticipations() {
        List<ConfParticipation> confParticipations = confParticipationRepository.findAll();
        return confParticipations.stream()
                .map(confParticipationMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ConfParticipationResponseDTO> getConfParticipationsByDoctorantId(Long participantId) {
        List<ConfParticipation> confParticipations = confParticipationRepository.findByParticipantId(participantId);
        return confParticipations.stream()
                .map(confParticipationMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ConfParticipationResponseDTO getConfParticipationById(Long id) {
        ConfParticipation confParticipation = confParticipationRepository.findById(id)
                .orElseThrow(
                        () -> new ResourceNotFoundException("participation conférence " + id + " n'est pas trouvé"));
        return confParticipationMapper.toResponseDTO(confParticipation);
    }

    @Override
    @Transactional
    public ConfParticipationResponseDTO addConfParticipation(ConfParticipationRequestDTO requestDTO, String email) {
        Doctorant doctorant = doctorantRepository.findByUtilisateurEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("doctorant " + email + " n'est pas trouvé"));
        ConfParticipation confParticipation = confParticipationMapper.toEntity(requestDTO);
        confParticipation.setParticipant(doctorant);
        return confParticipationMapper.toResponseDTO(confParticipationRepository.save(confParticipation));
    }

    @Override
    @Transactional
    public ConfParticipationResponseDTO updateConfParticipation(ConfParticipationRequestDTO requestDTO, Long id,
            String email) {
        ConfParticipation confParticipation = confParticipationRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("participation à conférence " + id + " n'est pas trouvé"));
        Doctorant doctorant = doctorantRepository.findByUtilisateurEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("doctorant " + email + " n'est pas trouvé"));
        if (!doctorant.getId().equals(confParticipation.getParticipant().getId())) {
            throw new AccessDeniedException("Vous n'êtes pas autorisé à accéder à cette ressource.");
        }
        confParticipationMapper.updateFromRequest(requestDTO, confParticipation);
        return confParticipationMapper.toResponseDTO(confParticipationRepository.save(confParticipation));
    }

    @Override
    @Transactional
    public void deleteConfParticipation(Long id, String email) {
        ConfParticipation confParticipation = confParticipationRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("participation à conférence " + id + " n'est pas trouvé"));
        Doctorant doctorant = doctorantRepository.findByUtilisateurEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("doctorant " + email + " n'est pas trouvé"));
        if (!doctorant.getId().equals(confParticipation.getParticipant().getId())) {
            throw new AccessDeniedException("Vous n'êtes pas autorisé à accéder à cette ressource.");
        }
        confParticipationRepository.deleteById(id);
    }

    @Override
    @Transactional
    public ConfParticipationResponseDTO validerConfParticipation(Long id, String email) {
        DirectionCedoc directionCedoc = directionCedocRepository.findByUtilisateurEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("DirectionCeDoc " + email + " n'est pas trouvé"));
        ConfParticipation confParticipation = confParticipationRepository.findById(id)
                .orElseThrow(
                        () -> new ResourceNotFoundException("participation à conférence " + id + " n'est pas trouvé"));
        confParticipation.setValidateur(directionCedoc);
        confParticipation.setStatus(EtatEnum.VALIDE);
        return confParticipationMapper.toResponseDTO(confParticipationRepository.save(confParticipation));
    }

    @Override
    @Transactional
    public ConfParticipationResponseDTO refuserConfParticipation(Long id, String email) {
        DirectionCedoc directionCedoc = directionCedocRepository.findByUtilisateurEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("DirectionCeDoc " + email + " n'est pas trouvé"));
        ConfParticipation confParticipation = confParticipationRepository.findById(id)
                .orElseThrow(
                        () -> new ResourceNotFoundException("participation à conférence " + id + " n'est pas trouvé"));
        confParticipation.setValidateur(directionCedoc);
        confParticipation.setStatus(EtatEnum.REFUSEE);
        return confParticipationMapper.toResponseDTO(confParticipationRepository.save(confParticipation));
    }
}
