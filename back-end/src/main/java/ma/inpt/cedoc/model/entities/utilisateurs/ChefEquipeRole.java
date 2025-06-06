package ma.inpt.cedoc.model.entities.utilisateurs;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;
import ma.inpt.cedoc.model.entities.candidature.Sujet;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="chef_equipe_roles")
public class ChefEquipeRole {

    @Id
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
