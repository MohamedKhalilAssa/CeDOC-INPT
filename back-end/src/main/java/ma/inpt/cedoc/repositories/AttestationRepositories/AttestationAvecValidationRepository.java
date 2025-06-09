package ma.inpt.cedoc.repositories.AttestationRepositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.attestation.AttestationAvecValidation;
import ma.inpt.cedoc.model.enums.doctorant_enums.TypeAttestationValidationEnum;

public interface AttestationAvecValidationRepository extends JpaRepository<AttestationAvecValidation, Long> {
    List<AttestationAvecValidation> findByTypeAttestationValidation(TypeAttestationValidationEnum typeAttestationValidation);
}
