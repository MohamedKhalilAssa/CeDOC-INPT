package ma.inpt.cedoc.model.entities.utilisateurs;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;
import ma.inpt.cedoc.model.entities.candidature.Sujet;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Table(name="chefs_equipes")
@DiscriminatorValue("CHEF_EQUIPE")
public class ChefEquipe extends Professeur {

    @OneToOne
    @JoinColumn(name = "equipe_id", unique = true, nullable = false)
    private EquipeDeRecherche equipeDeRecherche;

    @OneToMany(mappedBy = "chefEquipe")
    @JsonIgnore
    private List<Sujet> sujets;

}
