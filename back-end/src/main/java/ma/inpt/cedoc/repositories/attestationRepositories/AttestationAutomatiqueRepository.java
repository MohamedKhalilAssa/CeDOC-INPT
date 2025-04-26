package ma.inpt.cedoc.repositories.attestationRepositories;

import ma.inpt.cedoc.model.entities.attestation.AttestationAutomatique;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttestationAutomatiqueRepository extends JpaRepository<AttestationAutomatique, Long> {
}
