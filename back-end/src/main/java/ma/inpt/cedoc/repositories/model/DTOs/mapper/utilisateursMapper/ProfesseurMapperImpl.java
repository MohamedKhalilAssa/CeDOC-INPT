package ma.inpt.cedoc.repositories.model.DTOs.mapper.utilisateursMapper;

import org.springframework.stereotype.Component;

import ma.inpt.cedoc.repositories.model.DTOs.Utilisateurs.simpleDTOs.ProfesseurResponseDTO;
import ma.inpt.cedoc.repositories.model.entities.utilisateurs.Professeur;

@Component
public class ProfesseurMapperImpl implements ProfesseurMapper {
    @Override
    public ProfesseurResponseDTO toSimpleDTO(Professeur p) {
        return ProfesseurResponseDTO.builder()
                .id(p.getId())
                .nom(p.getUtilisateur().getNom())
                .prenom(p.getUtilisateur().getPrenom())
                .email(p.getUtilisateur().getEmail())
                .grade(p.getGrade().name())
                .build();
    }
}
