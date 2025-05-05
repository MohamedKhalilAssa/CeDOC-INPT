package ma.inpt.cedoc.model.DTOs.Attestation;

import java.time.LocalDateTime;

import lombok.Data;
import ma.inpt.cedoc.model.enums.doctorant_enums.StatutAttestationEnum;

@Data

public class AttestationResponseDTO {

    private Long id;

    private String url;

    private StatutAttestationEnum statutAttestation;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
