package ma.inpt.cedoc.repositories.model.DTOs.Utilisateurs;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NationaliteRequestDTO {
    @NotBlank(message = "L'intitule de la nationalite est obligatoire")
    @Size(min = 2, max = 50, message = "L'intitule doit contenir entre 2 et 50 caractères")
    @Pattern(regexp = "^[\\p{L} '-]+$", message = "L'Intitule ne doit contenir que des lettres, des espaces ou des tirets")
    private String intitule;
}
