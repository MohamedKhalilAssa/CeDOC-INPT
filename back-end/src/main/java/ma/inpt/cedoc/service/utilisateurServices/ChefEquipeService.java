package ma.inpt.cedoc.service.utilisateurServices;

import java.util.List;

import ma.inpt.cedoc.model.entities.candidature.Candidature;
import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.utilisateurs.ChefEquipe;

/**
 * Interface du service pour gérer les Chefs d'équipe (CRUD + méthodes métier).
 * Toutes les méthodes travaillent directement avec l'entité JPA ChefEquipe.
 */
public interface ChefEquipeService {

    // ----------------- READ -----------------

    /**
     * Retourne le ChefEquipe dont l'id vaut {@code id}, ou lève 404 si introuvable.
     */
    ChefEquipe findById(Long id);

    /**
     * Retourne la liste de tous les chefs d'équipe enregistrés.
     */
    List<ChefEquipe> findAll();

    /**
     * Indique si un ChefEquipe existe pour l'id donné.
     */
    boolean existsById(Long id);

    // ----------------- METIER (liés aux sujets / candidatures) -----------------

    /**
     * Retourne la liste des Sujets (entités) gérés par le chef d'équipe {@code id}.
     */
    List<Sujet> findSujetsByChefEquipeId(Long id);

    /**
     * Retourne la liste des Candidatures (entités) associées aux sujets de ce chef.
     */
    List<Candidature> findCandidaturesByChefEquipeId(Long id);

    /**
     * Vérifie si le chef d'équipe peut accéder à une candidature donnée (au moins un sujet de cette candidature lui appartient).
     */
    boolean canAccessCandidature(Long chefEquipeId, Long candidatureId);

    /**
     * Valide le sujet {@code sujetId} si ce sujet appartient au chef {@code chefEquipeId}.
     * Passe le champ "valide" à true et "estPublic" à true, puis sauvegarde.
     */
    Sujet validerSujet(Long chefEquipeId, Long sujetId);

    // ----------------- CREATE -----------------

    /**
     * Crée un nouveau ChefEquipe en base et retourne l'entité persistée.
     * (On peut ajouter des validations manuelles ici, si besoin,
     *  par exemple vérifier qu'un email identique n'existe pas déjà).
     */
    ChefEquipe createChefEquipe(ChefEquipe chefEquipe);

    // ----------------- UPDATE -----------------

    /**
     * Met à jour le ChefEquipe identifié par {@code id} avec les valeurs de {@code chefEquipe}.
     * Lève 404 si l'id n'existe pas.
     */
    ChefEquipe updateChefEquipe(Long id, ChefEquipe chefEquipe);

    // ----------------- DELETE -----------------

    /**
     * Supprime définitivement le ChefEquipe ayant l'id {@code id}. Lève 404 si introuvable.
     * (On peut vérifier avant suppression s'il n'a pas de sujets rattachés, etc.)
     */
    void deleteChefEquipe(Long id);
}
