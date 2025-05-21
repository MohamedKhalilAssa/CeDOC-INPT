package ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper;

import org.springframework.stereotype.Component;

import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.ProfesseurResponseDTO;
import ma.inpt.cedoc.model.entities.utilisateurs.Professeur;

@Component
public class ProfesseurMapperImpl {
    public ProfesseurResponseDTO toSimpleDTO(Professeur p) {
        return ProfesseurResponseDTO.builder()
                .id(p.getId())
                .nom(p.getNom())
                .prenom(p.getPrenom())
                .email(p.getEmail())
                .grade(p.getGrade().name())
                .build();
    }
}
