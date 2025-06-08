package ma.inpt.cedoc.model.DTOs.Utilisateurs;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RoleAssignmentRequestDTO {
    @Email(message = "Email invalide")
    private String email;

    @NotBlank(message = "Le rôle est requis")
    private String roleName;
}

