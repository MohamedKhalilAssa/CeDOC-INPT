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

}
