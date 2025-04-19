package ma.inpt.cedoc.repositories.utilisateursRepositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;

public interface DoctorantRepository extends JpaRepository<Doctorant, Long> {
}