package ma.inpt.cedoc.model.entities.candidature;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.entities.Reinscription.DemandeReinscription;
import ma.inpt.cedoc.model.entities.utilisateurs.ChefEquipeRole;
import ma.inpt.cedoc.model.entities.utilisateurs.DirecteurDeTheseRole;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import ma.inpt.cedoc.model.entities.utilisateurs.Professeur;

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

    @Column(unique = true, nullable = false)
    private String intitule;

    @Column(name = "description", nullable = true, length = 1000)
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

    @ManyToMany(mappedBy = "sujets", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Candidature> candidatures;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "sujets_professeurs", joinColumns = @JoinColumn(name = "sujet_id"), inverseJoinColumns = @JoinColumn(name = "professeur_id"))
    @JsonIgnore
    private List<Professeur> professeurs;

    @OneToMany(mappedBy = "sujet", fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Doctorant> doctorants;

    @ManyToOne(targetEntity = ChefEquipeRole.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "chef_equipe_id", nullable = false)
    @JsonIgnore
    private ChefEquipeRole chefEquipe;

    @ManyToOne(targetEntity = DirecteurDeTheseRole.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "directeur_these_role_id")
    private DirecteurDeTheseRole directeurDeThese;

    @OneToMany(mappedBy = "sujet")
    @JsonIgnore
    private List<DemandeReinscription> demandesReinscription;

}
