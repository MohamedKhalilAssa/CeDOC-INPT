package ma.inpt.cedoc.service.utilisateurServices;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ma.inpt.cedoc.model.DTOs.Candidature.SujetResponseDTO;
import ma.inpt.cedoc.model.DTOs.Generic.PaginatedResponseDTO;
import ma.inpt.cedoc.model.entities.candidature.Candidature;
import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.utilisateurs.ChefEquipeRole;

public interface ChefEquipeService {
    // ───–──── READ BASIQUES ───–──── /** Retourne un ChefEquipeRole par son ID, ou
    // 404 si absence. */
    ChefEquipeRole findById(Long id);

    ChefEquipeRole findByEmail(String email);

    /**
     * Retourne un ChefEquipeRole par email avec les membres de l'équipe chargés.
     */
    ChefEquipeRole findByEmailWithMembers(String email);

    /** Retourne la liste de tous les ChefEquipeRole. */
    List<ChefEquipeRole> findAll();

    /** Indique si un ChefEquipeRole existe pour cet ID. */
    boolean existsById(Long id);

    // ───–──── MÉTIER / LOGIQUE “SUJETS / CANDIDATURES” ───–────

    /**
     * Récupère la liste de tous les Sujets dont chefEquipe.id == chefId.
     * (méthode exposée par GET /{id}/sujets)
     */
    List<Sujet> findSujetsByChefEquipeId(Long chefId);

    /**
     * Pour un chef donné, retourne toutes les Candidatures
     * qui contiennent au moins un Sujet géré par ce chef.
     * (GET /{id}/candidatures)
     */
    List<Candidature> findCandidaturesByChefEquipeId(Long chefId);

    /**
     * Vérifie si un Chef peut accéder (true/false) à une Candidature donnée,
     * c’est-à-dire si au moins un des Sujets de la Candidature appartient à ce
     * Chef.
     * (GET /{chefId}/can-access/{candidatureId})
     */
    boolean canAccessCandidature(Long chefEquipeId, Long candidatureId);

    /**
     * Valide un Sujet (id = sujetId) à la demande d’un Chef (id = chefId).
     * Passe sujet.valide=true, sujet.estPublic=true, puis sauvegarde.
     * (POST /{chefId}/valider-sujet/{sujetId})
     */
    Sujet validerSujet(Long chefEquipeId, Long sujetId);

    // ───–──── CRUD “CRUD COMPLET” POUR ChefEquipeRole ───–────

    /** Crée et enregistre un nouveau ChefEquipeRole. (POST /api/chefs-equipe) */
    ChefEquipeRole createChefEquipe(ChefEquipeRole chefEquipeRole);

    /** Met à jour le ChefEquipeRole existant (ou 404 sinon). (PUT /{id}) */
    ChefEquipeRole updateChefEquipe(Long id, ChefEquipeRole dto);

    /**
     * Supprime le ChefEquipeRole si possible (404 si introuvable, 400 si sujets
     * attachés). (DELETE /{id})
     */
    void deleteChefEquipe(Long id);


    /**
     * Trouve les sujets des membres de l'équipe de recherche du chef donné.
     * Retourne une réponse paginée avec DTOs pour l'API REST.
     */
    PaginatedResponseDTO<SujetResponseDTO> findSujetsMembreEquipesPaginated(ChefEquipeRole chef, Pageable pageable,
            String search);
}
