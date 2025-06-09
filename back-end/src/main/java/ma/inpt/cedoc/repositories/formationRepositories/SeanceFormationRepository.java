package ma.inpt.cedoc.repositories.formationRepositories;

import io.lettuce.core.dynamic.annotation.Param;
import ma.inpt.cedoc.model.entities.formation.SeanceFormation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface SeanceFormationRepository extends JpaRepository<SeanceFormation, Long> {
    @Query("SELECT SUM(s.duree) FROM SeanceFormation s WHERE s.formation.id = :formationId AND s.declarant.id = :declarantId")
    Optional<Long> findSumDureeByFormationIdAndDeclarantId(@Param("formationId") Long formationId, @Param("declarantId") Long declarantId);

    @Query("SELECT SUM(s.duree) FROM SeanceFormation s WHERE s.declarant.id = :declarantId")
    Optional<Long> findSumDureeByDeclarantId(@Param("declarantId") Long declarantId);

}
