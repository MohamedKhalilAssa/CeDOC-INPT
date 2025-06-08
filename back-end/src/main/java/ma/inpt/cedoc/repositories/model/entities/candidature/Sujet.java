package ma.inpt.cedoc.repositories.model.entities.candidature;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import ma.inpt.cedoc.repositories.model.entities.Reinscription.DemandeReinscription;
import ma.inpt.cedoc.repositories.model.entities.utilisateurs.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Table(name = "sujets")
@EntityListeners(AuditingEntityListener.class)
public class Sujet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "L'intitulé du sujet est obligatoire")
    @Size(min = 3, max = 100, message = "L'intitulé doit contenir entre 3 et 100 caractères")
    @Pattern(regexp = "^[\\p{L}0-9,.'\"()&-]+(?:\\s[\\p{L}0-9,.'\"()&-]+)*$", message = "L'intitule contient des caracteres invalides.")
    @Column(unique = true, nullable = false)
    private String intitule;

    @NotBlank(message = "La description du sujet est obligatoire")
    @Size(min = 10, message = "La description doit contenir au moins 10 caractères")
    private String description;

    @Column(name = "est_valide")
    @Builder.Default
    private boolean valide = false;

    @Column(name = "est_public")
    @Builder.Default
    private boolean estPublic = false;

    // for logging and administration purposes it will be filled by the system
    @Column(name = "created_at", updatable = false)
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    private LocalDateTime updatedAt;

    // -------------------------------------------- Relations
    // ----------------------------------------------------------

    @ManyToMany(mappedBy = "sujets")
    @JsonIgnore
    private List<Candidature> candidatures;

    @ManyToMany
    @JoinTable(name = "sujets_professeurs", joinColumns = @JoinColumn(name = "sujet_id"), inverseJoinColumns = @JoinColumn(name = "professeur_id"))
    private List<Professeur> professeurs;

    @OneToMany(mappedBy = "sujet")
    @JsonIgnore
    private List<Doctorant> doctorants;

    @ManyToOne(targetEntity = ChefEquipeRole.class)
    @JoinColumn(name = "chef_equipe_role_id", nullable = false)
    private ChefEquipeRole chefEquipe;
    
    // @ManyToMany
    // @JoinTable(name = "sujet_chefs_equipes", joinColumns = @JoinColumn(name = "sujet_id"), inverseJoinColumns = @JoinColumn(name = "chef_equipe_id"))
    // private List<ChefEquipe> chefsEquipes;

    // @ElementCollection
    // @CollectionTable(name = "sujet_validations", joinColumns = @JoinColumn(name = "sujet_id"))
    // @Column(name = "chef_id")
    // private List<Long> chefsAyantValide;

    @ManyToOne(targetEntity = DirecteurDeTheseRole.class)
    @JoinColumn(name = "directeur_these_role_id")
    private DirecteurDeTheseRole directeurDeThese;

    @OneToMany(mappedBy = "sujet")
    @JsonIgnore
    private List<DemandeReinscription> demandesReinscription;

}
