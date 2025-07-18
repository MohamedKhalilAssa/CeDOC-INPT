package ma.inpt.cedoc.model.DTOs.Formations;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;
import lombok.Data;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import ma.inpt.cedoc.model.enums.formation_enums.ModuleEnum;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
public class FormationRequestDTO {

        @NotBlank(message = "Le nom de la formation est obligatoire")
        @Size(max = 255, message = "Le nom de la formation ne doit pas dépasser 255 caractères")
        private String formationName;

        @NotNull(message = "Le module est obligatoire")
        private ModuleEnum module;

        @NotBlank(message = "L'intitulé est obligatoire")
        @Size(max = 500, message = "L'intitulé ne doit pas dépasser 500 caractères")
        private String intitule;

        @NotBlank(message = "Le nom du formateur est obligatoire")
        @Size(max = 255, message = "Le nom du formateur ne doit pas dépasser 255 caractères")
        private String nomFormateur;


        @NotNull(message = "La date de début est obligatoire")
        @FutureOrPresent(message = "La date de début doit être aujourd'hui ou dans le futur")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        private LocalDate dateDebut;

        @NotNull(message = "La durée est obligatoire")
        @Positive(message = "La durée doit être un nombre positif")
        private Integer duree; // durée en heures par exemple

        @NotBlank(message = "Le lieu est obligatoire")
        @Size(max = 255, message = "Le lieu ne doit pas dépasser 255 caractères")
        private String lieu;

        private List<Long> doctorantsCiblesIds;

        @Size(max = 1000, message = "Les détails ne doivent pas dépasser 1000 caractères")
        private String details;

        private String image; // optional field

}
