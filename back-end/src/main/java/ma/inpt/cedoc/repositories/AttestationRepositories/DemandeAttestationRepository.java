package ma.inpt.cedoc.repositories.AttestationRepositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.repositories.model.entities.attestation.DemandeAttestation;

public interface DemandeAttestationRepository extends JpaRepository<DemandeAttestation, Long> {
}
