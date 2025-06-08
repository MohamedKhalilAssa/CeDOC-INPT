package ma.inpt.cedoc.repositories.model.entities.DoctorantActions;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.repositories.model.entities.utilisateurs.DirectionCedoc;
import ma.inpt.cedoc.repositories.model.entities.utilisateurs.Doctorant;
import ma.inpt.cedoc.repositories.model.enums.doctorant_enums.EtatEnum;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "communications_conferences")
@EntityListeners(AuditingEntityListener.class)
public class ConfParticipation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "le titre de la communication et obligatoire")
    private String titre;

    @NotBlank(message = "le titre de la conférence et obligatoire")
    private String conference;

    @NotNull(message = "la date de CommunicationConference et obligatoire")
    private ZonedDateTime date;

    @NotBlank(message = "le lieu de CommunicationConference et obligatoire")
    private String lieu;

    // J'ai pas fait @NotNull, parce que le justificatif peut manque (donc le
    // responsable ne vas pas le valider)
    // ou bien le doctorant peut le mettre après
    private String justificatif;

    @NotNull(message = "l'état de CommunicationConference et obligatoire")
    @Enumerated(EnumType.STRING)
    private EtatEnum status = EtatEnum.DECLAREE;

    // il s'agit des noms des autres participants de la conférence séparé par des :
    // comme ça, ils sont stocké comme ça
    // dans DB , et on va les traiter comme des listes.
    private String autresParticipants;

    @Column(name = "created_at", updatable = false)
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    private LocalDateTime updatedAt;

    // ----------- Relation --------------

    @ManyToOne
    @JoinColumn(name = "participant_id")
    private Doctorant participant;

    @ManyToOne
    @JoinColumn(name = "validateur_id")
    private DirectionCedoc validateur;
}
