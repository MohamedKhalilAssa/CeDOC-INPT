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

    //----------------- Relations -----------------

    @ManyToMany(mappedBy = "publications")
    @JsonIgnore
    private List<Doctorant> auteurs;
}
