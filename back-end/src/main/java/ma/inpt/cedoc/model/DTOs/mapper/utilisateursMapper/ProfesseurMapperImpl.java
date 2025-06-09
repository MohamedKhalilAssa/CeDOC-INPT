package ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.ProfesseurResponseDTO;
import ma.inpt.cedoc.model.entities.utilisateurs.Professeur;

@Component
public class ProfesseurMapperImpl implements ProfesseurMapper {
    @Override
    public ProfesseurResponseDTO toSimpleDTO(Professeur p) {
        return ProfesseurResponseDTO.builder()
                .id(p.getId())
                .nom(p.getUtilisateur().getNom())
                .prenom(p.getUtilisateur().getPrenom())
                .email(p.getUtilisateur().getEmail())
                .telephone(p.getUtilisateur().getTelephone())
                .grade(p.getGrade())
                .build();
    }

    @Override
    public ProfesseurResponseDTO toDto(Professeur p) {
        return toSimpleDTO(p); // Use the same implementation
    }

    @Override
    public List<ProfesseurResponseDTO> toDtoList(List<Professeur> professeurs) {
        if (professeurs == null) {
            return null;
        }
        return professeurs.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
}
