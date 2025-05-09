package ma.inpt.cedoc.repositories.utilisateursRepositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;

import java.util.Optional;

public interface DoctorantRepository extends JpaRepository<Doctorant, Long> {
    Optional<Doctorant> findByEmail(String username);
}