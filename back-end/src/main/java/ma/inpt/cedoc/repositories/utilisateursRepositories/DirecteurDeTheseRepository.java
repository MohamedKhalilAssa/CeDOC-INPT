package ma.inpt.cedoc.repositories.utilisateursRepositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.utilisateurs.DirecteurDeThese;

import java.util.Optional;

public interface DirecteurDeTheseRepository extends JpaRepository<DirecteurDeThese, Long> {
    Optional<DirecteurDeThese> findByEmail(String email);
}