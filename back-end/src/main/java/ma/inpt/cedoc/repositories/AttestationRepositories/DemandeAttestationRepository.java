package ma.inpt.cedoc.repositories.AttestationRepositories;

import ma.inpt.cedoc.model.entities.attestation.DemandeAttestation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DemandeAttestationRepository extends JpaRepository<DemandeAttestation, Long> {
}
