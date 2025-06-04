package ma.inpt.cedoc.repositories.DoctorantActionsRepositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.DoctorantActions.ConfParticipation;

public interface ConfParticipationRepository extends JpaRepository<ConfParticipation, Long> {
    public List<ConfParticipation> findByParticipantId(Long id);
}
