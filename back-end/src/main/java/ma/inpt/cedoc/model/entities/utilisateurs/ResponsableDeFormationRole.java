package ma.inpt.cedoc.model.entities.utilisateurs;

import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.entities.formation.SeanceFormation;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="responsable_de_formation_roles")
public class ResponsableDeFormationRole {

    @Id    
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "professeur_id")
    private Professeur professeur;

    @OneToMany(mappedBy = "validePar")
    private List<SeanceFormation> seancesValidees;

}
