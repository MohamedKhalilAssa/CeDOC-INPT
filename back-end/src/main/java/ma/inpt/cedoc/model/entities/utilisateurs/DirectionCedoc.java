package ma.inpt.cedoc.model.entities.utilisateurs;

import java.util.List;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.entities.soutenance.DemandeSoutenance;
import ma.inpt.cedoc.model.entities.soutenance.Jury;
import ma.inpt.cedoc.model.enums.utilisateur_enums.CEDocEnum;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Table(name="direction_cedoc")
public class DirectionCedoc extends Utilisateur {

    @Column(name="role_administrative")
    @NotNull(message = "Veuillez précisez le rôle administrative.")
    @Enumerated(EnumType.STRING)
    private CEDocEnum roleAdministrative;

    @OneToMany(mappedBy = "directionCedoc")
    private List<Jury> jurys;

    @OneToMany(mappedBy = "directionCedoc")
    private List<DemandeSoutenance> demandeSoutenances;
}
