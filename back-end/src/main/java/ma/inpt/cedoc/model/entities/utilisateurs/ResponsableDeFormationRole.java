package ma.inpt.cedoc.model.entities.utilisateurs;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.entities.formation.SeanceFormation;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "responsable_de_formation_roles")
public class ResponsableDeFormationRole {

    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "professeur_id")
    @JsonIgnore

    private Professeur professeur;

    @OneToMany(mappedBy = "validePar")
    @JsonIgnore
    private List<SeanceFormation> seancesValidees;

}
