package ma.inpt.cedoc.model.DTOs.mapper.CandidatureMappers;

import org.springframework.stereotype.Component;

import ma.inpt.cedoc.model.DTOs.Candidature.SujetEquipeDTO;
import ma.inpt.cedoc.model.entities.candidature.Sujet;

@Component
public class SujetEquipeMapperImpl {

    /**
     * Convertit l’entité Sujet en SujetEquipeDTO (intituleSujet + nomEquipe).
     */
    public SujetEquipeDTO toDto(Sujet sujet) {
        if (sujet == null) {
            return null;
        }
        String intitule = sujet.getIntitule();
        String nomEquipe = sujet.getChefEquipe()
                               .getEquipeDeRecherche()
                               .getNomDeLequipe();
        return new SujetEquipeDTO(intitule, nomEquipe);
    }
}
