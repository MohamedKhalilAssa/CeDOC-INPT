package ma.inpt.cedoc.repositories.utilisateursRepositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.utilisateurs.DirectionCedoc;

public interface DirectionCedocRepository extends JpaRepository<DirectionCedoc, Long> {
    Optional<DirectionCedoc> findByUtilisateurEmail(String email);
}
