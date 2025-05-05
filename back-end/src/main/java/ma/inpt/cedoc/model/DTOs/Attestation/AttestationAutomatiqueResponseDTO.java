package ma.inpt.cedoc.model.DTOs.Attestation;

import java.time.ZonedDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import ma.inpt.cedoc.model.DTOs.Generic.BaseResponseDTO;
import ma.inpt.cedoc.model.enums.doctorant_enums.StatutAttestationEnum;
import ma.inpt.cedoc.model.enums.doctorant_enums.TypeAttestationAutoEnum;

@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class AttestationAutomatiqueResponseDTO extends BaseResponseDTO {

    private ZonedDateTime dateDemande;

    private StatutAttestationEnum statutAttestation;

    private TypeAttestationAutoEnum typeAttestation;

    private Long doctorantId;
}
