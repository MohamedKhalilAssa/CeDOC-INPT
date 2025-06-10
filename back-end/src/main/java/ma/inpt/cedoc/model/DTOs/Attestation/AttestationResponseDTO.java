package ma.inpt.cedoc.model.DTOs.Attestation;

import java.time.LocalDateTime;

import lombok.*;
import lombok.experimental.SuperBuilder;
import ma.inpt.cedoc.model.DTOs.Generic.BaseResponseDTO;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import ma.inpt.cedoc.model.enums.doctorant_enums.StatutAttestationEnum;

@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AttestationResponseDTO extends BaseResponseDTO {

    private StatutAttestationEnum statutAttestation;
    private DoctorantResponseDTO doctorant;
    private LocalDateTime dateDemande;

}
