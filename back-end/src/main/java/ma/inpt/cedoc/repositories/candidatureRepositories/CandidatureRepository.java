package ma.inpt.cedoc.repositories.candidatureRepositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.candidature.Candidature;

public interface CandidatureRepository extends JpaRepository<Candidature, Long> {
}