package ma.inpt.cedoc.service.DoctorantActionService;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.DoctorantActions.PublicationRequestDTO;
import ma.inpt.cedoc.model.DTOs.DoctorantActions.PublicationResponseDTO;
import ma.inpt.cedoc.model.DTOs.mapper.DoctorantActionsMappers.PublicationMapper;
import ma.inpt.cedoc.model.entities.DoctorantActions.Publication;
import ma.inpt.cedoc.model.entities.utilisateurs.DirectionCedoc;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import ma.inpt.cedoc.model.enums.doctorant_enums.EtatEnum;
import ma.inpt.cedoc.repositories.DoctorantActionsRepositories.PublicationRepository;
import ma.inpt.cedoc.repositories.utilisateursRepositories.DirectionCedocRepository;
import ma.inpt.cedoc.repositories.utilisateursRepositories.DoctorantRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class PublicationServiceImpl implements PublicationService {
    private final PublicationRepository publicationRepository;
    private final PublicationMapper publicationMapper;
    private final DoctorantRepository doctorantRepository;
    private final DirectionCedocRepository directionCedocRepository;

    @Override
    public List<PublicationResponseDTO> getAllPublications() {
        List<Publication> publications = publicationRepository.findAll();
        return publications.stream()
                .map(publicationMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<PublicationResponseDTO> getPublicationsByDoctorantId(Long doctorantId) {
        List<Publication> publications = publicationRepository.findByAuteurId(doctorantId);
        return publications.stream()
                .map(publicationMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PublicationResponseDTO getPublicationById(Long id) {
        Publication publication = publicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Publication " + id + " not found"));
        return publicationMapper.toResponseDTO(publication);
    }

    @Override
    public PublicationResponseDTO addPublication(PublicationRequestDTO requestDTO, String email) {
        Doctorant doctorant = doctorantRepository.findByUtilisateurEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Doctorant " + email + " not found"));
        Publication publication = publicationMapper.toEntity(requestDTO);
        publication.setAuteur(doctorant);
        return publicationMapper.toResponseDTO(publicationRepository.save(publication));
    }

    @Override
    public PublicationResponseDTO updatePublication(PublicationRequestDTO requestDTO, Long id, String email) {
        Publication publication = publicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Publication " + id + " n'est pas trouvé"));
        Doctorant doctorant = doctorantRepository.findByUtilisateurEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Doctorant " + email + " not found"));
        if (!publication.getAuteur().getId().equals(doctorant.getId())) {
            throw new AccessDeniedException("Vous n'êtes pas autorisé à accéder à cette ressource.");
        }
        publicationMapper.updateFromRequest(requestDTO, publication);
        return publicationMapper.toResponseDTO(publicationRepository.save(publication));
    }

    @Override
    public void deletePublication(Long id, String email) {
        Publication publication = publicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Publication " + id + " n'est pas trouvé"));
        Doctorant doctorant = doctorantRepository.findByUtilisateurEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Doctorant " + email + " not found"));
        if (!publication.getAuteur().getId().equals(doctorant.getId())) {
            throw new AccessDeniedException("Vous n'êtes pas autorisé à accéder à cette ressource.");
        }
        publicationRepository.deleteById(id);
    }

    @Override
    public PublicationResponseDTO validerPublication(Long id, String email) {
        DirectionCedoc directionCedoc = directionCedocRepository.findByUtilisateurEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("DirectionCeDoc " + email + " n'est pas trouvé"));
        Publication publication = publicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Publication " + id + " n'est pas trouvé"));
        publication.setValidateur(directionCedoc);
        publication.setStatus(EtatEnum.VALIDE);
        return publicationMapper.toResponseDTO(publicationRepository.save(publication));
    }

    @Override
    public PublicationResponseDTO refuserPublication(Long id, String email) {
        DirectionCedoc directionCedoc = directionCedocRepository.findByUtilisateurEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("DirectionCeDoc " + email + " n'est pas trouvé"));
        Publication publication = publicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Publication " + id + " n'est pas trouvé"));
        publication.setValidateur(directionCedoc);
        publication.setStatus(EtatEnum.REFUSEE);
        return publicationMapper.toResponseDTO(publicationRepository.save(publication));
    }
}
