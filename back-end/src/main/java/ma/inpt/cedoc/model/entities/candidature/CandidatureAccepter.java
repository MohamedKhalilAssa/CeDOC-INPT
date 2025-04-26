package ma.inpt.cedoc.model.entities.candidature;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Table(name = "candidature_accepter")
public class CandidatureAccepter extends Candidature {

    @Min(value = 1, message = "La date d'entretien (en jours depuis epoch) doit être positive")
    @Column(name = "date_entretien")
    private int dateEntretien; // selon le diagramme de classes...

}
