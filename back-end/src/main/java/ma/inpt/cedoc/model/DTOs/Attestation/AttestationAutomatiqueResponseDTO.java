package ma.inpt.cedoc.model.DTOs.Attestation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.enums.doctorant_enums.StatutAttestationEnum;
import ma.inpt.cedoc.model.enums.doctorant_enums.TypeAttestationAutoEnum;
import java.time.ZonedDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AttestationAutomatiqueResponseDTO {

    private Long id;

    private ZonedDateTime dateDemande;

    private StatutAttestationEnum statutAttestation;

    private TypeAttestationAutoEnum typeAttestation;

    private ZonedDateTime createdAt;

    private ZonedDateTime updatedAt;

    private Long doctorantId;
}
