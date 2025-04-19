package ma.inpt.cedoc.model.entities.utilisateurs;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="equipe_de_recherche")
public class EquipeDeRecherche  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="nom_de_equipe")
    private String nomDeLequipe;

    @ManyToOne
    @JoinColumn(name = "chef_equipe_id")
    private ChefEquipe chefEquipe;

    @OneToMany(mappedBy = "equipeDeRechercheAcceuillante")
    private List<Professeur> membres;

    @OneToMany(mappedBy = "equipeDeRecherche")
    private List<Doctorant> doctorants;
}
