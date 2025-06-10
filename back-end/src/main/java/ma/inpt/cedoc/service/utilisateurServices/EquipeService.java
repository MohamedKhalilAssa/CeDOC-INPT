package ma.inpt.cedoc.service.utilisateurServices;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ma.inpt.cedoc.model.DTOs.Generic.PaginatedResponseDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.EquipeRequestDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.EquipeResponseDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.EquipeSimpleDTO;
import ma.inpt.cedoc.model.entities.utilisateurs.EquipeDeRecherche;

public interface EquipeService {

    // ───–──── CREATE METHODS ───–────
    // DTO-based methods
    EquipeResponseDTO saveEquipe(EquipeRequestDTO dto);

    List<EquipeResponseDTO> saveEquipes(List<EquipeRequestDTO> dtos);

    // Entity-based methods
    EquipeDeRecherche saveEquipeEntity(EquipeDeRecherche equipe);

    List<EquipeDeRecherche> saveEquipesEntities(List<EquipeDeRecherche> equipes);

    // ───–──── UPDATE METHODS ───–────
    // DTO-based methods
    EquipeResponseDTO updateEquipe(EquipeRequestDTO dto, Long id);

    // Entity-based methods
    EquipeDeRecherche updateEquipeEntity(EquipeDeRecherche equipe, Long id);

    // ───–──── DELETE METHODS ───–────
    void deleteEquipe(EquipeDeRecherche equipe);

    void deleteEquipeById(Long id);

    void deleteAllEquipes();

    // ───–──── GET METHODS ───–────
    // DTO-based methods
    EquipeResponseDTO getEquipeById(Long id);

    List<EquipeResponseDTO> getAllEquipes();

    List<EquipeResponseDTO> getEquipesByChefEquipeId(Long chefEquipeId);

    List<EquipeResponseDTO> searchEquipesByName(String name);

    // Simple DTO methods
    EquipeSimpleDTO getSimple(Long id);

    List<EquipeSimpleDTO> getAllSimple();

    // Entity-based methods
    EquipeDeRecherche getEquipeEntityById(Long id);

    List<EquipeDeRecherche> getAllEquipesEntities();

    List<EquipeDeRecherche> getEquipesEntitiesByChefEquipeId(Long chefEquipeId);

    // ───–──── PAGINATION METHODS ───–────
    // Paginated DTO-based methods
    Page<EquipeResponseDTO> getAllEquipesPaginated(Pageable pageable);

    PaginatedResponseDTO<EquipeResponseDTO> findEquipesWithSearchPaginated(
            Pageable pageable, String search);

    Page<EquipeSimpleDTO> getAllSimplePaginated(Pageable pageable);
}
