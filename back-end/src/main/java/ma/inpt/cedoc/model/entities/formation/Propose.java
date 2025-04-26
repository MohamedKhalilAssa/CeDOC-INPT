package ma.inpt.cedoc.model.entities.formation;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import ma.inpt.cedoc.model.entities.utilisateurs.Professeur;

import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "propositions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Propose {

    @EmbeddedId                             // Clé composite (professeur, formation)
    private ProposeId id;

    /* ─── Clé composite ─── */
    @Embeddable
    @Data @NoArgsConstructor @AllArgsConstructor
    public static class ProposeId implements Serializable {
        private Long professeurId;
        private Long formationId;
    }

    /* ─── Relations ─── */
    @MapsId("professeurId")
    @ManyToOne(optional = false)
    @JoinColumn(name = "professeur_id")
    private Professeur professeur;

    @MapsId("formationId")
    @ManyToOne(optional = false)
    @JoinColumn(name = "formation_id")
    private Formation formation;

    /* Liste cible de doctorants */
    @ManyToMany
    @JoinTable(
            name = "proposition_doctorants",
            joinColumns = {
                    @JoinColumn(name = "professeur_id", referencedColumnName = "professeur_id"),
                    @JoinColumn(name = "formation_id",  referencedColumnName = "formation_id")
            },
            inverseJoinColumns = @JoinColumn(name = "doctorant_id")
    )
    private List<Doctorant> doctorantsCibles;
}

