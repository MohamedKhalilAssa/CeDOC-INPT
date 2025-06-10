package ma.inpt.cedoc.model.DTOs.Attestation;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import ma.inpt.cedoc.model.enums.doctorant_enums.StatutAttestationEnum;
import ma.inpt.cedoc.model.enums.doctorant_enums.TypeAttestationAutoEnum;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttestationAutomatiqueRequestDTO {
    @NotNull(message = "Le type d'attestation est obligatoire")
    private TypeAttestationAutoEnum typeAttestationAutomatique;
}
