package ma.inpt.cedoc.service.FormationService;


import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Formations.VacationRequestDTO;
import ma.inpt.cedoc.model.DTOs.Formations.VacationResponseDTO;
import ma.inpt.cedoc.model.DTOs.mapper.formationsMappers.VacationMapper;
import ma.inpt.cedoc.model.entities.formation.Vacation;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import ma.inpt.cedoc.model.enums.formation_enums.StatutVacationEnum;
import ma.inpt.cedoc.repositories.formationRepositories.VacationRepository;
import ma.inpt.cedoc.repositories.utilisateursRepositories.DoctorantRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VacationServiceImpl implements VacationService {

    private final VacationRepository vacationRepository;
    private final DoctorantRepository doctorantRepository;
    private final VacationMapper vacationMapper;

    @Override
    public VacationResponseDTO create(VacationRequestDTO dto) {
        Vacation vacation = vacationMapper.vacationRequestDTOToVacation(dto);

        Doctorant doctorant = doctorantRepository.findById(dto.getDoctorantId())
                .orElseThrow(() -> new EntityNotFoundException("Doctorant not found with id: " + dto.getDoctorantId()));

        vacation.setDoctorant(doctorant);

        Vacation saved = vacationRepository.save(vacation);
        return vacationMapper.vacationToVacationResponseDTO(saved);
    }

    @Override
    public VacationResponseDTO update(Long id, VacationRequestDTO dto) {
        Vacation vacation = vacationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Vacation not found with id: " + id));

        vacationMapper.updateVacationFromDTO(dto, vacation);

        Doctorant doctorant = doctorantRepository.findById(dto.getDoctorantId())
                .orElseThrow(() -> new EntityNotFoundException("Doctorant not found with id: " + dto.getDoctorantId()));

        vacation.setDoctorant(doctorant);

        Vacation updated = vacationRepository.save(vacation);
        return vacationMapper.vacationToVacationResponseDTO(updated);
    }

    @Override
    public void delete(Long id) {
        Vacation vacation = vacationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Vacation not found"));

        if (vacation.getStatut() != StatutVacationEnum.DECLARER) {
            throw new IllegalStateException("La vacation ne peut être supprimée que si son statut est DECLARER.");
        }
        vacationRepository.deleteById(id);

    }

    @Override
    public VacationResponseDTO get(Long id) {
        Vacation vacation = vacationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Vacation not found with id: " + id));

        return vacationMapper.vacationToVacationResponseDTO(vacation);
    }

    @Override
    public List<VacationResponseDTO> getAll() {
        List<Vacation> vacations = vacationRepository.findAll();
        return vacations.stream()
                .map(vacationMapper::vacationToVacationResponseDTO)
                .collect(Collectors.toList());
    }
}
