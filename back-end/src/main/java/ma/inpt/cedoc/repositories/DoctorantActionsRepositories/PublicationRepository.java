package ma.inpt.cedoc.repositories.DoctorantActionsRepositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ma.inpt.cedoc.model.entities.DoctorantActions.Publication;

import java.util.List;

@Repository
public interface PublicationRepository extends JpaRepository<Publication, Long> {
    public List<Publication> findByAuteurId(Long id);
}
