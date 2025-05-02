package ma.inpt.cedoc.model.entities.utilisateurs;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.entities.candidature.Candidature;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "candidats")
public class Candidat extends Utilisateur {
    private boolean archiver = false;

    // ---------------------- Relations ----------------------------

    @OneToOne(mappedBy = "candidat")
    private Candidature candidature;

}
