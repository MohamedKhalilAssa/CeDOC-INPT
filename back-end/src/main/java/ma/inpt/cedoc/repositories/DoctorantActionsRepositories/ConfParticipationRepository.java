package ma.inpt.cedoc.repositories.DoctorantActionsRepositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.DoctorantActions.ConfParticipation;

public interface ConfParticipationRepository extends JpaRepository<ConfParticipation, Long> {
    public Page<ConfParticipation> findByParticipantId(Long id, Pageable pageable);
}