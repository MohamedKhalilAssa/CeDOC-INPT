package ma.inpt.cedoc.model.entities.utilisateurs;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.enums.utilisateur_enums.CEDocEnum;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

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
}
