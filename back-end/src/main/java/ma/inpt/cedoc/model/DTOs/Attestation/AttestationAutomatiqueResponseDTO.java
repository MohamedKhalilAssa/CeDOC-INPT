package ma.inpt.cedoc.model.DTOs.Attestation;

import lombok.*;
import lombok.experimental.SuperBuilder;
import ma.inpt.cedoc.model.enums.doctorant_enums.StatutAttestationEnum;
import ma.inpt.cedoc.model.enums.doctorant_enums.TypeAttestationAutoEnum;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttestationAutomatiqueResponseDTO {
    private Long id;
    private TypeAttestationAutoEnum typeAttestationAutomatique;
    private StatutAttestationEnum statutAttestation;
    private LocalDateTime dateDemande;
    private String message;
    private boolean success;
}
