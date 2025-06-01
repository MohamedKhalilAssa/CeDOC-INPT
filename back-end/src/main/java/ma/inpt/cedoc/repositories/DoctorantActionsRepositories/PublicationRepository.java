package ma.inpt.cedoc.repositories.DoctorantActionsRepositories;

import ma.inpt.cedoc.model.entities.DoctorantActions.Publication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PublicationRepository extends JpaRepository<Publication, Long> {
    public List<Publication> findByAuteurId(Long id);
}
