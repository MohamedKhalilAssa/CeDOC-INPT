package ma.inpt.cedoc.model.DTOs.Attestation;

import java.time.LocalDateTime;

import lombok.*;
import lombok.experimental.SuperBuilder;
import ma.inpt.cedoc.model.DTOs.Generic.BaseResponseDTO;
import ma.inpt.cedoc.model.enums.doctorant_enums.StatutAttestationEnum;

@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AttestationResponseDTO extends BaseResponseDTO {

    private String url;
    private StatutAttestationEnum statutAttestation;
    private Long doctorantId;
    private LocalDateTime dateDemande;

}
