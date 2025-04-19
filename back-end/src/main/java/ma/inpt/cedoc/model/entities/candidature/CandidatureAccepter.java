package ma.inpt.cedoc.model.entities.candidature;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.ZonedDateTime;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Table(name="candidature_accepter")
public class CandidatureAccepter extends Candidature {

    @Min(value = 1, message = "La date d'entretien (en jours depuis epoch) doit être positive")
    @Column(name = "date_entretien")
    private int dateEntretien; // selon le diagramme de classes...

    //    for logging and administration purposes it will be filled by the system
    @Column(name="created_at", updatable = false)
    @CreatedDate
    private ZonedDateTime createdAt;

    @Column(name="updated_at")
    @LastModifiedDate
    private ZonedDateTime updatedAt;
}
