package ma.inpt.cedoc.model.entities.utilisateurs;

import java.util.List;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Table(name="chef_equipe")
@DiscriminatorValue("CHEF_EQUIPE")
public class ChefEquipe extends Professeur {

    @OneToMany(mappedBy = "chefEquipe")
    private List<EquipeDeRecherche> equipeDeRecherche;

}
