package ma.inpt.cedoc.service.DoctorantActionService;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.DoctorantActions.ConfParticipationRequestDTO;
import ma.inpt.cedoc.model.DTOs.DoctorantActions.ConfParticipationResponseDTO;
import ma.inpt.cedoc.model.DTOs.mapper.DoctorantActionsMappers.ConfParticipationMapper;
import ma.inpt.cedoc.model.entities.DoctorantActions.ConfParticipation;
import ma.inpt.cedoc.model.enums.doctorant_enums.EtatEnum;
import ma.inpt.cedoc.repositories.DoctorantActionsRepositories.ConfParticipationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConfParticipationService {
    private ConfParticipationRepository confParticipationRepository;
    private ConfParticipationMapper confParticipationMapper;

    public List<ConfParticipationResponseDTO> getAllConf() {
        List<ConfParticipation> list = confParticipationRepository.findAll();
        List<ConfParticipationResponseDTO> newlist = list.stream()
                .map((c) -> confParticipationMapper.toResponseDTO(c))
                .collect(Collectors.toList());
        return newlist;
    }

    public ConfParticipationResponseDTO getConf(Long id) {
        ConfParticipation confParticipation =  confParticipationRepository.findById(id).
                orElseThrow(() -> new RuntimeException("Participation à conférence n'est pas trouvé"));
        return confParticipationMapper.toResponseDTO(confParticipation);
    }

    public ConfParticipationResponseDTO createConf(ConfParticipationRequestDTO confParticipationRequestDTO) {
        ConfParticipation confParticipation = confParticipationMapper.toEntity(confParticipationRequestDTO);
        confParticipation.setStatus(EtatEnum.DECLAREE);
        confParticipationRepository.save(confParticipation);
        return confParticipationMapper.toResponseDTO(confParticipation);
    }

    public ConfParticipationResponseDTO editConf(Long id, ConfParticipationRequestDTO confParticipationRequestDTO) {
        ConfParticipation confParticipation =  confParticipationRepository.findById(id).
                orElseThrow(() -> new RuntimeException("Participation à conférence n'est pas trouvé"));
        confParticipationMapper.updateFromRequest(confParticipationRequestDTO, confParticipation);
        confParticipationRepository.save(confParticipation);
        return confParticipationMapper.toResponseDTO(confParticipation);
    }

    public void deleteConf(Long id) {
        confParticipationRepository.deleteById(id);
    }
}
