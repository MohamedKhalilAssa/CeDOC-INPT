package ma.inpt.cedoc.model.entities.candidature;

import java.time.LocalDate;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;
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
@Table(name = "candidatures_refuser")
public class CandidatureRefuser extends Candidature {

    @NotBlank(message = "Le motif de refus est obligatoire")
    private String motif;

    @PastOrPresent(message = "La date de refus doit être aujourd'hui ou une date passée")
    @Column(name = "date_refus")
    private LocalDate dateRefus;

}
