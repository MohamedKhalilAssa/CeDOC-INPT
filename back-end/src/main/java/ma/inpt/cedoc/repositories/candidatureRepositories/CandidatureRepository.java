package ma.inpt.cedoc.repositories.candidatureRepositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.repositories.model.entities.candidature.Candidature;
import ma.inpt.cedoc.repositories.model.entities.utilisateurs.Candidat;
import ma.inpt.cedoc.repositories.model.enums.candidature_enums.CandidatureEnum;

public interface CandidatureRepository extends JpaRepository<Candidature, Long> {
    // Toutes les candidatures d’un candidat donné
    List<Candidature> findByCandidat(Candidat candidat);
    // Toutes les candidatures avec statut SOUMISE et dateCreation ≤ dateLimite
    List<Candidature> findByStatutCandidatureAndCreatedAtBefore(
        CandidatureEnum statut, LocalDate beforeDate);


}