package ma.inpt.cedoc.model.entities.utilisateurs;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@Table(name="responsable_de_formation")
@DiscriminatorValue("RESPONSABLE_DE_FORMATION")
public class ResponsableDeFormation extends Professeur {
}
