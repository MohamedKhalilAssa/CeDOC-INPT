package ma.inpt.cedoc.repositories.model.DTOs.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor

public class EmailRequest {

    @Email
    @NotBlank(message = "Email est obligatoire")
    private String email;
}
