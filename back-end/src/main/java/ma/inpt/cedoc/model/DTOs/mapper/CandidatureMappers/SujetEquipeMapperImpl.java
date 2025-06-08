package ma.inpt.cedoc.model.DTOs.mapper.CandidatureMappers;

import org.springframework.stereotype.Component;

import ma.inpt.cedoc.model.DTOs.Candidature.SujetEquipeDTO;
import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.utilisateurs.ChefEquipeRole;

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

        // Récupérer le ChefEquipeRole associé au sujet
        ChefEquipeRole chefRole = sujet.getChefEquipe();
        if (chefRole == null) {
            return new SujetEquipeDTO(intitule, null);
        } // ChefEquipeRole a une seule EquipeDeRecherche.
        String nomEquipe = null;
        if (chefRole.getEquipesDeRecherche() != null) {
            nomEquipe = chefRole.getEquipesDeRecherche().getNomDeLequipe();
        }

        return new SujetEquipeDTO(intitule, nomEquipe);
    }
}
