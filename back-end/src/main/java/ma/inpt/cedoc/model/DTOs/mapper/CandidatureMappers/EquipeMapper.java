package ma.inpt.cedoc.model.DTOs.mapper.CandidatureMappers;

import org.springframework.stereotype.Component;

import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.EquipeSimpleDTO;
import ma.inpt.cedoc.model.entities.utilisateurs.EquipeDeRecherche;

@Component
public class EquipeMapper {
    public EquipeSimpleDTO toDto(EquipeDeRecherche e) {
        return EquipeSimpleDTO.builder()
                .id(e.getId())
                .nom(e.getNomDeLequipe())
                .build();
    }
}
