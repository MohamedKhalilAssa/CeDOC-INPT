package ma.inpt.cedoc.model.entities.Doctorant_Actions;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.enums.doctorant_enums.EtatEnum;

import java.time.ZonedDateTime;

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
}
