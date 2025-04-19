package ma.inpt.cedoc.repositories.utilisateursRepositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.utilisateurs.Nationalite;

public interface NationaliteRepository extends JpaRepository<Nationalite, Long> {
}