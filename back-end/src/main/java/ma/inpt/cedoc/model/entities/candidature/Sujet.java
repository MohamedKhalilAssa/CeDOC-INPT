package ma.inpt.cedoc.model.entities.candidature;

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
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.entities.utilisateurs.ChefEquipe;
import ma.inpt.cedoc.model.entities.utilisateurs.DirecteurDeThese;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import ma.inpt.cedoc.model.entities.utilisateurs.Professeur;

@Entity
@NoArgsConstructor
@AllArgsConstructor
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
    private String intitule;

    @NotBlank(message = "La description du sujet est obligatoire")
    @Size(min = 10, message = "La description doit contenir au moins 10 caractères")
    private String description;

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

    @ManyToOne
    @JoinColumn(name = "chef_equipe_id", nullable = false)
    private ChefEquipe chefEquipe;

    @ManyToOne
    @JoinColumn(name = "directeur_these_id")
    private DirecteurDeThese directeurDeThese;

    // @OneToMany(mappedBy = "sujet")
    // @JsonIgnore
    // private List<DemandeDeReinscription> demandesDeReinscription;

}
