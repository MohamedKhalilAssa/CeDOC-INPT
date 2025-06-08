package ma.inpt.cedoc.repositories.model.entities.utilisateurs;

import jakarta.persistence.*;
import lombok.*;
import ma.inpt.cedoc.repositories.model.entities.candidature.Candidature;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "candidats")
public class Candidat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "utilisateur_id")
    private Utilisateur utilisateur;

    @Builder.Default
    private boolean archiver = false;

    // ---------------------- Relations ----------------------------

    @OneToOne(mappedBy = "candidat")
    private Candidature candidature;

}
