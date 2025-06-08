package ma.inpt.cedoc.repositories.model.entities.utilisateurs;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.repositories.model.entities.candidature.Sujet;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="chef_equipe_roles")
public class ChefEquipeRole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "professeur_id")
    private Professeur professeur;

    @OneToMany(mappedBy = "chefEquipe")
    private List<EquipeDeRecherche> equipesDeRecherche;

    @OneToMany(mappedBy = "chefEquipe")
    @JsonIgnore
    private List<Sujet> sujets;

}
