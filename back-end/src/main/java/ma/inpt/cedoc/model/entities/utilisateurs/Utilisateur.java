package ma.inpt.cedoc.model.entities.utilisateurs;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import ma.inpt.cedoc.model.entities.auth.Token;
import ma.inpt.cedoc.model.enums.utilisateur_enums.EtatCivilEnum;
import ma.inpt.cedoc.model.enums.utilisateur_enums.GenreEnum;

@Entity
@NoArgsConstructor
@Data
@AllArgsConstructor
@Table(name = "utilisateurs")
@Inheritance(strategy = InheritanceType.JOINED)
@EntityListeners(AuditingEntityListener.class)
@SuperBuilder
public class Utilisateur implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false)
    private String prenom;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(unique = true, nullable = false)
    private String telephone;

    @Column(nullable = false)
    private String password;

    @Column(name = "date_naissance", nullable = false)
    private LocalDate dateNaissance;

    // To Review if is required or not
    @Column(name = "etat_civil")
    @Enumerated(EnumType.STRING)
    private EtatCivilEnum etatCivilEnum;

    @Enumerated(EnumType.STRING)
    @Column(name = "genre", nullable = false)
    private GenreEnum genre;

    @Column(name = "email_valider", nullable = false)
    @Builder.Default
    private boolean emailValider = false;

    // for logging and administration purposes it will be filled by the system
    @Column(name = "created_at", updatable = false)
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    private LocalDateTime updatedAt;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "utilisateur_roles", joinColumns = @JoinColumn(name = "utilisateur_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    @Builder.Default
    private List<Role> roles = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "nationalite_id", nullable = false)
    private Nationalite nationalite;

    @ManyToOne
    @JoinColumn(name = "lieu_naissance_id", nullable = false)
    private LieuDeNaissance lieuDeNaissance;

    @OneToMany(mappedBy = "utilisateur", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @JsonIgnore
    private Set<Token> tokens;

    // JWT CONFIGURATION
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getIntitule()))
                .collect(Collectors.toList());
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
