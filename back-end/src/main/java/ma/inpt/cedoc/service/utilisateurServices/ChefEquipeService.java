package ma.inpt.cedoc.service.utilisateurServices;

import java.util.List;

import ma.inpt.cedoc.model.entities.candidature.Candidature;
import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.utilisateurs.ChefEquipe;

public interface ChefEquipeService {

    /* GET METHODS */
    ChefEquipe findById(Long id);

    List<ChefEquipe> findAll();

    boolean existsById(Long id);

    List<Sujet> findSujetsByChefEquipeId(Long id);

    List<Candidature> findCandidaturesByChefEquipeId(Long id);

    /* ACTION / VALIDATION METHODS */
    boolean canAccessCandidature(Long chefEquipeId, Long candidatureId);

    Sujet validerSujet(Long chefEquipeId, Long sujetId);

}
