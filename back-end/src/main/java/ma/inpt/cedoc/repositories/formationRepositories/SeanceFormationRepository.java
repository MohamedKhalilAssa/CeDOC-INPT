package ma.inpt.cedoc.repositories.formationRepositories;

import io.lettuce.core.dynamic.annotation.Param;
import ma.inpt.cedoc.model.entities.formation.Formation;
import ma.inpt.cedoc.model.entities.formation.SeanceFormation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SeanceFormationRepository extends JpaRepository<SeanceFormation, Long> {
    @Query("""
      SELECT SUM(s.duree) FROM SeanceFormation s
      WHERE s.formation.id = :formationId
      AND s.declarant.utilisateur.id = :declarantId
      AND s.statut = ma.inpt.cedoc.model.enums.formation_enums.StatutFormationEnum.VALIDER
    """)
    Optional<Long> findSumDureeForValidatedByFormationIdAndDoctorantUtilisateurId(
            @Param("formationId") Long formationId,
            @Param("declarantId") Long declarantId
    );


    @Query("SELECT SUM(s.duree) FROM SeanceFormation s WHERE s.declarant.id = :declarantId")
    Optional<Long> findSumDureeByDeclarantId(@Param("declarantId") Long declarantId);

    @Query("SELECT DISTINCT s.formation FROM SeanceFormation s WHERE s.declarant.utilisateur.id = :doctorantUtilisateurId AND s.statut = ma.inpt.cedoc.model.enums.formation_enums.StatutFormationEnum.VALIDER")
    List<Formation> findDistinctValidatedFormationsByDoctorantUtilisateurId(@Param("doctorantUtilisateurId") Long doctorantUtilisateurId);

    @Query("SELECT SUM(s.duree) FROM SeanceFormation s WHERE s.declarant.utilisateur.id = :doctorantUtilisateurId AND s.statut = ma.inpt.cedoc.model.enums.formation_enums.StatutFormationEnum.VALIDER")
    Optional<Long> findSumDureeByDeclarantUtilisateurIdWhereFormationValidee(@Param("doctorantUtilisateurId") Long doctorantUtilisateurId);



    @Query("SELECT s FROM SeanceFormation s WHERE s.declarant.utilisateur.id = :utilisateurId")
    List<SeanceFormation> findByDeclarantUtilisateurId(@Param("utilisateurId") Long utilisateurId);

}
