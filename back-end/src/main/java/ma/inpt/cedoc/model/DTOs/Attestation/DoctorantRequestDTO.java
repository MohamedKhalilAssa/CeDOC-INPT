package ma.inpt.cedoc.model.DTOs.Attestation;

import jakarta.validation.constraints.Email;
import lombok.Data;
import ma.inpt.cedoc.model.entities.utilisateurs.EquipeDeRecherche;
import ma.inpt.cedoc.model.entities.utilisateurs.LieuDeNaissance;
import ma.inpt.cedoc.model.enums.doctorant_enums.TypeAttestationAutoEnum;
import ma.inpt.cedoc.model.enums.doctorant_enums.TypeAttestationValidationEnum;

import java.time.LocalDate;
import java.time.Year;

@Data
public class DoctorantRequestDTO {
    private String nom;
    private String prenom;
    @Email
    private String email;
    private String cne;
    private String cin;
    private LocalDate birthDate;
    private LieuDeNaissance birthPlace;
    private String firstEnrollmentDate;
    private EquipeDeRecherche researchTeam;
    private Year currentYear;
    private String currentLevel;
    private String cycle;
    private TypeAttestationAutoEnum typeAttestationAuto;
    private TypeAttestationValidationEnum typeAttestationValidation;
}
