package ma.inpt.cedoc.repositories.formationRepositories;

import io.lettuce.core.dynamic.annotation.Param;
import ma.inpt.cedoc.model.entities.formation.Formation;
import ma.inpt.cedoc.model.entities.formation.SeanceFormation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SeanceFormationRepository extends JpaRepository<SeanceFormation, Long> {
    @Query("SELECT SUM(s.duree) FROM SeanceFormation s WHERE s.formation.id = :formationId AND s.declarant.id = :declarantId")
    Optional<Long> findSumDureeByFormationIdAndDeclarantId(@Param("formationId") Long formationId, @Param("declarantId") Long declarantId);

    @Query("SELECT SUM(s.duree) FROM SeanceFormation s WHERE s.declarant.id = :declarantId")
    Optional<Long> findSumDureeByDeclarantId(@Param("declarantId") Long declarantId);

    @Query("SELECT DISTINCT s.formation FROM SeanceFormation s WHERE s.declarant.id = :doctorantId AND s.statut = ma.inpt.cedoc.model.enums.formation_enums.StatutFormationEnum.VALIDER")
    List<Formation> findDistinctValidatedFormationsByDoctorantId(@Param("doctorantId") Long doctorantId);

    @Query("SELECT SUM(s.duree) FROM SeanceFormation s WHERE s.declarant.id = :doctorantId AND s.statut = ma.inpt.cedoc.model.enums.formation_enums.StatutFormationEnum.VALIDER")
    Optional<Long> findSumDureeByDeclarantIdWhereFormationValidee(@Param("doctorantId") Long doctorantId);


}
