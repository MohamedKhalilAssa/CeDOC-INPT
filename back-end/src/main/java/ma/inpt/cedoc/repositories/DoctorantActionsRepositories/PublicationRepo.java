package ma.inpt.cedoc.repositories.DoctorantActionsRepositories;

import ma.inpt.cedoc.model.entities.Doctorant_Actions.Publication;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PublicationRepo extends JpaRepository<Publication, Long> {
}
