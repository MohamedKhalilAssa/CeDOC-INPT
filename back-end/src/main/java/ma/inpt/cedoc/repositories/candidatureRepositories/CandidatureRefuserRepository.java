package ma.inpt.cedoc.repositories.candidatureRepositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.repositories.model.entities.candidature.Candidature;
import ma.inpt.cedoc.repositories.model.entities.candidature.CandidatureRefuser;
import ma.inpt.cedoc.repositories.model.enums.candidature_enums.CandidatureEnum;

public interface CandidatureRefuserRepository extends JpaRepository<CandidatureRefuser, Long> {
    // Toutes les candidatures refusées depuis avant une date donnée
    List<Candidature> findByStatutCandidatureAndDateRefusBefore(
            CandidatureEnum statut, LocalDate beforeDate);
}
