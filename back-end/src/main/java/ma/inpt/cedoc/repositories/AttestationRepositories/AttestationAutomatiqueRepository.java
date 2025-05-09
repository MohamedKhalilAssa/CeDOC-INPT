package ma.inpt.cedoc.repositories.AttestationRepositories;

import java.util.List;

import ma.inpt.cedoc.model.enums.doctorant_enums.TypeAttestationAutoEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.attestation.AttestationAutomatique;

public interface AttestationAutomatiqueRepository extends JpaRepository<AttestationAutomatique, Long> {
    List<AttestationAutomatique> findByTypeAttestationAutomatique(TypeAttestationAutoEnum typeAttestationAutomatique);
}
