package ma.inpt.cedoc.model.DTOs.Formations;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;
import lombok.Data;
import ma.inpt.cedoc.model.enums.formation_enums.StatutFormationEnum;
import ma.inpt.cedoc.model.enums.formation_enums.StatutVacationEnum;

import java.time.LocalDate;
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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate date;

    @NotBlank(message = "Le niveau est obligatoire")
    @Size(max = 255, message = "Le niveau ne doit pas dépasser 255 caractères")
    private String niveau;

    @Positive(message = "La durée doit être un nombre positif")
    private Integer duree; // durée en heures (optionnelle)

    @Size(max = 500, message = "Le justificatif ne doit pas dépasser 500 caractères")
    private String justificatif; // lien ou nom de fichier

    @NotNull(message = "Le statut est obligatoire")
    private StatutVacationEnum statut;

    @NotNull(message = "L'identifiant du doctorant est obligatoire")
    private Long doctorantId;
}
