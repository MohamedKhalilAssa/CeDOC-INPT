package ma.inpt.cedoc.model.entities.utilisateurs;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.entities.candidature.Sujet;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Table(name="chefs_equipes")
@DiscriminatorValue("CHEF_EQUIPE")
public class ChefEquipe extends Professeur {

    @OneToMany(mappedBy = "chefEquipe")
    private List<EquipeDeRecherche> equipeDeRecherche;

    @OneToMany(mappedBy = "chefEquipe")
    @JsonIgnore
    private List<Sujet> sujets;

}
