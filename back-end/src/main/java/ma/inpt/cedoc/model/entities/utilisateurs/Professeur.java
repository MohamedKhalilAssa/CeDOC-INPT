package ma.inpt.cedoc.model.entities.utilisateurs;

import java.util.List;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.entities.soutenance.ProfesseurJury;
import ma.inpt.cedoc.model.enums.utilisateur_enums.GradeProfesseurEnum;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Table(name="professeurs")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="type_professeur", discriminatorType = DiscriminatorType.STRING)
@DiscriminatorValue("PROFESSEUR")
public class Professeur extends Utilisateur {

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Veuillez précisez le grade.")
    @Column(name="grade")
    private GradeProfesseurEnum grade;

    @ManyToOne
    @JoinColumn(name="equipe_de_recherche_id")
    private EquipeDeRecherche equipeDeRechercheAcceuillante;

    @OneToMany(mappedBy = "professeur")
    private List<ProfesseurJury> participationsEnJury;
}
