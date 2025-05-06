package ma.inpt.cedoc.repositories.DoctorantActionsRepositories;

import ma.inpt.cedoc.model.entities.DoctorantActions.Publication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PublicationRepository extends JpaRepository<Publication, Long> {
}
