package ma.inpt.cedoc.repositories.model.entities.utilisateurs;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import ma.inpt.cedoc.repositories.model.entities.candidature.Sujet;
import ma.inpt.cedoc.repositories.model.entities.formation.Formation;
import ma.inpt.cedoc.repositories.model.entities.soutenance.ProfesseurJury;
import ma.inpt.cedoc.repositories.model.enums.utilisateur_enums.GradeProfesseurEnum;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "professeurs")
public class Professeur {

    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "utilisateur_id")
    private Utilisateur utilisateur;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Veuillez précisez le grade.")
    @Column(name = "grade")
    private GradeProfesseurEnum grade;

    @ManyToOne
    @JoinColumn(name = "equipe_de_recherche_id")
    private EquipeDeRecherche equipeDeRechercheAcceuillante;

    @OneToMany(mappedBy = "professeur")
    private List<ProfesseurJury> participationsEnJury;

    @ManyToMany(mappedBy = "professeurs")
    @JsonIgnore
    private List<Sujet> sujetsProposes;

    // Relation avec formations
    @OneToMany(mappedBy = "professeur")
    private List<Formation> formationsProposees;

    // Roles - composition instead of inheritance
    @OneToOne(mappedBy = "professeur", cascade = CascadeType.ALL, orphanRemoval = true)
    private ChefEquipeRole chefEquipeRole;

    @OneToOne(mappedBy = "professeur", cascade = CascadeType.ALL, orphanRemoval = true)
    private DirecteurDeTheseRole directeurDeTheseRole;

    @OneToOne(mappedBy = "professeur", cascade = CascadeType.ALL, orphanRemoval = true)
    private ResponsableDeFormationRole responsableDeFormationRole;

    // Helper methods to check roles
    public boolean isChefEquipe() {
        return chefEquipeRole != null;
    }

    public boolean isDirecteurDeThese() {
        return directeurDeTheseRole != null;
    }

    public boolean isResponsableDeFormation() {
        return responsableDeFormationRole != null;
    }

}
