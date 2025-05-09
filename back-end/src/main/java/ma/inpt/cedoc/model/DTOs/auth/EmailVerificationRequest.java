package ma.inpt.cedoc.model.DTOs.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmailVerificationRequest {

    @NotBlank(message = "Email est obligatoire")
    @Email
    private String email;

    @NotBlank(message = "Token est obligatoire")
    private String token;

}
