package ma.inpt.cedoc.repositories.utilisateursRepositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.utilisateurs.DirecteurDeThese;

public interface DirecteurDeTheseRepository extends JpaRepository<DirecteurDeThese, Long> {
}