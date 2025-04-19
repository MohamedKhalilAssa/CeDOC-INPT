package ma.inpt.cedoc.repositories.utilisateursRepositories;

import ma.inpt.cedoc.model.entities.utilisateurs.Candidat;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CandidatRepository extends JpaRepository<Candidat, Long> {
}