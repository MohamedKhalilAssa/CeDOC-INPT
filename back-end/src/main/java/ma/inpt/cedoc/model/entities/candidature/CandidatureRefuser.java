package ma.inpt.cedoc.model.entities.candidature;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("REFUSEE")
public class CandidatureRefuser extends Candidature {

    @NotBlank(message = "Le motif de refus est obligatoire")
    private String motif;

    @PastOrPresent(message = "La date de refus doit être aujourd'hui ou une date passée")
    @Column(name = "date_refus")
    private LocalDate dateRefus;
}
