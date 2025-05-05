package ma.inpt.cedoc.repositories.AttestationRepositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.attestation.AttestationAutomatique;

public interface AttestationAutomatiqueRepository extends JpaRepository<AttestationAutomatique, Long> {
    List<AttestationAutomatique> findByTitreContainingIgnoreCase(String titre);
}
