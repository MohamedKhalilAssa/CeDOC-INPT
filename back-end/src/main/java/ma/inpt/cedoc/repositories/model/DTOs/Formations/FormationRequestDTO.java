package ma.inpt.cedoc.repositories.model.DTOs.Formations;

import java.util.Date;

import jakarta.validation.constraints.*;
import lombok.Data;
import ma.inpt.cedoc.repositories.model.enums.formation_enums.ModuleEnum;

@Data
public class FormationRequestDTO {

        @NotBlank(message = "Le nom de la formation est obligatoire")
        @Size(max = 255, message = "Le nom de la formation ne doit pas dépasser 255 caractères")
        private String formationName;

        @NotBlank(message = "Le module est obligatoire")
        @Size(max = 255, message = "Le module ne doit pas dépasser 255 caractères")
        private ModuleEnum module;

        @NotBlank(message = "L'intitulé est obligatoire")
        @Size(max = 500, message = "L'intitulé ne doit pas dépasser 500 caractères")
        private String intitule;

        @NotBlank(message = "Le nom du formateur est obligatoire")
        @Size(max = 255, message = "Le nom du formateur ne doit pas dépasser 255 caractères")
        private String nomFormateur;

        @NotNull(message = "La date de début est obligatoire")
        @FutureOrPresent(message = "La date de début doit être aujourd'hui ou dans le futur")
        private Date dateDebut;

        @NotNull(message = "La durée est obligatoire")
        @Positive(message = "La durée doit être un nombre positif")
        private Integer duree; // durée en heures par exemple

        @NotBlank(message = "Le lieu est obligatoire")
        @Size(max = 255, message = "Le lieu ne doit pas dépasser 255 caractères")
        private String lieu;
}
