package ma.inpt.cedoc.repositories.formationRepositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import io.lettuce.core.dynamic.annotation.Param;
import ma.inpt.cedoc.model.entities.formation.Formation;

public interface FormationRepository extends JpaRepository<Formation, Long> {
    List<Formation> findAllByFormationNameContaining(String formationName);

    // Custom query for Doctorant formations
    @Query("SELECT f FROM Formation f JOIN f.doctorantsCibles d WHERE d.id = :doctorantId")
    List<Formation> findFormationsByDoctorantId(@Param("doctorantId") Long doctorantId);
}
