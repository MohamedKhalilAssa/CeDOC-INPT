package ma.inpt.cedoc.model.DTOs.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.Annotations.FieldMatcher.FieldMatch;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldMatch(first = "newPassword", second = "newPasswordConfirmation", message = "Les mots de passe ne se correspondent pas")
public class ResetPasswordRequest {

    private String token;
    @NotBlank(message = "Le mot de passe est obligatoire.")
    @Size(min = 8, message = "Le mot de passe doit comporter au moins 8 caractères.")
    @Pattern(regexp = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", message = "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.")
    private String newPassword;
    @NotBlank(message = "La confirmation du mot de passe est obligatoire.")
    private String newPasswordConfirmation;
}
