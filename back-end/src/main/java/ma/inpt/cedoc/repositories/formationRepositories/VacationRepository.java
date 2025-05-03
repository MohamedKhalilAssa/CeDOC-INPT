package ma.inpt.cedoc.repositories.formationRepositories;

import ma.inpt.cedoc.model.entities.formation.Vacation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VacationRepository extends JpaRepository<Vacation, Long> {
}
