package ma.inpt.cedoc.repositories.DoctorantActionsRepositories;

import ma.inpt.cedoc.model.entities.Doctorant_Actions.CommunicationConference;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunicationConferenceRepo extends JpaRepository<CommunicationConference, Long> {
}
