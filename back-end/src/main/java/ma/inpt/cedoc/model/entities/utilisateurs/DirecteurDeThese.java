package ma.inpt.cedoc.model.entities.utilisateurs;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.entities.soutenance.Jury;
import ma.inpt.cedoc.model.entities.soutenance.Soutenance;

import java.util.List;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

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
