package ma.inpt.cedoc.repositories.formationRepositories;

import ma.inpt.cedoc.model.entities.formation.SeanceFormation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeanceFormationRepository extends JpaRepository<SeanceFormation, Long> {
}
