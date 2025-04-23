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
    private EtatEnum status;
}
