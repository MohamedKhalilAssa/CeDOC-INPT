package ma.inpt.cedoc.service.FormationService;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import ma.inpt.cedoc.model.DTOs.Formations.FormationRequestDTO;
import ma.inpt.cedoc.model.DTOs.Formations.FormationResponseDTO;
import ma.inpt.cedoc.model.DTOs.mapper.formationsMappers.FormationMapper;
import ma.inpt.cedoc.model.entities.formation.Formation;
import ma.inpt.cedoc.repositories.formationRepositories.FormationRepository;

@Service
public class FormationService {

    private final FormationMapper formationMapper;
    private final FormationRepository formationRepository;

    public FormationService(FormationMapper formationMapper, FormationRepository formationRepository) {
        this.formationMapper = formationMapper;
        this.formationRepository = formationRepository;
    }

    /* ------------------ Save methods ------------------ */

    public FormationResponseDTO saveFormation(FormationRequestDTO dto) {
        var formation = formationMapper.formationRequestDTOToFormation(dto);
        var savedFormation = formationRepository.save(formation);
        return formationMapper.formationToFormationResponseDTO(savedFormation);
    }

    public FormationResponseDTO saveFormationWithoutDto(Formation formation) {
        var savedFormation = formationRepository.save(formation);
        return formationMapper.formationToFormationResponseDTO(savedFormation);
    }

    /* ------------------ Delete method ------------------ */

    public void deleteById(Long id) {
        formationRepository.deleteById(id);
    }

    /* ------------------ Find methods ------------------ */

    public List<FormationResponseDTO> findByName(String name) {
        return formationRepository.findAllByFormationNameContaining(name)
                .stream()
                .map(formationMapper::formationToFormationResponseDTO)
                .collect(Collectors.toList());
    }

    public List<Formation> findByNameWithoutDto(String name) {
        return formationRepository.findAllByFormationNameContaining(name);
    }

    /* ------------------ Update method ------------------ */

    public FormationResponseDTO updateFormation(Long id, FormationRequestDTO dto) {
        var existingFormation = formationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Formation not found"));

        // Update fields
        existingFormation.setFormationName(dto.getFormationName());
        existingFormation.setModule(dto.getModule());
        existingFormation.setIntitule(dto.getIntitule());
        existingFormation.setNomFormateur(dto.getNomFormateur());
        existingFormation.setDateDebut(dto.getDateDebut());
        existingFormation.setDuree(dto.getDuree());
        existingFormation.setLieu(dto.getLieu());

        var updatedFormation = formationRepository.save(existingFormation);
        return formationMapper.formationToFormationResponseDTO(updatedFormation);
    }

    /* ------------------ Find by doctorant ID ------------------ */

    public List<FormationResponseDTO> findFormationsByDoctorantId(Long doctorantId) {
        List<Formation> formations = formationRepository.findFormationsByDoctorantId(doctorantId);
        return formations.stream()
                .map(formationMapper::formationToFormationResponseDTO)
                .collect(Collectors.toList());
    }
}
