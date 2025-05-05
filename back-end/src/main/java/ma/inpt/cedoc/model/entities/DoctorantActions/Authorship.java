package ma.inpt.cedoc.model.entities.DoctorantActions;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "authorships")
public class Authorship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean avoirPrix;

    private String justificatifPrix;

    //--------- Relations ------------

    @ManyToOne
    @JoinColumn(name = "auteur_id")
    private Doctorant auteur;

    @ManyToOne
    @JoinColumn(name = "publication_id")
    private Publication publication;

}
