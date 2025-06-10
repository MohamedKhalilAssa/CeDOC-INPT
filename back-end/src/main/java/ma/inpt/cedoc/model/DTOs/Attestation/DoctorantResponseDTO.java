package ma.inpt.cedoc.model.DTOs.Attestation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.entities.utilisateurs.Utilisateur;
import ma.inpt.cedoc.model.enums.doctorant_enums.TypeAttestationAutoEnum;
import ma.inpt.cedoc.model.enums.doctorant_enums.TypeAttestationValidationEnum;

import java.time.LocalDate;
import java.time.Year;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DoctorantResponseDTO {
    private Utilisateur utilisateur;
    private String cne;
    private String cin;
    private LocalDate firstEnrollmentDate;
    private Long researchTeamId;
    private Year currentYear;
    private String currentLevel;
    private String cycle;
    private TypeAttestationAutoEnum typeAttestationAuto;
    private TypeAttestationValidationEnum typeAttestationValidation;
}
