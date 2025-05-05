package ma.inpt.cedoc.model.DTOs.Attestation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.enums.doctorant_enums.EtatAttestationEnum;
import ma.inpt.cedoc.model.enums.doctorant_enums.StatutAttestationEnum;
import ma.inpt.cedoc.model.enums.doctorant_enums.TypeAttestationValidationEnum;
import java.time.ZonedDateTime;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AttestationAvecValidationResponseDTO {

    private Long id;

    private ZonedDateTime dateDemande;

    private StatutAttestationEnum statutAttestation;

    private TypeAttestationValidationEnum typeAttestation;

    private EtatAttestationEnum etatAttestation;

    private ZonedDateTime createdAt;

    private ZonedDateTime updatedAt;

    private Long doctorantId;
}
