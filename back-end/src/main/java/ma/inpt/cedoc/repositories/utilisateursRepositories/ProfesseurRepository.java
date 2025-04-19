package ma.inpt.cedoc.repositories.utilisateursRepositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.utilisateurs.Professeur;

public interface ProfesseurRepository extends JpaRepository<Professeur, Long> {
}