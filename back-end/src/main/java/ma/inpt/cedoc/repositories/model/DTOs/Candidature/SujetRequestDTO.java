package ma.inpt.cedoc.repositories.model.DTOs.Candidature;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SujetRequestDTO {

    @NotBlank(message = "L'intitulé du sujet est obligatoire")
    @Size(min = 3, max = 100, message = "L'intitulé doit contenir entre 3 et 100 caractères")
    @Pattern(regexp = "^[\\p{L}0-9,.'\"()&-]+(?:\\s[\\p{L}0-9,.'\"()&-]+)*$", message = "L'intitulé contient des caractères invalides.")
    private String intitule;

    @NotBlank(message = "La description du sujet est obligatoire")
    @Size(min = 10, message = "La description doit contenir au moins 10 caractères")
    private String description;

    @NotBlank(message = "Le champ chefEquipeId est obligatoire")
    private Long chefEquipeId;

    private Long directeurDeTheseId;

    @Size(min = 1, message = "Au moins un professeur doit être sélectionné")
    private List<Long> professeursIds;
}

