package ma.inpt.cedoc.model.DTOs.Candidature;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import ma.inpt.cedoc.model.enums.candidature_enums.CandidatureEnum;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChangeStatutCandidatureRequestDTO {

    @NotNull(message = "Le nouveau statut est obligatoire")
    private CandidatureEnum nouveauStatut;

    private String motif; // Optional, can be used for REFUSER status or general notes

    private String dateEntretien; // Optional, for ACCEPTER status (ISO format: yyyy-MM-dd)
}
