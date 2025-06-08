package ma.inpt.cedoc.repositories.AttestationRepositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.repositories.model.entities.attestation.AttestationAutomatique;
import ma.inpt.cedoc.repositories.model.enums.doctorant_enums.TypeAttestationAutoEnum;

public interface AttestationAutomatiqueRepository extends JpaRepository<AttestationAutomatique, Long> {
    List<AttestationAutomatique> findByTypeAttestationAutomatique(TypeAttestationAutoEnum typeAttestationAutomatique);
}
