package ma.inpt.cedoc.model.entities.utilisateurs;

import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
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
