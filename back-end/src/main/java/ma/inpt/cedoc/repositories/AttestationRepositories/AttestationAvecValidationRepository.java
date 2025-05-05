package ma.inpt.cedoc.repositories.AttestationRepositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.attestation.AttestationAvecValidation;

public interface AttestationAvecValidationRepository extends JpaRepository<AttestationAvecValidation, Long> {
    List<AttestationAvecValidation> findByTitreContainingIgnoreCase(String name);
}
