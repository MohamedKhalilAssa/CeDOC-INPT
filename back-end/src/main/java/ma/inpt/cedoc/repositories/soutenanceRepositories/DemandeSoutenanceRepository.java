package ma.inpt.cedoc.repositories.soutenanceRepositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.soutenance.DemandeSoutenance;

public interface DemandeSoutenanceRepository extends JpaRepository<DemandeSoutenance, Long> {
    List<DemandeSoutenance> findByDirecteurDeTheseId(Long directeurDeTheseId);
}
