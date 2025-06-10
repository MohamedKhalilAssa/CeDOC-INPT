package ma.inpt.cedoc.model.entities.utilisateurs;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;
import ma.inpt.cedoc.model.entities.candidature.Candidature;

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
    @JsonIgnore
    @EqualsAndHashCode.Exclude
    private Utilisateur utilisateur;

    @Builder.Default
    private boolean archiver = false;

    // ---------------------- Relations ----------------------------

    @OneToOne(mappedBy = "candidat", fetch = FetchType.LAZY)
    @JsonIgnore
    @EqualsAndHashCode.Exclude
    private Candidature candidature;

}
