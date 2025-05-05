package ma.inpt.cedoc.repositories.AttestationRepositories;

import ma.inpt.cedoc.model.entities.attestation.AttestationAutomatique;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Arrays;
import java.util.List;

public interface AttestationAutomatiqueRepository extends JpaRepository<AttestationAutomatique, Long> {
    List<AttestationAutomatique> findByTitreContainingIgnoreCase(String name);
}
