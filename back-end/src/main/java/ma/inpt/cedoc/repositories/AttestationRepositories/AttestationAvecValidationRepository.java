package ma.inpt.cedoc.repositories.AttestationRepositories;

import ma.inpt.cedoc.model.entities.attestation.AttestationAvecValidation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Arrays;
import java.util.List;

public interface AttestationAvecValidationRepository extends JpaRepository<AttestationAvecValidation, Long> {
    List<AttestationAvecValidation> findByTitreContainingIgnoreCase(String name);
}
