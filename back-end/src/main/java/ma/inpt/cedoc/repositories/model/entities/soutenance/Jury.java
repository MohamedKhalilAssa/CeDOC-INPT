package ma.inpt.cedoc.repositories.model.entities.soutenance;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.repositories.model.entities.utilisateurs.DirecteurDeTheseRole;
import ma.inpt.cedoc.repositories.model.entities.utilisateurs.DirectionCedoc;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Table(name = "Jury")
public class Jury {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // for logging and administration purposes it will be filled by the system
    @Column(name = "created_at", updatable = false)
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    private LocalDateTime updatedAt;
    @OneToMany(mappedBy = "jury")
    private List<ProfesseurJury> membres;

    @ManyToOne
    @JoinColumn(name = "directeur_role_id", nullable = false)
    private DirecteurDeTheseRole directeurDeThese;

    @ManyToOne
    @JoinColumn(name = "direction_cedoc_id", nullable = false)
    private DirectionCedoc directionCedoc;
}
