package ma.inpt.cedoc.model.entities.DoctorantActions;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.entities.utilisateurs.DirectionCedoc;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import ma.inpt.cedoc.model.enums.doctorant_enums.EtatEnum;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "publications")
@EntityListeners(AuditingEntityListener.class)
public class Publication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le titre est obligatoire")
    private String titre;

    @NotBlank(message = "Le journal est obligatoire")
    private String journal;

    @NotBlank(message = "La date de publication est obligatoire")
    private ZonedDateTime datePublication;

    @NotNull(message = "L'état de publication est obligatoire")
    @Enumerated(EnumType.STRING)
    private EtatEnum status = EtatEnum.DECLAREE;

    // J'ai pas fait @NotNull, parce que le justificatif peut manque (donc le responsable ne vas pas le valider)
    // ou bien le doctorant peut le mettre après
    private String justificatif;

    // il s'agit des noms des autres auteurs de la publication séparé par des : comme ça, ils sont stocké comme ça
    // dans DB , et on va les traiter comme des listes.
    private String autresAuteurs;

    private String prixIntitule;

    @Column(name = "created_at", updatable = false)
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    private LocalDateTime updatedAt;

    // ----------------- Relations -----------------

    @ManyToOne
    @JoinColumn(name = "auteur")
    private Doctorant auteur;

    @ManyToOne
    @JoinColumn(name = "validateur_id")
    private DirectionCedoc validateur;


}
