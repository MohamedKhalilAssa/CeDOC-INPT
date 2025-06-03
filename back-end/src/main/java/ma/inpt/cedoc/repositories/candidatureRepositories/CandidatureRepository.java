package ma.inpt.cedoc.repositories.candidatureRepositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.candidature.Candidature;
import ma.inpt.cedoc.model.entities.utilisateurs.Candidat;
import ma.inpt.cedoc.model.enums.candidature_enums.CandidatureEnum;

public interface CandidatureRepository extends JpaRepository<Candidature, Long> {
    // Toutes les candidatures d’un candidat donné
    List<Candidature> findByCandidat(Candidat candidat);
    // Toutes les candidatures avec statut SOUMISE et dateCreation ≤ dateLimite
    List<Candidature> findByStatutCandidatureAndCreatedAtBefore(
        CandidatureEnum statut, LocalDate beforeDate);

    // Toutes les candidatures refusées depuis avant une date donnée
    List<Candidature> findByStatutCandidatureAndDateRefusBefore(
        CandidatureEnum statut, LocalDate beforeDate);
}