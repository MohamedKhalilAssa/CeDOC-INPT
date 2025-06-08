package ma.inpt.cedoc.repositories.candidatureRepositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.candidature.CandidatureAccepter;

public interface CandidatureAccepterRepository extends JpaRepository<CandidatureAccepter, Long> {
}
