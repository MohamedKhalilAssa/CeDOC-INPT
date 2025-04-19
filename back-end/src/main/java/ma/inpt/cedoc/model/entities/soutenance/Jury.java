package ma.inpt.cedoc.model.entities.soutenance;

import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.entities.utilisateurs.DirecteurDeThese;
import ma.inpt.cedoc.model.entities.utilisateurs.DirectionCedoc;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Jury")
public class Jury {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "jury")
    private List<Composer> membres;

    @ManyToOne
    @JoinColumn(name = "directeur_de_these_id", nullable = false)
    private DirecteurDeThese directeurDeThese;

    @ManyToOne
    @JoinColumn(name = "direction_cedoc_id", nullable = false)
    private DirectionCedoc direction_cedoc;
}
