package ma.inpt.cedoc.repositories.attestationRepositories;

import ma.inpt.cedoc.model.entities.attestation.AttestationAvecValidation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttestationAvecValidationRepository extends JpaRepository<AttestationAvecValidation, Long> {
}
