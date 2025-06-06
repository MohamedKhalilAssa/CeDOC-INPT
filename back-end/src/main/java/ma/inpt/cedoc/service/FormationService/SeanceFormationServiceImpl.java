package ma.inpt.cedoc.service.FormationService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Formations.SeanceFormationRequestDTO;
import ma.inpt.cedoc.model.DTOs.Formations.SeanceFormationResponseDTO;
import ma.inpt.cedoc.model.DTOs.mapper.formationsMappers.SeanceFormationMapper;
import ma.inpt.cedoc.model.entities.formation.Formation;
import ma.inpt.cedoc.model.entities.formation.SeanceFormation;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import ma.inpt.cedoc.model.entities.utilisateurs.ResponsableDeFormation;
import ma.inpt.cedoc.repositories.formationRepositories.FormationRepository;
import ma.inpt.cedoc.repositories.formationRepositories.SeanceFormationRepository;
import ma.inpt.cedoc.repositories.utilisateursRepositories.DoctorantRepository;
import ma.inpt.cedoc.repositories.utilisateursRepositories.ResponsableDeFormationRepository;
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
    private final ResponsableDeFormationRepository responsableDeFormationRepository;

    @Override
    public SeanceFormationResponseDTO createSeanceFormation(SeanceFormationRequestDTO dto) {
        SeanceFormation seanceFormation = seanceFormationMapper.seanceFormationRequestDTOToSeanceFormation(dto);

        // Fetch related entities
        Formation formation = formationRepository.findById(dto.getFormationId())
                .orElseThrow(() -> new RuntimeException("Formation not found with id " + dto.getFormationId()));
        Doctorant declarant = doctorantRepository.findById(dto.getDeclarantId())
                .orElseThrow(() -> new RuntimeException("Doctorant not found with id " + dto.getDeclarantId()));
        ResponsableDeFormation responsable = responsableDeFormationRepository.findById(dto.getValideParId())
                .orElseThrow(() -> new RuntimeException("ResponsableDeFormation not found with id " + dto.getValideParId()));

        // Set them manually
        seanceFormation.setFormation(formation);
        seanceFormation.setDeclarant(declarant);
        seanceFormation.setValidePar(responsable);

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
        if (!seanceFormationRepository.existsById(id)) {
            throw new RuntimeException("SeanceFormation not found with id " + id);
        }
        seanceFormationRepository.deleteById(id);
    }

    @Override
    public Long getSumDureeByFormationAndDeclarant(Long formationId, Long declarantId) {
        return seanceFormationRepository.findSumDureeByFormationIdAndDeclarantId(formationId, declarantId)
                .orElse(0L);
    }

    @Override
    public Long getSumDureeByDeclarant(Long declarantId) {
        return seanceFormationRepository.findSumDureeByDeclarantId(declarantId)
                .orElse(0L);
    }

}
