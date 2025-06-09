package ma.inpt.cedoc.model.DTOs.mapper.formationsMappers;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Formations.FormationRequestDTO;
import ma.inpt.cedoc.model.DTOs.Formations.FormationResponseDTO;
import ma.inpt.cedoc.model.entities.formation.Formation;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import ma.inpt.cedoc.repositories.utilisateursRepositories.DoctorantRepository;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class FormationMapper {
    private final DoctorantRepository doctorantRepository;



    public Formation formationRequestDTOToFormation(FormationRequestDTO dto) {
        Formation formation = new Formation();
        formation.setFormationName(dto.getFormationName());
        formation.setModule(dto.getModule());
        formation.setIntitule(dto.getIntitule());
        formation.setNomFormateur(dto.getNomFormateur());
        formation.setDateDebut(dto.getDateDebut());
        formation.setDuree(dto.getDuree());
        formation.setLieu(dto.getLieu());
        formation.setDoctorantsCibles(mapDoctorantIdsToEntities(dto.getDoctorantsCiblesIds()));
        formation.setDetails(dto.getDetails());
        formation.setImage(dto.getImage());
        return formation;
    }


    public FormationResponseDTO formationToFormationResponseDTO(Formation formation) {
        return FormationResponseDTO.builder()
                .id(formation.getId())
                .formationName(formation.getFormationName())
                .module(formation.getModule())
                .intitule(formation.getIntitule())
                .nomFormateur(formation.getNomFormateur())
                .dateDebut(formation.getDateDebut() != null ? formation.getDateDebut().toString() : null)
                .duree(formation.getDuree())
                .lieu(formation.getLieu())
                .createdAt(formation.getCreatedAt())
                .updatedAt(formation.getUpdatedAt())
                .doctorantIds(mapDoctorantEntitiesToIds(formation))
                .details(formation.getDetails())
                .image(formation.getImage())
                .build();
    }

    public void updateFormationFromDTO(FormationRequestDTO dto, Formation entity) {
        entity.setFormationName(dto.getFormationName());
        entity.setModule(dto.getModule());
        entity.setIntitule(dto.getIntitule());
        entity.setNomFormateur(dto.getNomFormateur());
        entity.setDateDebut(dto.getDateDebut());
        entity.setDuree(dto.getDuree());
        entity.setLieu(dto.getLieu());
    }

    private List<Long> mapDoctorantEntitiesToIds(Formation formation) {
        if (formation.getDoctorantsCibles() == null) return Collections.emptyList();
        return formation.getDoctorantsCibles().stream()
                .map(Doctorant::getId)
                .collect(Collectors.toList());
    }

    private List<Doctorant> mapDoctorantIdsToEntities(List<Long> ids) {
        if (ids == null) return Collections.emptyList();
        return ids.stream()
                .map(doctorantRepository::findById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toList());
    }
}
