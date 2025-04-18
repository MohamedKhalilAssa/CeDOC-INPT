package ma.inpt.cedoc.model.entities.candidature;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "Sujet")
public class Sujet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "L'intitulé du sujet est obligatoire")
    @Size(min = 3, max = 100, message = "L'intitulé doit contenir entre 3 et 100 caractères")
    private String intitule;

    @NotBlank(message = "La description du sujet est obligatoire")
    @Size(min = 10, message = "La description doit contenir au moins 10 caractères")
    private String description;

    // Relations à activer plus tard :
    
    // private List<Candidature> candidatures;

    // private EquipeDeRecherche equipeDeRecherche;

    // private Professeur professeurValidateur;
}
