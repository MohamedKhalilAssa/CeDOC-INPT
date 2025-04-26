package ma.inpt.cedoc.model.entities.Doctorant_Actions;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import ma.inpt.cedoc.model.enums.doctorant_enums.EtatEnum;

import java.time.ZonedDateTime;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommunicationConference {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "le titre de CommunicationConference et obligatoire")
    private String titre;

    @NotBlank(message = "la conférence de CommunicationConference et obligatoire")
    private String conference;

    @NotNull(message = "la date de CommunicationConference et obligatoire")
    private ZonedDateTime date;

    @NotBlank(message = "le justificatif de CommunicationConference et obligatoire")
    private String justificatif;

    @NotNull(message = "l'état de CommunicationConference et obligatoire")
    private EtatEnum status;

    //----------- Relation --------------
    @ManyToMany(mappedBy = "communications")
    @JsonIgnore
    private List<Doctorant> participatants;

}
