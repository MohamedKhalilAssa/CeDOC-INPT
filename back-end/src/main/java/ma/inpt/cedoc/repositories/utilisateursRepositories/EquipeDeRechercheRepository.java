package ma.inpt.cedoc.repositories.utilisateursRepositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ma.inpt.cedoc.model.entities.utilisateurs.EquipeDeRecherche;

public interface EquipeDeRechercheRepository extends JpaRepository<EquipeDeRecherche, Long> {

    List<EquipeDeRecherche> findByChefEquipeId(Long chefEquipeId);

    List<EquipeDeRecherche> findByNomDeLequipeContainingIgnoreCase(String name);

    @Query("SELECT e FROM EquipeDeRecherche e " +
            "LEFT JOIN e.chefEquipe ce " +
            "LEFT JOIN ce.professeur cp " +
            "LEFT JOIN cp.utilisateur cu " +
            "WHERE (:search IS NULL OR :search = '' OR " +
            "LOWER(e.nomDeLequipe) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(CONCAT(cu.prenom, ' ', cu.nom)) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<EquipeDeRecherche> findEquipesWithSearch(@Param("search") String search, Pageable pageable);
}