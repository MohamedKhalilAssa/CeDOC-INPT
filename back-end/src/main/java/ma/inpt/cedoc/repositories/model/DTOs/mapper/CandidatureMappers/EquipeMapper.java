package ma.inpt.cedoc.repositories.model.DTOs.mapper.CandidatureMappers;

import org.springframework.stereotype.Component;

import ma.inpt.cedoc.repositories.model.DTOs.Utilisateurs.simpleDTOs.EquipeSimpleDTO;
import ma.inpt.cedoc.repositories.model.entities.utilisateurs.EquipeDeRecherche;

@Component
public class EquipeMapper {
    public EquipeSimpleDTO toDto(EquipeDeRecherche e) {
        return EquipeSimpleDTO.builder()
                .id(e.getId())
                .nom(e.getNomDeLequipe())
                .build();
    }
}
