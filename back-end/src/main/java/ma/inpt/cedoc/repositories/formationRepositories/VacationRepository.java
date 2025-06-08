package ma.inpt.cedoc.repositories.formationRepositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.formation.Vacation;

public interface VacationRepository extends JpaRepository<Vacation, Long> {
}
