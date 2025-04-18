package ma.inpt.cedoc.model.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.enums.utilisateur_enums.EtatCivilEnum;

import java.time.LocalDate;

@Entity
@NoArgsConstructor
@Data
@AllArgsConstructor
@Table(name="Utilisateur")
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le nom est obligatoire")
    @Size(min = 2, max = 50, message = "Le nom doit contenir entre 2 et 50 caractères")
    @Pattern(regexp = "^[A-Za-z]+$", message = "Le nom ne doit contenir que des lettres")
    private String nom;

    @NotBlank(message = "Le prénom est obligatoire")
    @Size(min = 2, max = 50, message = "Le prénom doit contenir entre 2 et 50 caractères")
    @Pattern(regexp = "^[A-Za-z]+$", message = "Le prénom ne doit contenir que des lettres")
    private String prenom;

    @Column(unique = true)
    @Email(message = "L'email doit être valide")
    @NotBlank(message = "L'email est obligatoire")
    private String email;

    @Column(unique = true)
    @NotBlank(message = "Le numéro de téléphone est obligatoire")
    @Size(min = 10, max = 15, message = "Le numéro de téléphone doit comporter entre 10 et 15 chiffres")
    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Le numéro de téléphone doit être valide (format international optionnel, exemple : +212600000000)")
    private String telephone;

    @NotBlank(message = "Le mot de passe est obligatoire")
    @Size(min = 8, message = "Le mot de passe doit comporter au moins 8 caractères")
    @Pattern(regexp = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
            message = "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.")
    private String password;

    @Column(name = "date_naissance")
    @Past(message = "La date de naissance doit être dans le passé")
    @NotBlank(message = "La date de naissance est obligatoire")
    private LocalDate dateNaissance;

    @Column(name= "etat_civil")
    @Enumerated(EnumType.STRING)
    private EtatCivilEnum etatCivilEnum;
}
