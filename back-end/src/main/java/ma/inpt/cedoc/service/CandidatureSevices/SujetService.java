package ma.inpt.cedoc.service.CandidatureSevices;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ma.inpt.cedoc.model.DTOs.Candidature.ChefSujetsEquipeResponseDTO;
import ma.inpt.cedoc.model.DTOs.Candidature.SujetRequestDTO;
import ma.inpt.cedoc.model.DTOs.Candidature.SujetResponseDTO;
import ma.inpt.cedoc.model.DTOs.Candidature.SujetResponseSimpleDTO;
import ma.inpt.cedoc.model.DTOs.Generic.PaginatedResponseDTO;
import ma.inpt.cedoc.model.entities.candidature.Sujet;

public interface SujetService {

    SujetResponseDTO proposerSujet(SujetRequestDTO dto);

    /**
     * Crée un sujet directement validé par un chef d'équipe
     * Le sujet sera automatiquement assigné au chef d'équipe et validé
     */
    SujetResponseDTO createSujetByChefEquipe(SujetRequestDTO dto, Long chefEquipeId);

    /**
     * Trouve tous les sujets proposés par l'utilisateur actuel (en tant que
     * professeur, directeur de thèse ou chef d'équipe)
     * avec pagination et recherche
     */
    PaginatedResponseDTO<SujetResponseDTO> findSujetsByCurrentUserPaginated(Pageable pageable, String search,
            String userEmail);

    /**
     * Vérifie si l'utilisateur actuel peut modifier ou supprimer un sujet
     * Retourne true si:
     * 1) Le sujet a été créé par l'utilisateur connecté, OU
     * 2) L'utilisateur a le rôle DIRECTION_CEDOC, OU
     * 3) Le sujet appartient à un membre de l'équipe et l'utilisateur est chef
     * d'équipe
     */
    boolean canModifyOrDeleteSujet(Long sujetId, String userEmail);

    /* CREATE METHODS */
    // DTO-based methods
    SujetResponseDTO saveSujet(SujetRequestDTO dto);

    List<SujetResponseDTO> saveSujets(List<SujetRequestDTO> dtos);

    // Entity-based methods
    Sujet saveSujetEntity(Sujet sujet);

    List<Sujet> saveSujetsEntities(List<Sujet> sujets);

    /* UPDATE METHODS */
    // DTO-based methods
    SujetResponseDTO updateSujet(SujetRequestDTO dto, Long id);

    // Entity-based methods
    Sujet updateSujetEntity(Sujet sujet, Long id);

    /* DELETE METHODS */
    void deleteSujet(Sujet sujet);

    void deleteSujetById(Long id);

    void deleteAllSujets();

    /* GET METHODS */
    // DTO-based methods
    SujetResponseDTO getSujetById(Long id);

    List<SujetResponseDTO> getAllSujets();

    List<SujetResponseDTO> getSujetsByChefEquipeId(Long chefEquipeId);

    List<SujetResponseDTO> getSujetsByProfesseurId(Long professeurId);

    List<SujetResponseDTO> getSujetsByDirecteurDeTheseId(Long directeurDeTheseId);

    SujetResponseDTO getSujetByDoctorantId(Long doctorantId);

    List<SujetResponseDTO> getAllPublicSujets();

    // Simple DTO methods
    SujetResponseSimpleDTO getSimple(Long id);

    List<SujetResponseSimpleDTO> getAllSimple();

    /* PAGINATION METHODS */
    // Paginated DTO-based methods
    Page<SujetResponseDTO> getAllSujetsPaginated(Pageable pageable);

    Page<SujetResponseDTO> getAllPublicSujetsPaginated(Pageable pageable);

    Page<SujetResponseSimpleDTO> getAllSimplePaginated(Pageable pageable);

    /**
     * Finds public subjects with search functionality and pagination.
     * Searches by subject title, chef full name, and team name.
     */
    PaginatedResponseDTO<ChefSujetsEquipeResponseDTO> findPublicValideSujetsWithSearchPaginated(
            Pageable pageable, String search);

    // Entity-based methods
    Sujet getSujetEntityById(Long id);

    List<Sujet> getAllSujetsEntities();

    List<Sujet> getSujetsEntitiesByChefEquipeId(Long chefEquipeId);

    List<Sujet> getSujetsEntitiesByProfesseurId(Long professeurId);

    List<Sujet> getSujetsEntitiesByDirecteurDeTheseId(Long directeurDeTheseId);

    Sujet getSujetEntityByDoctorantId(Long doctorantId);

    List<Sujet> getAllPublicSujetsEntities();

    /**
     * Gets subjects for the current authenticated user based on their roles:
     * - As professor (collaborator)
     * - As directeur de these
     * - As chef d'equipe
     */
    PaginatedResponseDTO<SujetResponseDTO> getMesSujetsPaginated(String userEmail, Pageable pageable, String search);
}
