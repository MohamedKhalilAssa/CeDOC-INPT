package ma.inpt.cedoc.model.entities.candidature;

import jakarta.persistence.*;
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
@DiscriminatorValue("ACCEPTEE")
public class CandidatureAccepter extends Candidature {

    @Min(value = 1, message = "La date d'entretien (en jours depuis epoch) doit être positive")
    @Column(name = "date_entretien")
    private int dateEntretien; // selon le diagramme de classes...
}
