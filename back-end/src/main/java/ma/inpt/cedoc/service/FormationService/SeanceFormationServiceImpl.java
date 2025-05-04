package ma.inpt.cedoc.service.FormationService;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Formations.SeanceFormationRequestDTO;
import ma.inpt.cedoc.model.DTOs.Formations.SeanceFormationResponseDTO;
import ma.inpt.cedoc.model.DTOs.mapper.formationsMappers.SeanceFormationMapper;
import ma.inpt.cedoc.model.entities.formation.SeanceFormation;
import ma.inpt.cedoc.repositories.formationRepositories.SeanceFormationRepository;

@Service
@RequiredArgsConstructor
public class SeanceFormationServiceImpl implements SeanceFormationService {

    private final SeanceFormationRepository seanceFormationRepository;
    private final SeanceFormationMapper seanceFormationMapper;

    @Override
    public SeanceFormationResponseDTO createSeanceFormation(SeanceFormationRequestDTO dto) {
        SeanceFormation seanceFormation = seanceFormationMapper.seanceFormationRequestDTOToSeanceFormation(dto);
        SeanceFormation savedSeanceFormation = seanceFormationRepository.save(seanceFormation);
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
