package ma.inpt.cedoc.repositories.model.DTOs.Utilisateurs;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LieuDeNaissanceRequestDTO {
    @NotBlank(message = "Le pays est obligatoire")
    @Size(min = 2, max = 50, message = "Le pays doit contenir entre 2 et 50 caractères")
    @Pattern(regexp = "^[\\p{L} '-]+$", message = "Le pays ne doit contenir que des lettres, des espaces ou des tirets")
    private String pays;

    @Size(min = 2, max = 50, message = "La ville doit contenir entre 2 et 50 caractères")
    @Pattern(regexp = "^[\\p{L} '-]+$", message = "La ville ne doit contenir que des lettres, des espaces ou des tirets")
    private String ville;
}
