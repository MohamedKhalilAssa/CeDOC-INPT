package ma.inpt.cedoc.model.entities.utilisateurs;

import java.util.List;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import ma.inpt.cedoc.model.entities.soutenance.Jury;
import ma.inpt.cedoc.model.entities.soutenance.Soutenance;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@Table(name="directeur_de_these")
@DiscriminatorValue("DIRECTEUR_DE_THESE")
public class DirecteurDeThese extends Professeur {

    @OneToMany(mappedBy = "directeurDeThese")
    private List<Soutenance> soutenances;

    @OneToMany(mappedBy = "directeurDeThese")
    private List<Jury> jurys;

}
