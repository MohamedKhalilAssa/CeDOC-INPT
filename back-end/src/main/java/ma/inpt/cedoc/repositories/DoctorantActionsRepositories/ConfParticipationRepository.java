package ma.inpt.cedoc.repositories.DoctorantActionsRepositories;

import ma.inpt.cedoc.model.DTOs.DoctorantActions.ConfParticipationResponseDTO;
import ma.inpt.cedoc.model.entities.DoctorantActions.ConfParticipation;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConfParticipationRepository extends JpaRepository<ConfParticipation, Long> {
    public List<ConfParticipation> findByParticipantId(Long id);
}
