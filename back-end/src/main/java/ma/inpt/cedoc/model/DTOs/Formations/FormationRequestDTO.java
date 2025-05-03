package ma.inpt.cedoc.model.DTOs.Formations;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.enums.formation_enums.ModuleEnum;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FormationRequestDTO {

        @NotBlank(message = "Le nom de la formation est obligatoire.")
        private String formationName;

        @NotNull(message = "Le module est obligatoire.")
        private ModuleEnum module;

        private String intitule;

        @NotBlank(message = "Le nom du formateur est obligatoire.")
        private String nomFormateur;

        @NotBlank(message = "La date de début est obligatoire.")
        private String dateDebut;  // (ideally LocalDate, but I respect your original string choice)

        private Integer duree;     // durée en heures

        private String lieu;       // peut être distanciel ou physique
}
