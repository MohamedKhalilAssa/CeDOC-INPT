package ma.inpt.cedoc.model.entities.utilisateurs;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@Table(name="directeur_de_these")
@DiscriminatorValue("DIRECTEUR_DE_THESE")
public class DirecteurDeThese extends Professeur {
}
