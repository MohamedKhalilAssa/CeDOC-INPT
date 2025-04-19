package ma.inpt.cedoc.repositories.candidatureRepositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.candidature.CandidatureRefuser;

public interface CandidatureRefuserRepository extends JpaRepository<CandidatureRefuser, Long> {
}
