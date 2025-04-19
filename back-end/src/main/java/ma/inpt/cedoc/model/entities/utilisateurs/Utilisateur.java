package ma.inpt.cedoc.model.entities.utilisateurs;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.enums.utilisateur_enums.EtatCivilEnum;
import ma.inpt.cedoc.model.enums.utilisateur_enums.GenreEnum;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Entity
@NoArgsConstructor
@Data
@AllArgsConstructor
@Table(name="utilisateurs")
@Inheritance(strategy = InheritanceType.JOINED)
@EntityListeners(AuditingEntityListener.class)
public class Utilisateur implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le nom est obligatoire")
    @Size(min = 2, max = 50, message = "Le nom doit contenir entre 2 et 50 caractères")
    @Pattern(regexp = "^[\\p{L} '-]+$", message = "Le nom ne doit contenir que des lettres, des espaces ou des tirets")
    private String nom;

    @NotBlank(message = "Le prénom est obligatoire")
    @Size(min = 2, max = 50, message = "Le prénom doit contenir entre 2 et 50 caractères")
    @Pattern(regexp = "^[\\p{L} '-]+$", message = "Le prénom ne doit contenir que des lettres, des espaces ou des tirets")
    private String prenom;

    @Column(unique = true)
    @Email(message = "L'email doit être valide")
    @NotBlank(message = "L'email est obligatoire")
    private String email;

    @Column(unique = true)
    @NotBlank(message = "Le numéro de téléphone est obligatoire.")
    @Size(min = 10, max = 15, message = "Le numéro de téléphone doit comporter entre 10 et 15 chiffres.")
    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Le numéro de téléphone doit être valide (format international optionnel, exemple : +212600000000)")
    private String telephone;

    @NotBlank(message = "Le mot de passe est obligatoire.")
    @Size(min = 8, message = "Le mot de passe doit comporter au moins 8 caractères.")
    @Pattern(regexp = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
            message = "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.")
    private String password;

    @Column(name = "date_naissance")
    @Past(message = "La date de naissance doit être dans le passé.")
    @NotNull(message = "La date de naissance est obligatoire.")
    private LocalDate  dateNaissance;

//    To Review if is required or not
    @Column(name= "etat_civil")
    @Enumerated(EnumType.STRING)
    private EtatCivilEnum etatCivilEnum;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Veuillez precisez votre genre.")
    private GenreEnum genre;

    @Column(name="email_valider")
    private boolean emailValider = false;

//    for logging and administration purposes it will be filled by the system
    @Column(name="created_at", updatable = false)
    @CreatedDate
    private ZonedDateTime createdAt;

    @Column(name="updated_at")
    @LastModifiedDate
    private ZonedDateTime updatedAt;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name="utilisateur_roles"
            ,joinColumns = @JoinColumn(name = "utilisateur_id")
            ,inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "nationalite_id")
    private Nationalite nationalite;

    @ManyToOne
    @JoinColumn(name = "lieu_naissance_id")
    private LieuDeNaissance lieuDeNaissance;


//    JWT CONFIGURATION
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
