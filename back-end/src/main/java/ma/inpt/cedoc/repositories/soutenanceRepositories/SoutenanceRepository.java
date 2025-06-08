package ma.inpt.cedoc.repositories.soutenanceRepositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.repositories.model.entities.soutenance.Soutenance;

public interface SoutenanceRepository extends JpaRepository<Soutenance, Long> {
}
