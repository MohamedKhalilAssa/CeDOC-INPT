package ma.inpt.cedoc.repositories.model.DTOs.Formations;

import jakarta.validation.constraints.*;
import lombok.Data;
import ma.inpt.cedoc.repositories.model.enums.formation_enums.StatutFormationEnum;

import java.util.Date;

@Data
public class VacationRequestDTO {

    @NotBlank(message = "Le titre du cours est obligatoire")
    @Size(max = 255, message = "Le titre du cours ne doit pas dépasser 255 caractères")
    private String titreDuCours;

    @NotBlank(message = "Le nom de l'établissement est obligatoire")
    @Size(max = 255, message = "Le nom de l'établissement ne doit pas dépasser 255 caractères")
    private String etablissement;

    @NotNull(message = "La date est obligatoire")
    @FutureOrPresent(message = "La date doit être aujourd'hui ou dans le futur")
    private Date date;

    @NotBlank(message = "Le niveau est obligatoire")
    @Size(max = 255, message = "Le niveau ne doit pas dépasser 255 caractères")
    private String niveau;

    @Positive(message = "La durée doit être un nombre positif")
    private Integer duree; // durée en heures (optionnelle)

    @Size(max = 500, message = "Le justificatif ne doit pas dépasser 500 caractères")
    private String justificatif; // lien ou nom de fichier

    @NotNull(message = "Le statut est obligatoire")
    private StatutFormationEnum statut;

    @NotNull(message = "L'identifiant du doctorant est obligatoire")
    private Long doctorantId;
}
