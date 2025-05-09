package ma.inpt.cedoc.model.entities.utilisateurs;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;
import ma.inpt.cedoc.model.entities.candidature.Candidature;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Table(name = "candidats")
public class Candidat extends Utilisateur {
    @Builder.Default
    private boolean archiver = false;

    // ---------------------- Relations ----------------------------

    @OneToOne(mappedBy = "candidat")
    private Candidature candidature;

}
