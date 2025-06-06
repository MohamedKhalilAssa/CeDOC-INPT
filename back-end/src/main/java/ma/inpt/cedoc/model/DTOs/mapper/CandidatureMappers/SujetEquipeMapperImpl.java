    package ma.inpt.cedoc.model.DTOs.mapper.CandidatureMappers;

    import org.springframework.stereotype.Component;

import ma.inpt.cedoc.model.DTOs.Candidature.SujetEquipeDTO;
import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.utilisateurs.ChefEquipeRole;
import ma.inpt.cedoc.model.entities.utilisateurs.EquipeDeRecherche;

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
            }

            // ChefEquipeRole peut avoir plusieurs EquipeDeRecherche.
            // Choisissons la première, ou null si la liste est vide.
            String nomEquipe = null;
            if (chefRole.getEquipesDeRecherche() != null && !chefRole.getEquipesDeRecherche().isEmpty()) {
                EquipeDeRecherche premiereEquipe = chefRole.getEquipesDeRecherche().get(0);
                nomEquipe = premiereEquipe.getNomDeLequipe();
            }

            return new SujetEquipeDTO(intitule, nomEquipe);
        }
    }
