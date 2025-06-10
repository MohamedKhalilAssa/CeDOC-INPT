package ma.inpt.cedoc.repositories.candidatureRepositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ma.inpt.cedoc.model.entities.candidature.Candidature;
import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.utilisateurs.Candidat;
import ma.inpt.cedoc.model.enums.candidature_enums.CandidatureEnum;

public interface CandidatureRepository extends JpaRepository<Candidature, Long> {
    // Toutes les candidatures d'un candidat donné
    List<Candidature> findByCandidat(Candidat candidat);
    // Toutes les candidatures avec statut SOUMISE et dateCreation ≤ dateLimite
    List<Candidature> findByStatutCandidatureAndCreatedAtBefore(
        CandidatureEnum statut, LocalDate beforeDate);
    // Toutes les candidatures contenant un sujet donné
    List<Candidature> findBySujetsContaining(Sujet sujet);

    /**
     * Find candidatures with minimal entity loading to avoid StackOverflow.
     * Only loads basic candidature fields, candidat with user info, and sujet IDs.
     */
    @Query("SELECT DISTINCT c FROM Candidature c " +
           "LEFT JOIN FETCH c.candidat candidat " +
           "LEFT JOIN FETCH candidat.utilisateur utilisateur " +
           "LEFT JOIN c.sujets sujets " +
           "WHERE c.id IN :candidatureIds")
    List<Candidature> findByIdInWithMinimalLoading(@Param("candidatureIds") List<Long> candidatureIds);

    /**
     * Find all candidatures with minimal entity loading.
     */
    @Query("SELECT DISTINCT c FROM Candidature c " +
           "LEFT JOIN FETCH c.candidat candidat " +
           "LEFT JOIN FETCH candidat.utilisateur utilisateur " +
           "LEFT JOIN c.sujets sujets")
    List<Candidature> findAllWithMinimalLoading();

}