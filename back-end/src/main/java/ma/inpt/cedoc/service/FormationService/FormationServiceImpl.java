package ma.inpt.cedoc.service.FormationService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Formations.FormationResponseDTO;
import ma.inpt.cedoc.model.DTOs.Formations.FormationRequestDTO;
import ma.inpt.cedoc.model.DTOs.mapper.formationsMappers.FormationMapper;
import ma.inpt.cedoc.model.entities.formation.Formation;
import ma.inpt.cedoc.repositories.formationRepositories.FormationRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class FormationServiceImpl implements FormationService {

    private final FormationMapper formationMapper;
    private final FormationRepository formationRepository;

    /* ------------------ Save methods ------------------ */

    @Override
    public FormationResponseDTO saveFormation(FormationRequestDTO dto) {
        var formation = formationMapper.formationRequestDTOToFormation(dto);
        var savedFormation = formationRepository.save(formation);
        return formationMapper.formationToFormationResponseDTO(savedFormation);
    }

    @Override
    public FormationResponseDTO saveFormationWithoutDto(Formation formation) {
        var savedFormation = formationRepository.save(formation);
        return formationMapper.formationToFormationResponseDTO(savedFormation);
    }

    /* ------------------ Delete method ------------------ */

    @Override
    public void deleteById(Long id) {
        if (!formationRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Formation non trouvée pour la supprimer");
        }
        formationRepository.deleteById(id);
    }

    /* ------------------ Find methods ------------------ */

    @Override
    public List<FormationResponseDTO> findByName(String name) {
        return formationRepository.findAllByFormationNameContaining(name)
                .stream()
                .map(formationMapper::formationToFormationResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<Formation> findByNameWithoutDto(String name) {
        return formationRepository.findAllByFormationNameContaining(name);
    }

    /* ------------------ Update method ------------------ */

//    @Override
//    public FormationResponseDTO updateFormation(Long id, FormationRequestDTO dto) {
//        var existingFormation = formationRepository.findById(id)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Formation non trouvée"));
//
//        existingFormation = formationMapper.formationRequestDTOToFormation(dto);
//
//        var updatedFormation = formationRepository.save(existingFormation);
//        return formationMapper.formationToFormationResponseDTO(updatedFormation);
//    }

    @Override
    public FormationResponseDTO updateFormation(Long id, FormationRequestDTO dto) {
        Formation existingFormation = formationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Formation introuvable"));

        formationMapper.updateFormationFromDTO(dto, existingFormation);

        Formation updatedFormation = formationRepository.save(existingFormation);
        return formationMapper.formationToFormationResponseDTO(updatedFormation);
    }

    /* ------------------ Find by doctorant ID ------------------ */

    @Override
    public List<FormationResponseDTO> findFormationsByDoctorantId(Long doctorantId) {
        List<Formation> formations = formationRepository.findFormationsByDoctorantId(doctorantId);
        return formations.stream()
                .map(formationMapper::formationToFormationResponseDTO)
                .collect(Collectors.toList());
    }
}
