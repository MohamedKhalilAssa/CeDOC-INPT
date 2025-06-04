package ma.inpt.cedoc.model.entities.utilisateurs;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Table(name = "equipes_de_recherches")
public class EquipeDeRecherche {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom_de_equipe")
    private String nomDeLequipe;

    // for logging and administration purposes it will be filled by the system
    @Column(name = "created_at", updatable = false)
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    private LocalDateTime updatedAt;

    @OneToOne(mappedBy = "equipeDeRecherche")
    private ChefEquipe chefEquipe;

    @OneToMany(mappedBy = "equipeDeRechercheAcceuillante")
    private List<Professeur> membres;

    @OneToMany(mappedBy = "equipeDeRecherche")
    private List<Doctorant> doctorants;
}
