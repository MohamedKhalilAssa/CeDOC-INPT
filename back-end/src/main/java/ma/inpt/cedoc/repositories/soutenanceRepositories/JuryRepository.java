package ma.inpt.cedoc.repositories.soutenanceRepositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.repositories.model.entities.soutenance.Jury;

public interface JuryRepository extends JpaRepository<Jury, Long> {
}
