package ma.inpt.cedoc.repositories.DoctorantActionsRepositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VacationRepo extends JpaRepository<Vacation, Long> {

}
