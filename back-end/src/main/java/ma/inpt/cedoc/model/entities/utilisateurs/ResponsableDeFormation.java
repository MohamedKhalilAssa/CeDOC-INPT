package ma.inpt.cedoc.model.entities.utilisateurs;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.entities.formation.SeanceFormation;

import java.util.List;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Table(name="responsable_de_formation")
@DiscriminatorValue("RESPONSABLE_DE_FORMATION")
public class ResponsableDeFormation extends Professeur {


    // ---------------------- Relations ----------------------------
    @OneToMany(mappedBy = "validePar")
    private List<SeanceFormation> seancesValidees;

}
