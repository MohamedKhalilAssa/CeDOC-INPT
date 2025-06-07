package ma.inpt.cedoc.service.FormationService;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.persistence.EntityNotFoundException;
import ma.inpt.cedoc.model.DTOs.mapper.formationsMappers.FormationMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Formations.FormationRequestDTO;
import ma.inpt.cedoc.model.DTOs.Formations.FormationResponseDTO;
import ma.inpt.cedoc.model.entities.formation.Formation;
import ma.inpt.cedoc.repositories.formationRepositories.FormationRepository;

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
        Formation formation = formationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Formation non trouvée pour la supprimer"));

        // Clear relationships
        formation.getDoctorantsCibles().clear();
        formationRepository.save(formation); // update the join table
        formationRepository.flush(); // force immediate sync with DB

        // Now delete safely
        formationRepository.delete(formation);
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

    // @Override
    // public FormationResponseDTO updateFormation(Long id, FormationRequestDTO dto)
    // {
    // var existingFormation = formationRepository.findById(id)
    // .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
    // "Formation non trouvée"));
    //
    // existingFormation = formationMapper.formationRequestDTOToFormation(dto);
    //
    // var updatedFormation = formationRepository.save(existingFormation);
    // return formationMapper.formationToFormationResponseDTO(updatedFormation);
    // }

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

    @Override
    public List<FormationResponseDTO> getAllFormations() {
        List<Formation> formations = formationRepository.findAll();
        return formations.stream()
                .map(formationMapper::formationToFormationResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public FormationResponseDTO getById(Long id) {
        return formationMapper.formationToFormationResponseDTO(formationRepository.findById(id).orElse(null));
    }
}
