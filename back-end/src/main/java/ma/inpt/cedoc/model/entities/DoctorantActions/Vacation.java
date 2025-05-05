package ma.inpt.cedoc.model.entities.DoctorantActions;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Vacation")
public class Vacation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le nom du cours ne doit pas être vide.")
    private String cours;

    @NotBlank(message = "L'établissement ne doit pas être vide.")
    private String etablissement;

    @Positive(message = "La durée doit être un nombre positif en heures.")
    private int duree;

    @NotBlank(message = "Le niveau ne doit pas être vide.")
    private String niveau;

    @NotBlank(message = "Le justificatif ne doit pas être vide.")
    private String justificatif;

    @ManyToOne
    @JoinColumn(name = "vacataire_id")
    private Doctorant vacataire;
}
