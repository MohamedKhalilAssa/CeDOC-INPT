package ma.inpt.cedoc.repositories.attestationRepositories;

import ma.inpt.cedoc.model.entities.attestation.Attestation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttestationRepository extends JpaRepository<Attestation, Long> {
}
