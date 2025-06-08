package ma.inpt.cedoc.repositories.model.DTOs.Formations;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import ma.inpt.cedoc.repositories.model.enums.formation_enums.StatutFormationEnum;

@Data
public class SeanceFormationRequestDTO {

    @NotNull(message = "La durée est obligatoire")
    private Integer duree;

    @NotBlank(message = "Le justificatif PDF est obligatoire")
    @Pattern(regexp = "^.+\\.pdf$", message = "Le justificatif doit être un fichier PDF")
    private String justificatifPdf;

    @NotNull(message = "Le statut est obligatoire")
    private StatutFormationEnum statut;

    @NotNull(message = "L'identifiant de la formation est obligatoire")
    private Long formationId;

    @NotNull(message = "L'identifiant du doctorant déclarant est obligatoire")
    private Long declarantId;

    @NotNull(message = "L'identifiant du responsable valideur est obligatoire")
    private Long valideParId;
}

