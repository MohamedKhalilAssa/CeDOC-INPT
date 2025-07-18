package ma.inpt.cedoc.repositories.candidatureRepositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.utilisateurs.ChefEquipeRole;

public interface SujetRepository extends JpaRepository<Sujet, Long> {
    List<Sujet> findByChefEquipe(ChefEquipeRole chefEquipe);

    List<Sujet> findByChefEquipeId(Long chefEquipeId);

    List<Sujet> findByProfesseursId(Long professeurId);

    List<Sujet> findByDirecteurDeTheseId(Long directeurDeTheseRoleId);

    Sujet findByDoctorantsId(Long id);

    List<Sujet> findByEstPublic(boolean estPublic);

    Page<Sujet> findByEstPublic(boolean estPublic, Pageable pageable);

    @Query("SELECT DISTINCT s FROM Sujet s LEFT JOIN s.professeurs p WHERE p.id IN :professeurIds")
    Page<Sujet> findByProfesseursIdIn(@Param("professeurIds") List<Long> professeurIds, Pageable pageable);

    @Query("SELECT DISTINCT s FROM Sujet s LEFT JOIN s.professeurs p WHERE p.id IN :professeurIds OR s.directeurDeThese.id IN :professeurIds")
    Page<Sujet> findByProfesseursOrDirecteurDeTheseIdIn(@Param("professeurIds") List<Long> professeurIds,
            Pageable pageable);

    @Query("SELECT DISTINCT s FROM Sujet s " +
            "LEFT JOIN s.professeurs p " +
            "LEFT JOIN s.directeurDeThese dt " +
            "LEFT JOIN dt.professeur dtp " +
            "LEFT JOIN dtp.utilisateur dtu " +
            "WHERE (p.id IN :professeurIds OR s.directeurDeThese.id IN :professeurIds) " +
            "AND (:search IS NULL OR :search = '' OR " +
            "LOWER(s.intitule) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(s.description) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(dtu.nom) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(dtu.prenom) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Sujet> findByProfesseursOrDirecteurDeTheseIdInWithSearch(@Param("professeurIds") List<Long> professeurIds,
            @Param("search") String search, Pageable pageable);

    @Query("SELECT s FROM Sujet s " +
            "LEFT JOIN s.chefEquipe ce " +
            "LEFT JOIN ce.professeur cp " +
            "LEFT JOIN cp.utilisateur cu " +
            "LEFT JOIN ce.equipeDeRecherche er " +
            "WHERE s.estPublic = true AND s.valide = true " +
            "AND (:search IS NULL OR :search = '' OR " +
            "LOWER(s.intitule) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(CONCAT(cu.prenom, ' ', cu.nom)) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(er.nomDeLequipe) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Sujet> findPublicValideSujetsWithSearch(@Param("search") String search, Pageable pageable);

    @Query("SELECT DISTINCT s FROM Sujet s " +
            "WHERE s.id IN :sujetIds " +
            "AND (:search IS NULL OR :search = '' OR " +
            "LOWER(s.intitule) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(s.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Sujet> findByIdInWithSearch(@Param("sujetIds") List<Long> sujetIds, @Param("search") String search,
            Pageable pageable);
}
