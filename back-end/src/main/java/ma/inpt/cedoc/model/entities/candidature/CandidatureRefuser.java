package ma.inpt.cedoc.model.entities.candidature;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.ZonedDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Table(name="candidature_refuser")
public class CandidatureRefuser extends Candidature {

    @NotBlank(message = "Le motif de refus est obligatoire")
    private String motif;

    @PastOrPresent(message = "La date de refus doit être aujourd'hui ou une date passée")
    @Column(name = "date_refus")
    private LocalDate dateRefus;

    //    for logging and administration purposes it will be filled by the system
    @Column(name="created_at", updatable = false)
    @CreatedDate
    private ZonedDateTime createdAt;

    @Column(name="updated_at")
    @LastModifiedDate
    private ZonedDateTime updatedAt;
}
