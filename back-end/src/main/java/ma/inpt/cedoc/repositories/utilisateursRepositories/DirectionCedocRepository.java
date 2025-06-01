package ma.inpt.cedoc.repositories.utilisateursRepositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.utilisateurs.DirectionCedoc;

import java.util.Optional;

public interface DirectionCedocRepository extends JpaRepository<DirectionCedoc, Long> {
    Optional<DirectionCedoc> findByEmail(String email);
}
