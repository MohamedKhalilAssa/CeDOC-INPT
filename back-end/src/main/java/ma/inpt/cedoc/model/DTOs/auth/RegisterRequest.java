package ma.inpt.cedoc.model.DTOs.auth;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.enums.utilisateur_enums.EtatCivilEnum;
import ma.inpt.cedoc.model.enums.utilisateur_enums.GenreEnum;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String prenom;
    private String nom;
    private String email;
    private String telephone;
    private String password;
    private EtatCivilEnum etatCivilEnum;
    private GenreEnum genre;
    private LocalDate dateNaissance;
}
