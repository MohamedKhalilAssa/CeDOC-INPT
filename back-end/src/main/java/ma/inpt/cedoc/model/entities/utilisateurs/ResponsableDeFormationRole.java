package ma.inpt.cedoc.model.entities.utilisateurs;

import java.util.List;

import jakarta.persistence.*;
import lombok.*;
import ma.inpt.cedoc.model.entities.formation.SeanceFormation;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="responsable_de_formation_roles")
public class ResponsableDeFormationRole {

    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "professeur_id")
    private Professeur professeur;

    @OneToMany(mappedBy = "validePar")
    private List<SeanceFormation> seancesValidees;

}
