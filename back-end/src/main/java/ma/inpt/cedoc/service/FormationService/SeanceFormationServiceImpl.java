package ma.inpt.cedoc.service.FormationService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Formations.FormationResponseDTO;
import ma.inpt.cedoc.model.DTOs.Formations.SeanceFormationRequestDTO;
import ma.inpt.cedoc.model.DTOs.Formations.SeanceFormationResponseDTO;
import ma.inpt.cedoc.model.DTOs.mapper.formationsMappers.FormationMapper;
import ma.inpt.cedoc.model.DTOs.mapper.formationsMappers.SeanceFormationMapper;
import ma.inpt.cedoc.model.entities.formation.Formation;
import ma.inpt.cedoc.model.entities.formation.SeanceFormation;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import ma.inpt.cedoc.model.entities.utilisateurs.ResponsableDeFormationRole;
import ma.inpt.cedoc.model.enums.formation_enums.StatutFormationEnum;
import ma.inpt.cedoc.repositories.formationRepositories.FormationRepository;
import ma.inpt.cedoc.repositories.formationRepositories.SeanceFormationRepository;
import ma.inpt.cedoc.repositories.utilisateursRepositories.DoctorantRepository;
import ma.inpt.cedoc.repositories.utilisateursRepositories.ResponsableDeFormationRoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class SeanceFormationServiceImpl implements SeanceFormationService {

    private final SeanceFormationRepository seanceFormationRepository;
    private final SeanceFormationMapper seanceFormationMapper;
    private final DoctorantRepository doctorantRepository;
    private final FormationRepository formationRepository;
    private final ResponsableDeFormationRoleRepository responsableDeFormationRepository;

    private final FormationMapper formationMapper;

    @Override
    public SeanceFormationResponseDTO createSeanceFormation(SeanceFormationRequestDTO dto) {
        SeanceFormation seanceFormation = seanceFormationMapper.seanceFormationRequestDTOToSeanceFormation(dto);

        // Save
        SeanceFormation savedSeanceFormation = seanceFormationRepository.save(seanceFormation);

        // Return response
        return seanceFormationMapper.seanceFormationToSeanceFormationResponseDTO(savedSeanceFormation);
    }


    @Override
    public SeanceFormationResponseDTO updateSeanceFormation(Long id, SeanceFormationRequestDTO dto) {
        SeanceFormation seanceFormation = seanceFormationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("SeanceFormation not found with id " + id));

        seanceFormationMapper.updateSeanceFormationFromDTO(dto, seanceFormation);
        SeanceFormation updatedSeanceFormation = seanceFormationRepository.save(seanceFormation);
        return seanceFormationMapper.seanceFormationToSeanceFormationResponseDTO(updatedSeanceFormation);
    }

    @Override
    public SeanceFormationResponseDTO getSeanceFormationById(Long id) {
        SeanceFormation seanceFormation = seanceFormationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("SeanceFormation not found with id " + id));
        return seanceFormationMapper.seanceFormationToSeanceFormationResponseDTO(seanceFormation);
    }

    @Override
    public List<SeanceFormationResponseDTO> getAllSeanceFormations() {
        List<SeanceFormation> seanceFormations = seanceFormationRepository.findAll();
        return seanceFormations.stream()
                .map(seanceFormationMapper::seanceFormationToSeanceFormationResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteSeanceFormation(Long id) {
        SeanceFormation seance = seanceFormationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("SeanceFormation not found"));

        if (seance.getStatut() != StatutFormationEnum.DECLARER) {
            throw new IllegalStateException("La séance de formation ne peut être supprimée que si son statut est DECLARER.");
        }

        seanceFormationRepository.deleteById(id);
    }

    @Override
    public Long getValidatedDureeByFormationAndDoctorant(Long formationId, Long doctorantUtilisateurId) {
        return seanceFormationRepository.findSumDureeForValidatedByFormationIdAndDoctorantUtilisateurId(formationId, doctorantUtilisateurId)
                .orElse(0L);
    }

    @Override
    public Long getSumDureeByDeclarant(Long declarantId) {
        return seanceFormationRepository.findSumDureeByDeclarantId(declarantId)
                .orElse(0L);
    }

    @Override
    public List<FormationResponseDTO> getValidatedFormationsByDoctorant(Long doctorantUtilisateurId) {
        List<Formation> formations = seanceFormationRepository.findDistinctValidatedFormationsByDoctorantUtilisateurId(doctorantUtilisateurId);
        return formations.stream()
                .map(formationMapper::formationToFormationResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Long getValidatedSumDureeByDeclarant(Long doctorantUtilisateurId) {
        return seanceFormationRepository.findSumDureeByDeclarantUtilisateurIdWhereFormationValidee(doctorantUtilisateurId).orElse(0L);
    }

    @Override
    public List<SeanceFormationResponseDTO> getDeclaredSeancesByDoctorantUtilisateurId(Long utilisateurId) {
        List<SeanceFormation> seances = seanceFormationRepository.findByDeclarantUtilisateurId(utilisateurId);
        return seances.stream()
                .map(seanceFormationMapper::seanceFormationToSeanceFormationResponseDTO)
                .collect(Collectors.toList());
    }



}
