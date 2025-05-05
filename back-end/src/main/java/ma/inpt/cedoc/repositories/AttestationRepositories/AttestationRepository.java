package ma.inpt.cedoc.repositories.AttestationRepositories;

import ma.inpt.cedoc.model.entities.attestation.Attestation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface AttestationRepository extends JpaRepository<Attestation, Long> {
    List<Attestation> findByTitreContainingIgnoreCase(String name);
}
