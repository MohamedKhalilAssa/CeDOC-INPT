package ma.inpt.cedoc.model.DTOs.Attestation;

import jakarta.validation.constraints.Email;
import lombok.Data;
import ma.inpt.cedoc.model.entities.utilisateurs.EquipeDeRecherche;
import ma.inpt.cedoc.model.entities.utilisateurs.LieuDeNaissance;
import ma.inpt.cedoc.model.entities.utilisateurs.Utilisateur;
import ma.inpt.cedoc.model.enums.doctorant_enums.TypeAttestationAutoEnum;
import ma.inpt.cedoc.model.enums.doctorant_enums.TypeAttestationValidationEnum;

import java.time.LocalDate;
import java.time.Year;

@Data
public class DoctorantRequestDTO {
    private Utilisateur utilisateur;
    private String cne;
    private String cin;
    private String firstEnrollmentDate;
    private Long researchTeamId;
    private Year currentYear;
    private String currentLevel;
    private String cycle;
    private TypeAttestationAutoEnum typeAttestationAuto;
    private TypeAttestationValidationEnum typeAttestationValidation;
}
