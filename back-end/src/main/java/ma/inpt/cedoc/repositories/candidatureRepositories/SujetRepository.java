package ma.inpt.cedoc.repositories.candidatureRepositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.candidature.Sujet;

public interface SujetRepository extends JpaRepository<Sujet, Long> {
}
