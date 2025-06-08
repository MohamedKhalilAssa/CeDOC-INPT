package ma.inpt.cedoc.repositories.model.DTOs.Utilisateurs;

import java.time.LocalDate;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import ma.inpt.cedoc.repositories.model.enums.candidature_enums.StatutProfessionnelEnum;
import ma.inpt.cedoc.repositories.model.enums.utilisateur_enums.EtatCivilEnum;
import ma.inpt.cedoc.repositories.model.enums.utilisateur_enums.GenreEnum;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class UtilisateurRequestDTO {

    @NotBlank(message = "Le nom est obligatoire")
    @Size(min = 2, max = 50, message = "Le nom doit contenir entre 2 et 50 caractères")
    @Pattern(regexp = "^[\\p{L} '-]+$", message = "Le nom ne doit contenir que des lettres, des espaces ou des tirets")
    private String nom;

    @NotBlank(message = "Le prénom est obligatoire")
    @Size(min = 2, max = 50, message = "Le prénom doit contenir entre 2 et 50 caractères")
    @Pattern(regexp = "^[\\p{L} '-]+$", message = "Le prénom ne doit contenir que des lettres, des espaces ou des tirets")
    private String prenom;

    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "L'email doit être valide")
    private String email;

    @NotBlank(message = "Le numéro de téléphone est obligatoire.")
    @Size(min = 10, max = 15, message = "Le numéro de téléphone doit comporter entre 10 et 15 chiffres.")
    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Le numéro de téléphone doit être valide (format international optionnel, exemple : +212600000000)")
    private String telephone;

    @Past(message = "La date de naissance doit être dans le passé.")
    @NotNull(message = "La date de naissance est obligatoire.")
    private LocalDate dateNaissance;

    @NotNull(message = "L'etat civil est obligatoire.")
    private EtatCivilEnum etatCivilEnum;

    @NotNull(message = "Le statut professionnel est obligatoire.")
    private StatutProfessionnelEnum statutProfessionnel;

    @NotNull(message = "Veuillez préciser votre genre.")
    private GenreEnum genre;

    @NotNull(message = "Veuillez preciser votre nationalité.")
    private long nationaliteId;

    @NotNull(message = "Veuillez preciser votre lieu de naissance.")
    private long lieuDeNaissanceId;

}
