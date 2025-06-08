package ma.inpt.cedoc.service.utilisateurServices;

import java.util.List;

import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.soutenance.DemandeSoutenance;
import ma.inpt.cedoc.model.entities.utilisateurs.DirecteurDeTheseRole;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;

public interface DirecteurDeTheseService {
    // ───–──── READ BASIQUES ───–────

    /** Retourne un DirecteurDeTheseRole par son ID, ou 404 si absence. */
    DirecteurDeTheseRole findById(Long id);

    /** Retourne la liste de tous les DirecteurDeTheseRole. */
    List<DirecteurDeTheseRole> findAll();

    /** Indique si un DirecteurDeTheseRole existe pour cet ID. */
    boolean existsById(Long id);

    // ───–──── MÉTIER / LOGIQUE "SUJETS / DOCTORANTS / SOUTENANCES" ───–────

    /**
     * Récupère la liste de tous les Sujets dont directeurDeThese.id == directeurId.
     */
    List<Sujet> findSujetsByDirecteurId(Long directeurId);

    /**
     * Récupère la liste de tous les Doctorants supervisés par ce directeur.
     */
    List<Doctorant> findDoctorantsByDirecteurId(Long directeurId);

    /**
     * Récupère la liste de toutes les demandes de soutenance pour ce directeur.
     */
    List<DemandeSoutenance> findDemandesSoutenanceByDirecteurId(Long directeurId);

    /**
     * Valide un Sujet (id = sujetId) à la demande d'un Directeur (id =
     * directeurId).
     * Passe sujet.valide=true, sujet.estPublic=true, puis sauvegarde.
     */
    Sujet validerSujet(Long directeurId, Long sujetId);

    // ───–──── CRUD COMPLET POUR DirecteurDeTheseRole ───–────

    /** Crée et enregistre un nouveau DirecteurDeTheseRole. */
    DirecteurDeTheseRole createDirecteurDeThese(DirecteurDeTheseRole directeurDeTheseRole);

    /** Met à jour le DirecteurDeTheseRole existant (ou 404 sinon). */
    DirecteurDeTheseRole updateDirecteurDeThese(Long id, DirecteurDeTheseRole dto);

    /**
     * Supprime le DirecteurDeTheseRole si possible (404 si introuvable, 400 si
     * encore des relations).
     */
    void deleteDirecteurDeThese(Long id);
}
