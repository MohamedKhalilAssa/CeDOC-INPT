package ma.inpt.cedoc.repositories.utilisateursRepositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.utilisateurs.Candidat;

public interface CandidatRepository extends JpaRepository<Candidat, Long> {
}